import { Form, Input, Button, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardService from "../../../services/dashboard.service";
import { addData } from "../../../redux/actions/data";
import { hideDrawer } from "../../../redux/actions/drawer";

const AddForm = () => {
  const dispatch = useDispatch();
  const { id, name, level, parent } = useSelector((state) => state.auth.user);
  const userData = { id: id, name: name, level_id: level, parent_id: parent };
  const [parentOptions, setParentOptions] = useState([userData]);
  const [parentLevelFilterId, setParentLevelFilterId] = useState(0);
  const [levelOptions, setLevelOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const showDrawer = useSelector((state) => state.drawer.show);
  const editId = useSelector((state) => state.drawer.id);
  const [parentOptionLoad, setParentOptionLoad] = useState(false);
  const initialUserData = useSelector(
    (state) => state.data.data.filter((user) => user.id === editId)[0]
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (showDrawer) {
      const getParentData = async () => {
        try {
          const data = await DashboardService.getFamily();
          await setParentOptions([
            userData,
            ...data.reduce(
              (accumulator, currentValue) => [
                ...accumulator,
                {
                  id: currentValue.id,
                  name: currentValue.name,
                  level_id: currentValue.level_id,
                },
              ],
              []
            ),
          ]);
          setParentOptionLoad(true);
        } catch (error) {
          console.log(error);
        }
      };

      const getLevelData = async () => {
        try {
          const data = await DashboardService.getList("level");
          const levelOptionFromServer = await data.result.reduce(
            (accumulator, currentValue) => {
              if (level < currentValue.id) {
                return [
                  ...accumulator,
                  {
                    id: currentValue.id,
                    name: currentValue.name,
                  },
                ];
              } else {
                return accumulator;
              }
            },
            []
          );
          await setLevelOptions(levelOptionFromServer);
        } catch (error) {
          console.log(error);
        }
      };

      getParentData();
      getLevelData();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDrawer]);
  // useEffect(() => {
  //   console.log(parentOptions);
  // }, [parentOptions]);

  const handleAdd = async (value) => {
    let payload = value;
    if (editId !== 0) {
      payload = { ...payload, id: editId };
    }
    if (editId === userData.id) {
      payload = {
        ...payload,
        level_id: userData.level_id,
        parent: userData.parent_id,
      };
    }
    setLoading(true);
    try {
      await dispatch(addData("member", payload, editId !== 0));
      dispatch(hideDrawer());
      form.resetFields();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onChangeFilter = async (value) => {
    await setParentLevelFilterId(value - 1);
    form.resetFields(["parent"]);
    const tempParent = await parentOptions.reduce(
      (accumulator, currentValue) =>
        currentValue.level_id === value - 1
          ? [
              ...accumulator,
              { value: currentValue.id, label: currentValue.name },
            ]
          : accumulator,
      []
    );
    let index = 0;
    if (editId !== 0) {
      index = await tempParent.findIndex((option) => {
        return option.value === Number.parseInt(initialUserData?.parent_id);
      });
    }
    form.setFieldsValue({
      parent: tempParent[index]?.value,
    });
  };

  const validatePassword = (_, value) => {
    if (value.length < 6) {
      return Promise.reject("Password must be longer than 6.");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.resetFields();
    if (parentOptionLoad) {
      const autoGenerateField = async () => {
        if (editId !== 0) {
          try {
            if (editId === userData.id) {
              console.log(level);
              form.setFieldsValue({
                name: userData.name,
              });
              form.setFieldsValue({
                level_id: initialUserData.level,
              });
              form.setFieldsValue({
                parent: initialUserData.parent,
              });
            } else {
              form.setFieldsValue({
                name: initialUserData.name,
              });

              form.setFieldsValue({
                level_id: initialUserData.level_id,
              });

              onChangeFilter(initialUserData.level_id);
            }
          } catch {}
        } else {
          await onChangeFilter(userData.level_id + 1);
          form.setFieldsValue({
            level_id: userData.level_id + 1,
          });
        }
      };
      autoGenerateField();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, form, parentOptionLoad]);

  return (
    <Spin spinning={loading}>
      <div className="my-10">
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Level"
            name="level_id"
            // initialValue={levelOptions[0].id}
            rules={[
              {
                required: editId !== userData.id,
                message: "Please select member level!",
              },
            ]}
          >
            <Select
              // showSearch
              placeholder="Select a level"
              // optionFilterProp="children"
              onChange={onChangeFilter}
              disabled={editId === userData.id ? true : false}
              options={levelOptions.reduce(
                (accumulator, currentValue) => [
                  ...accumulator,
                  {
                    value: currentValue.id,
                    label: currentValue.name,
                  },
                ],
                []
              )}
            />
          </Form.Item>
          <Form.Item
            label="Parent"
            name="parent"
            rules={[
              {
                required: editId !== userData.id,
                message: "Please select member level!",
              },
            ]}
          >
            <Select
              // showSearch
              placeholder="Select a member"
              disabled={editId === userData.id ? true : false}
              // optionFilterProp="children"
              options={parentOptions.reduce(
                (accumulator, currentValue) =>
                  currentValue.level_id === parentLevelFilterId
                    ? [
                        ...accumulator,
                        {
                          value: currentValue.id,
                          label: currentValue.name,
                        },
                      ]
                    : accumulator,
                []
              )}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: editId === 0,
                message: "Please input member password!",
              },
              {
                validator: editId === 0 ? validatePassword : "",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Conform Password"
            name="password2"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: editId === 0,
                message: "Please confirm member password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default AddForm;

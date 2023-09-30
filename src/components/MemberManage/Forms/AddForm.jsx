import { Form, Input, Button, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardService from "@/services/dashboard.service";
import { addData } from "@/redux/actions/data";
import { hideDrawer } from "@/redux/actions/drawer";

const AddForm = () => {
  const dispatch = useDispatch();
  const { id, name, level } = useSelector((state) => state.auth.user);
  const userData = { id: id, name: name, level_id: level };
  const [parentOptions, setParentOptions] = useState([userData]);
  const [parentLevelFilterId, setParentLevelFilterId] = useState(0);
  const [levelOptions, setLevelOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const showDrawer = useSelector((state) => state.drawer.show);
  const editId = useSelector((state) => state.drawer.id);
  const initialUserData = useSelector(
    (state) => state.data.data.filter((user) => user.id === editId)[0]
  );
  useEffect(() => {
    if (showDrawer) {
      const getParentData = async () => {
        try {
          const data = await DashboardService.getFamily();
          setParentOptions([
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
        } catch (error) {
          console.log(error);
        }
      };

      const getLevelData = async () => {
        try {
          const data = await DashboardService.getList("level");
          setLevelOptions(
            data.result.reduce(
              (accumulator, currentValue) =>
                id < currentValue.id
                  ? [
                      ...accumulator,
                      {
                        id: currentValue.id,
                        name: currentValue.name,
                      },
                    ]
                  : accumulator,
              []
            )
          );
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

  const [form] = Form.useForm();
  const onChangeFilter = (value) => {
    setParentLevelFilterId(value - 1);
    form.resetFields(["parent"]);
  };

  const validatePassword = (_, value) => {
    if (value.length < 6) {
      return Promise.reject("Password must be longer than 6.");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.resetFields();
    if (editId !== 0) {
      try {
        console.log(initialUserData);
        form.setFieldsValue({
          name: initialUserData.name,
          level_id: initialUserData.level_id,
          parent: initialUserData.parent_id,
        });
      } catch {}
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, form]);

  useEffect(() => {
    console.log(parentOptions);
  }, [parentOptions]);
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
            rules={[
              {
                required: true,
                message: "Please select member level!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a level"
              optionFilterProp="children"
              onChange={onChangeFilter}
              options={levelOptions.reduce(
                (accumulator, currentValue) => [
                  ...accumulator,
                  {
                    value: currentValue.id,
                    label: `${currentValue.id} : ${currentValue.name}`,
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
                required: true,
                message: "Please select member parent!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a member"
              optionFilterProp="children"
              options={parentOptions.reduce(
                (accumulator, currentValue) =>
                  currentValue.level_id === parentLevelFilterId
                    ? [
                        ...accumulator,
                        { value: currentValue.id, label: currentValue.name },
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
                required: true,
                message: "Please input member password!",
              },
              {
                validator: validatePassword,
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
                required: true,
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default AddForm;

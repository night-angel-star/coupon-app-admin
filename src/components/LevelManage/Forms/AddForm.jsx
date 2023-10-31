import {
  Form,
  Input,
  Button,
  Spin,
  Space,
  Checkbox,
  Divider,
  Card,
  message,
  Row,
  Col,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../redux/actions/data";
import { hideDrawer } from "../../../redux/actions/drawer";
import DashboardService from "../../../services/dashboard.service";

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const editId = useSelector((state) => state.drawer.id);
  const showDrawer = useSelector((state) => state.drawer.show);
  const data = useSelector((state) => state.data.data);
  const dataSize = data.length;
  const [parentLevel, setParentLevel] = useState([]);
  const [rawParentPermission, setRawParentPermission] = useState([]);
  const dispatch = useDispatch();
  const initialData = useSelector(
    (state) => state.data.data.filter((level) => level.id === editId)[0]
  );
  useEffect(() => {
    if (showDrawer === true) {
      form.resetFields();
      try {
        form.setFieldsValue(initialData);
        const getPermission = async () => {
          const response = await DashboardService.getPermission(editId);
          if (!response) {
            return;
          }
          let rawPermission = {};
          await response.parentLevel.map((r) => {
            const key = r.page;
            const operation = r.operation === "del" ? "delete" : r.operation;
            rawPermission =
              r.permission === 0
                ? rawPermission
                : rawPermission[key]
                ? {
                    ...rawPermission,
                    [key]: [
                      ...rawPermission[key],
                      operation[0].toUpperCase() + operation.slice(1),
                    ],
                  }
                : {
                    ...rawPermission,
                    [key]: [operation[0].toUpperCase() + operation.slice(1)],
                  };
            return rawPermission;
          });
          setRawParentPermission(rawPermission);

          let parentPermission = {};
          await response.parentLevel.map((r) => {
            const key = r.page;
            const operation = r.operation === "del" ? "delete" : r.operation;

            parentPermission = {
              ...parentPermission,
              [key]: {
                ...parentPermission[key],
                [operation[0].toUpperCase() + operation.slice(1)]: r.permission,
              },
            };
            return parentPermission;
          });
          setParentLevel(parentPermission);

          let permission = {};
          await response.level.map((r) => {
            const key = r.page;
            const operation = r.operation === "del" ? "delete" : r.operation;
            permission =
              r.permission === 0
                ? permission
                : permission[key]
                ? {
                    ...permission,
                    [key]: [
                      ...permission[key],
                      operation[0].toUpperCase() + operation.slice(1),
                    ],
                  }
                : {
                    ...permission,
                    [key]: [operation[0].toUpperCase() + operation.slice(1)],
                  };
            return permission;
          });
          form.setFieldsValue(permission);
        };
        getPermission();
      } catch (error) {
        console.log(error);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, showDrawer]);

  useEffect(() => {
    if (editId > dataSize) {
      if (rawParentPermission.length !== 0) {
        form.setFieldsValue(rawParentPermission);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawParentPermission]);

  const handleAdd = async (value) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const level_info = { id: value.id, name: value.name };
    const { 123: name, ...permission_info } = value;
    if (!(editId <= dataSize && level_info.name === initialData.name)) {
      try {
        await dispatch(addData("level", level_info, editId <= dataSize));
      } catch {
        setLoading(false);
        return;
      }
    }
    let permissionArray = [];
    category.map((cate) => {
      permissionOption.map((pO) => {
        permission_info[cate.toLowerCase()]
          ? (permissionArray = [
              ...permissionArray,
              permission_info[cate.toLowerCase()].includes(pO) ? 1 : 0,
            ])
          : (permissionArray = [...permissionArray, 0]);
        return cate;
      });
      return cate;
    });
    categoryOnlyView.map((cate) => {
      permission_info[cate.toLowerCase()]
        ? (permissionArray = [
            ...permissionArray,
            permission_info[cate.toLowerCase()].includes("View") ? 1 : 0,
          ])
        : (permissionArray = [...permissionArray, 0]);
      return cate;
    });
    const payload = { id: editId, permission_list: permissionArray };
    DashboardService.edit("level", payload)
      .then((result) => {
        if (result.status === 201) {
          dispatch(hideDrawer());
        } else {
          message.error("Level Manage Error.");
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Level Manage Exception");
        console.log(err);
        setLoading(false);
      });
  };

  //Permission

  const permissionOption = ["View", "Add", "Edit", "Delete"];
  const category = [
    "Member",
    "Goods",
    "Job",
    "Proxy",
    "Browser",
    "Login",
    "Machine",
    "Surfing",
  ];
  const categoryOnlyView = ["History", "Log", "Operation"];

  const [checkState, setCheckState] = useState(0);
  const [checkStateOne, setCheckStateOne] = useState({});

  const checkCheckAll = () => {
    const { name, id, ...per } = form.getFieldsValue();
    let permission_info = {};
    category.map((cate) => {
      const lCate = cate.toLowerCase();
      let permission_list = {};
      permissionOption.map((pO) => {
        permission_list = {
          ...permission_list,
          [pO]:
            typeof per[lCate] === "object"
              ? per[lCate].includes(pO)
                ? 1
                : 0
              : 0,
        };
        return pO;
      });
      permission_info = { ...permission_info, [lCate]: permission_list };
      return cate;
    });
    categoryOnlyView.map((cate) => {
      const lCate = cate.toLowerCase();
      let permission_list = {
        View:
          typeof per[lCate] === "object"
            ? per[lCate].includes("View")
              ? 1
              : 0
            : 0,
      };
      permission_info = { ...permission_info, [lCate]: permission_list };
      return cate;
    });

    const objCompare = (obj1, obj2) => {
      try {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
          return false;
        }

        for (let key of keys1) {
          if (typeof obj1[key] === "object") {
            if (!objCompare(obj1[key], obj2[key])) {
              return false;
            }
          } else {
            if (obj1[key] !== obj2[key]) {
              return false;
            }
          }
        }
      } catch {
        return false;
      }

      return true;
    };
    if (objCompare(permission_info, parentLevel)) {
      setCheckState(1);
    } else {
      if (
        Object.values(permission_info).every((obj) =>
          Object.values(obj).every((value) => value === 0)
        )
      )
        setCheckState(0);
      else setCheckState(2);
    }
    let checkStateOne_info = {};
    Object.keys(permission_info).map((permission_info_key) => {
      if (
        objCompare(
          permission_info[permission_info_key],
          parentLevel[permission_info_key]
        )
      ) {
        checkStateOne_info = {
          ...checkStateOne_info,
          [permission_info_key]: 1,
        };
      } else {
        if (
          Object.values(permission_info[permission_info_key]).every(
            (value) => value === 0
          )
        ) {
          checkStateOne_info = {
            ...checkStateOne_info,
            [permission_info_key]: 0,
          };
        } else {
          checkStateOne_info = {
            ...checkStateOne_info,
            [permission_info_key]: 2,
          };
        }
      }

      return permission_info_key;
    });
    setCheckStateOne(checkStateOne_info);
  };

  useEffect(() => {
    if (parentLevel.length !== 0) {
      checkCheckAll();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentLevel]);
  const onCheckAll = (cate) => {
    if (cate === "all") {
      if (checkState === 1) {
        form.resetFields(category.map((cate) => cate.toLowerCase()));
        form.resetFields(categoryOnlyView.map((cate) => cate.toLowerCase()));
      } else {
        form.setFieldsValue(rawParentPermission);
      }
    } else {
      if (checkStateOne[cate] === 1) {
        form.resetFields([cate]);
      } else {
        form.setFieldValue(cate, rawParentPermission[cate]);
      }
    }
    checkCheckAll();
  };

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
        >
          <Form.Item
            label="Level No"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your level no!",
              },
            ]}
            initialValue={editId}
          >
            <Input disabled value={editId} />
          </Form.Item>

          <Form.Item
            label="Level name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input level name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Card
            title="Role"
            loading={loading}
            extra={
              <Checkbox
                indeterminate={checkState === 2}
                onChange={() => onCheckAll("all")}
                checked={checkState === 0 ? false : true}
              >
                Select All
              </Checkbox>
            }
          >
            {category.map((cate, i) => (
              <div key={i}>
                <Row wrap="nowrap">
                  <Col flex="auto">
                    <Form.Item
                      label={cate}
                      name={cate.toLowerCase()}
                      initialValue={false}
                    >
                      <Checkbox.Group
                        options={permissionOption.map((option) => ({
                          label: option,
                          value: option,
                          disabled:
                            parentLevel[cate.toLowerCase()]?.[option] === 1
                              ? false
                              : true,
                        }))}
                        onChange={checkCheckAll}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    flex="none"
                    style={{ paddingTop: "5px", paddingBottom: "5px" }}
                  >
                    <Checkbox
                      indeterminate={checkStateOne[cate.toLowerCase()] === 2}
                      onChange={() => onCheckAll(cate.toLowerCase())}
                      checked={
                        checkStateOne[cate.toLowerCase()] === 0 ? false : true
                      }
                    >
                      Select All
                    </Checkbox>
                  </Col>
                </Row>
                <Divider />
              </div>
            ))}
            {categoryOnlyView.map((cateOV, i) => (
              <div key={i}>
                <Form.Item
                  label={cateOV}
                  name={cateOV.toLowerCase()}
                  initialValue={false}
                >
                  <Checkbox.Group
                    options={["View"].map((option) => ({
                      label: option,
                      value: option,
                      disabled:
                        parentLevel[cateOV.toLowerCase()]?.[option] === 1
                          ? false
                          : true,
                    }))}
                    onChange={checkCheckAll}
                  />
                </Form.Item>

                <Divider />
              </div>
            ))}
          </Card>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default AddForm;

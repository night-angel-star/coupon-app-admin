import { useState } from "react";
import {
  Form,
  Button,
  Checkbox,
  Space,
  Popconfirm,
  Divider,
  message,
  Spin,
} from "antd";
import DashboardService from "@/services/dashboard.service";
import { useSelector, useDispatch } from "react-redux";
import { hideDrawer } from "@/redux/actions/drawer";

const Permission = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const editId = useSelector((state) => state.drawer.id);
  const handleAdd = () => {
    setLoading(true);
    const fieldValue = props.form.getFieldValue();
    let permissionArray = [];
    category.map((cate) => {
      permissionOption.map((pO) => {
        fieldValue[cate.toLowerCase()]
          ? (permissionArray = [
              ...permissionArray,
              fieldValue[cate.toLowerCase()].includes(pO) ? 1 : 0,
            ])
          : (permissionArray = [...permissionArray, 0]);
        return cate;
      });
      return cate;
    });
    categoryOnlyView.map((cate) => {
      fieldValue[cate.toLowerCase()]
        ? (permissionArray = [
            ...permissionArray,
            fieldValue[cate.toLowerCase()].includes("View") ? 1 : 0,
          ])
        : (permissionArray = [...permissionArray, 0]);
      return cate;
    });
    const payload = { id: editId, permission_list: permissionArray };
    DashboardService.edit("level", payload)
      .then((result) => {
        if (result.status === 201) {
          dispatch(hideDrawer());
          props.reset();
        } else {
          message.error("Problem.");
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Problem");
        console.log(err);
        setLoading(false);
      });
  };
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
  const categoryOnlyView = ["History", "Operation", "Log"];
  return (
    <Spin spinning={loading}>
      <div className="my-10">
        <Form
          form={props.form}
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
          {category.map((cate, i) => (
            <div key={i}>
              <Form.Item
                label={cate}
                name={cate.toLowerCase()}
                initialValue={false}
              >
                <Checkbox.Group options={permissionOption} />
              </Form.Item>
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
                <Checkbox.Group options={["View"]} />
              </Form.Item>
              <Divider />
            </div>
          ))}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Popconfirm
                title="Skip setting permission"
                description="Your level will be saved with no permission."
                onConfirm={() => {
                  props.reset();
                  dispatch(hideDrawer());
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="dashed">Skip</Button>
              </Popconfirm>
              <Button type="primary" htmlType="submit">
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Permission;

import { Form, Input, Button, Spin } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "@/redux/actions/data";
import { hideDrawer } from "@/redux/actions/drawer";

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const editId = useSelector((state) => state.drawer.id);
  const showDrawer = useSelector((state) => state.drawer.show);
  const dispatch = useDispatch();
  const initialData = useSelector(
    (state) => state.data.data.filter((good) => good.no === editId)[0]
  );

  useEffect(() => {
    if (showDrawer === true) {
      form.resetFields();
      try {
        if (editId !== 0) {
          console.log(initialData);
          form.setFieldsValue(initialData);
        }
      } catch {}
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, showDrawer]);
  const handleAdd = async (value) => {
    setLoading(true);
    let payload = value;
    if (editId !== 0) {
      payload = { ...payload, id: editId };
    }
    try {
      await dispatch(addData("goods", payload, editId !== 0));
      dispatch(hideDrawer());
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="my-10">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={handleAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input goods name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nvid"
            name="nvid"
            rules={[
              {
                required: true,
                message: "Please input nvid!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Keyword1"
            name="keyword1"
            rules={[
              {
                required: true,
                message: "Please input keyword1!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Keyword2"
            name="keyword2"
            rules={[
              {
                required: true,
                message: "Please input keyword2!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Keyword3"
            name="keyword3"
            rules={[
              {
                required: true,
                message: "Please input keyword3!",
              },
            ]}
          >
            <Input />
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
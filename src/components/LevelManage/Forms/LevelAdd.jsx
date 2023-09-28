import { Form, Input, Button, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { addData } from "@/redux/actions/data";
import { useDispatch, useSelector } from "react-redux";

const LevelAdd = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const editId = useSelector((state) => state.drawer.id);
  const handleAdd = async () => {
    setLoading(true);
    const payload = props.form.getFieldValue();
    dispatch(addData("level", payload))
      .then(() => {
        props.next();
        setLoading(false);
      })
      .catch(() => {
        message.error("Problem");
        setLoading(false);
      });
  };
  useEffect(() => {
    props.form.setFieldValue("id", editId);
  }, [editId, props.form]);
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

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default LevelAdd;

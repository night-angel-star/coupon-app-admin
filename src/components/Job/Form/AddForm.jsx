import { Form, Input, Button, Spin } from "antd";
import LoginAdd from "./FormItem/Login/LoginAdd";
import MachineAdd from "./FormItem/Machine/MachineAdd";
import ProxyAdd from "./FormItem/Proxy/ProxyAdd";
import BrowserAdd from "./FormItem/Browser/BrowserAdd";
import GoodsAdd from "./FormItem/Goods/GoodsAdd";
import SurfingAdd from "./FormItem/Surfing/SurfingAdd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../redux/actions/data";
import { hideDrawer } from "../../../redux/actions/drawer";

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const editId = useSelector((state) => state.drawer.id);
  const showDrawer = useSelector((state) => state.drawer.show);
  const dispatch = useDispatch();
  const initialData = useSelector(
    (state) => state.data.data.filter((job) => job.id === editId)[0]
  );

  useEffect(() => {
    if (showDrawer === true) {
      form.resetFields();

      try {
        if (editId !== 0) {
          form.setFieldValue("name", initialData.name);
        }
      } catch {}
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, showDrawer]);
  const [form] = Form.useForm();

  const handleAdd = async (value) => {
    setLoading(true);
    let payload = value;
    if (editId !== 0) {
      payload = { ...payload, id: editId };
    }
    try {
      console.log(payload);
      await dispatch(addData("job", payload, editId !== 0));
      dispatch(hideDrawer());
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  return (
    // <Spin spinning={loading}>
    <Spin spinning={loading}>
      <div className="my-10">
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleAdd}
          autoComplete="off"
          form={form}
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

          <LoginAdd form={form} initialData={initialData?.login} />
          <MachineAdd form={form} initialData={initialData?.machine} />
          <ProxyAdd form={form} initialData={initialData?.proxy} />
          <BrowserAdd form={form} initialData={initialData?.browser} />
          <GoodsAdd form={form} initialData={initialData?.goods} />
          <SurfingAdd form={form} initialData={initialData?.surfing} />

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

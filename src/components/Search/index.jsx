import { Button, Space, Select, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../../redux/actions/search";

const Search = (props) => {
  const { fields } = props;
  const dispatch = useDispatch();
  const isFilter = useSelector((state) => state.search.key) !== "";
  const [form] = Form.useForm();

  const onFinish = (value) => {
    if (isFilter) {
      dispatch(clearFilter());
      form.resetFields();
    } else {
      dispatch(setFilter(value));
    }
  };
  return (
    <Form onFinish={onFinish} form={form}>
      <Space>
        <Form.Item
          className="my-0"
          name="key"
          rules={[
            {
              required: true,
              message: "Please select search key!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={fields.map((field) => {
              return { value: field, label: field };
            })}
            placeholder="Select Column"
          />
        </Form.Item>
        <Form.Item
          className="my-0"
          name="value"
          rules={[
            {
              required: true,
              message: "Please input search str!",
            },
          ]}
        >
          <Input placeholder="Input Search Str" />
        </Form.Item>
        <Form.Item className="my-0">
          <Button
            type={isFilter ? "default" : "primary"}
            shape="circle"
            icon={<SearchOutlined />}
            htmlType="submit"
          />
        </Form.Item>
      </Space>
    </Form>
  );
};
export default Search;

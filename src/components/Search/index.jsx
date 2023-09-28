import { Button, Space, Select, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/actions/search";

const Search = (props) => {
  const { fields } = props;
  const dispatch = useDispatch();
  const onFinish = (value) => {
    dispatch(setFilter(value));
  };
  return (
    <Form onFinish={onFinish}>
      <Space>
        <Form.Item className="my-0" name="key">
          <Select
            style={{ width: 120 }}
            options={fields.map((field) => {
              return { value: field, label: field };
            })}
            placeholder="Select Column"
          />
        </Form.Item>
        <Form.Item className="my-0" name="value">
          <Input placeholder="Input Search Str" />
        </Form.Item>
        <Form.Item className="my-0">
          <Button
            type="primary"
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

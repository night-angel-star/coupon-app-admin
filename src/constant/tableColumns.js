import { Tag } from "antd";
const tableColumns = {
  level: [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ],
  member: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
    },
  ],
  goods: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nvid",
      dataIndex: "nvid",
      key: "nvid",
    },
    {
      title: "Keyword1",
      dataIndex: "keyword1",
      key: "keyword1",
    },
    {
      title: "Keyword2",
      dataIndex: "keyword2",
      key: "keyword2",
    },
    {
      title: "Keyword3",
      dataIndex: "keyword3",
      key: "keyword3",
    },
  ],
  proxy: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
    },
    {
      title: "Username",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ],
  browser: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
  ],
  login: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Username",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ],
  machine: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Machine ID",
      dataIndex: "machine_id",
      key: "machine_id",
    },
    {
      title: "Last Access",
      dataIndex: "last_access",
      key: "last_access",
    },
  ],
  surfing: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url) => <a href={url}>{url}</a>,
    },
  ],
  history: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ],
  log: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ],
  job: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "login",
      dataIndex: "login_user",
      key: "login_user",
    },
    {
      title: "machine",
      dataIndex: "machine_id",
      key: "machine_id",
    },
    {
      title: "proxy",
      dataIndex: "proxy_ip",
      key: "proxy_ip",
    },
    {
      title: "browser",
      dataIndex: "browser_name",
      key: "browser_name",
    },
    {
      title: "Goods",
      dataIndex: "goods",
      key: "goods",
      render: (goods) =>
        goods && goods.map((item, i) => <Tag key={i}>{item.name}</Tag>),
    },
    {
      title: "Surfing",
      dataIndex: "surfing",
      key: "surfing",
      render: (surfing) =>
        surfing && surfing.map((item, i) => <Tag key={i}>{item.name}</Tag>),
    },
  ],
  coupon_category: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ],
  coupon: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount(%)",
      dataIndex: "discount",
      key: "discount",
    },
  ],
  brand: [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ],
};

export default tableColumns;

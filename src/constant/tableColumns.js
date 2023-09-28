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
};

export default tableColumns;

import DataTable from "@/components/Tables/DataTable";
import { Row, Space, DatePicker } from "antd";
import tableColumns from "@/constant/tableColumns";

import Search from "@/components/Search";
const { RangePicker } = DatePicker;
export const LogView = () => {
  const columns = tableColumns.log;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const data = [
    {
      no: 1,
      time: "2023/10/01 23:23:00",
      user: "superadmin",
      action: "Start system",
      key: 1,
    },
    {
      no: 2,
      time: "2023/10/02 23:23:05",
      user: "Master1",
      action: "Adduser rrr",
      key: 2,
    },
  ];
  return (
    <div>
      <Row justify={"end"} className="p-2">
        <Space>
          <RangePicker />
          <Search fields={searchFields} />
        </Space>
      </Row>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default LogView;

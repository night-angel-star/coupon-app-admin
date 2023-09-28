import DataTable from "@/components/Tables/DataTable";
import { Row, Space, DatePicker } from "antd";
import tableColumns from "@/constant/tableColumns";

import Search from "@/components/Search";
const { RangePicker } = DatePicker;
export const HistoryView = () => {
  const columns = tableColumns.history;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const data = [
    {
      no: 1,
      time: "2023/10/01 23:23:00",
      machine: "Phone(9012345)",
      action: "Login aaa ok",
      key: 1,
    },
    {
      no: 2,
      time: "2023/10/02 23:23:05",
      machine: "Phone(9012345)",
      action: "Click Shoes(nvid:100023)",
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

export default HistoryView;

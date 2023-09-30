import { Table, Checkbox } from "antd";
import tableColumns from "@/constant/tableColumns";
import DashboardService from "@/services/dashboard.service";
import { useEffect, useState } from "react";
import getDataHandler from "@/utils/getDataHandler";

const ModalContent = (props) => {
  let [tableColumnsNo, ...tableColumnsRest] = tableColumns.surfing;
  const [data, setData] = useState([]);

  tableColumnsNo = {
    ...tableColumnsNo,
    render: (no) => (
      <Checkbox
        checked={props.currentData.some((item) => item.no === no)}
        onClick={() => checkData(no)}
      />
    ),
  };
  const checkData = (no) => {
    if (props.currentData.some((item) => item.no === no)) {
      props.setCurrentData(props.currentData.filter((d) => d.no !== no));
    } else {
      props.setCurrentData([
        ...props.currentData,
        ...data.filter((d) => d.no === no),
      ]);
    }
  };
  useEffect(() => {
    const getHandler = async () => {
      const response = await DashboardService.getList("surfing");
      setData(getDataHandler(response.result, "surfing"));
    };
    try {
      getHandler();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const columns = [tableColumnsNo, ...tableColumnsRest];
  return (
    <div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
};

export default ModalContent;

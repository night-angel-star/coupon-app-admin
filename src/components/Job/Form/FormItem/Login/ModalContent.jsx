import { Table, Radio } from "antd";
import tableColumns from "@/constant/tableColumns";
import DashboardService from "@/services/dashboard.service";
import { useEffect, useState } from "react";
import getDataHandler from "@/utils/getDataHandler";

const ModalContent = (props) => {
  let [tableColumnsNo, ...tableColumnsRest] = tableColumns.login;
  const [data, setData] = useState([]);

  tableColumnsNo = {
    ...tableColumnsNo,
    render: (no) => (
      <Radio
        checked={no === props.currentData.no}
        onClick={() => props.setCurrentData(...data.filter((d) => d.no === no))}
      />
    ),
  };
  useEffect(() => {
    const getHandler = async () => {
      const response = await DashboardService.getList("login");
      setData(getDataHandler(response.result, "login"));
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

import { Table, Radio } from "antd";
import tableColumns from "../../../../../constant/tableColumns";
import DashboardService from "../../../../../services/dashboard.service";
import { useEffect, useState } from "react";
import getDataHandler from "../../../../../utils/getDataHandler";
import { useSelector } from "react-redux";

const ModalContent = (props) => {
  let [tableColumnsNo, ...tableColumnsRest] = tableColumns.machine;
  const [data, setData] = useState([]);

  const showDrawer = useSelector((state) => state.drawer.show);
  const editId = useSelector((state) => state.drawer.id);

  useEffect(() => {
    if (showDrawer === true) {
      setData([]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, showDrawer]);

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
      const response = await DashboardService.getList("machine");
      setData(getDataHandler(response.result, "machine"));
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

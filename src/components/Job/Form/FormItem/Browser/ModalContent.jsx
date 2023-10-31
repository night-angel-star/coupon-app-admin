import { Table, Radio } from "antd";
import tableColumns from "../../../../../constant/tableColumns";
import DashboardService from "../../../../../services/dashboard.service";
import { useEffect, useState } from "react";
import getDataHandler from "../../../../../utils/getDataHandler";
import { useSelector } from "react-redux";

const ModalContent = (props) => {
  let [tableColumnsNo, ...tableColumnsRest] = tableColumns.browser;
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
    dataIndex: "id",
    key: "id",
    render: (id) => (
      <Radio
        checked={id === props.currentData.id}
        onClick={() => props.setCurrentData(...data.filter((d) => d.id === id))}
      />
    ),
  };
  useEffect(() => {
    const getHandler = async () => {
      const response = await DashboardService.getList("browser");
      setData(getDataHandler(response.result, "browser"));
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

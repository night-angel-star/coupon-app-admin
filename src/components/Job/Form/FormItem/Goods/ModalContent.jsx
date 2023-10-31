import { Table, Checkbox } from "antd";
import tableColumns from "../../../../../constant/tableColumns";
import DashboardService from "../../../../../services/dashboard.service";
import { useEffect, useState } from "react";
import getDataHandler from "../../../../../utils/getDataHandler";
import { useSelector } from "react-redux";

const ModalContent = (props) => {
  let [tableColumnsNo, ...tableColumnsRest] = tableColumns.goods;
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
    fixed: "left",
    render: (id) => (
      <Checkbox
        checked={props.currentData.some((item) => item.id === id)}
        onClick={() => checkData(id)}
      />
    ),
  };
  const checkData = (id) => {
    if (props.currentData.some((item) => item.id === id)) {
      props.setCurrentData(props.currentData.filter((d) => d.id !== id));
    } else {
      props.setCurrentData([
        ...props.currentData,
        ...data.filter((d) => d.id === id),
      ]);
    }
  };
  useEffect(() => {
    const getHandler = async () => {
      const response = await DashboardService.getList("goods");
      setData(getDataHandler(response.result, "goods"));
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

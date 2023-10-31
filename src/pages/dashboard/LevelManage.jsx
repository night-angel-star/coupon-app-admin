import DataTable from "../../components/Tables/DataTable";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "../../components/Search";
// import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { showDrawer } from "../../redux/actions/drawer";
import { useDispatch } from "react-redux";
import tableColumns from "../../constant/tableColumns";

export const LevelManage = () => {
  // const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const pageName = pathname.substring(1, pathname.length);
  const pageName = useSelector((state) => state.route.name);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const columns = tableColumns.level;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const data = useSelector((state) => state.data.data);
  const newId = data.length + 1;

  const openDrawer = () => {
    dispatch(
      showDrawer({
        id: newId,
        title: "Add Level",
        show: true,
      })
    );
  };
  return (
    <div>
      <Row justify={"end"} className="p-2">
        <Space>
          <Search fields={searchFields} />
          {permission[pageName].add === 1 && (
            <Button type="primary" icon={<PlusOutlined />} onClick={openDrawer}>
              Add
            </Button>
          )}
        </Space>
      </Row>
      <DataTable columns={columns} showAction />
    </div>
  );
};

export default LevelManage;

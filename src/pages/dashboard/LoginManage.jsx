import DataTable from "@/components/Tables/DataTable";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "@/components/Search";
import tableColumns from "@/constant/tableColumns";
import { showDrawer } from "@/redux/actions/drawer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const LoginManage = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const pageName = pathname.substring(1, pathname.length);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const columns = tableColumns.login;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const openDrawer = () => {
    dispatch(
      showDrawer({
        id: 0,
        title: "Add Login",
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

export default LoginManage;

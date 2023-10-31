import DataTable from "../../components/CouponManage/DataTable";
import { Row, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "../../components/Search";
import tableColumns from "../../constant/tableColumns";
import { showDrawer } from "../../redux/actions/drawer";
import { useDispatch, useSelector } from "react-redux";

export const CouponManage = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.level : {}
  );
  const columns = tableColumns.coupon;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const openDrawer = () => {
    dispatch(
      showDrawer({
        id: 0,
        title: "Add Goods",
        show: true,
      })
    );
  };
  return (
    <div>
      <Row justify={"end"} className="p-2">
        <Space>
          <Search fields={searchFields} />
          {level === 1 && (
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

export default CouponManage;

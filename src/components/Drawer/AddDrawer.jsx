import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer } from "../../redux/actions/drawer";
// import { useLocation } from "react-router-dom";

//Add Forms
import LevelAddForm from "../../components/LevelManage/Forms/AddForm";
import MemberAddForm from "../../components/MemberManage/Forms/AddForm";
import GoodsAddForm from "../../components/GoodsManage/Forms/AddForm";
import ProxyAddForm from "../../components/ProxyManage/Forms/AddForm";
import BrowserAddForm from "../../components/BrowserManage/Forms/AddForm";
import LoginAddForm from "../../components/LoginManage/Forms/AddForm";
import SurfingSiteAddForm from "../../components/SurfingSite/Form/AddForm";
import JobAddForm from "../../components/Job/Form/AddForm";
import MachineAddForm from "../../components/MachineManage/Forms/AddForm";
import CouponCategoryAddForm from "../../components/CouponCategoryManage/Forms/AddForm";
import CouponAddForm from "../../components/CouponManage/Forms/AddForm";
import BrandAddForm from "../../components/BrandManage/Forms/AddForm";
import CouponUserAddForm from "../../components/CouponUserManage/Forms/AddForm";

const AddDrawer = () => {
  const dispatch = useDispatch();
  // const { pathname } = useLocation();
  // const pageName = pathname.substring(1, pathname.length);
  const pageName = useSelector((state) => state.route.name);

  const drawerState = useSelector((state) => state.drawer);
  // const { drawerVisibility } = useSelector((state) => state.edit);

  const onClose = () => {
    dispatch(hideDrawer());
  };

  return (
    <>
      <Drawer
        title={drawerState.title}
        width={720}
        open={drawerState.show}
        onClose={onClose}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {(() => {
          switch (pageName) {
            case "level":
              return <LevelAddForm />;
            case "member":
              return <MemberAddForm />;
            case "goods":
              return <GoodsAddForm />;
            case "proxy":
              return <ProxyAddForm />;
            case "browser":
              return <BrowserAddForm />;
            case "login":
              return <LoginAddForm />;
            case "machine":
              return <MachineAddForm />;
            case "surfing":
              return <SurfingSiteAddForm />;
            case "job":
              return <JobAddForm />;
            case "coupon_user":
              return <CouponUserAddForm />;
            case "coupon_category":
              return <CouponCategoryAddForm />;
            case "coupon":
              return <CouponAddForm />;
            case "brand":
              return <BrandAddForm />;
            default:
              return <div></div>;
          }
        })()}
      </Drawer>
    </>
  );
};
export default AddDrawer;

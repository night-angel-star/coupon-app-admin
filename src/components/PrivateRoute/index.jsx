import React from "react";
// import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Row, Col, message } from "antd";
import { SideMenu } from "../Layout/SideMenu";
import AppHeader from "../Layout/AppHeader";
// import { useLocation } from "react-router-dom";
import AddDrawer from "../../components/Drawer/AddDrawer";
import { useDispatch } from "react-redux";
import { setRoute } from "../../redux/actions/route";

export default function PrivateRoute({ children }) {
  //const { pathname } = useLocation();
  //const pageName = pathname.substring(1, pathname.length);
  const pageName = useSelector((state) => state.route.name);
  const logged = useSelector((state) => state.auth.isLoggedIn);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const dispatch = useDispatch();
  const navigateTo = (payload) => {
    dispatch(setRoute(payload));
  };

  React.useEffect(() => {
    if (
      !(
        pageName === "dashboard" ||
        pageName === "coupon_category" ||
        pageName === "coupon" ||
        pageName === "brand" ||
        pageName === "advertisement" ||
        (permission[pageName] && permission[pageName].view === 1)
      )
    ) {
      if (pageName !== "auth/login") {
        message.open({ type: "warning", content: "You have no permission" });
      }
    }
  }, [pageName, permission]);
  if (logged) {
    if (
      pageName === "dashboard" ||
      pageName === "coupon_category" ||
      pageName === "coupon" ||
      pageName === "brand" ||
      pageName === "advertisement" ||
      (permission[pageName] && permission[pageName].view === 1)
    ) {
      return (
        <>
          <AddDrawer />
          <div className="mb-5">
            <AppHeader />
          </div>
          <Row>
            <Col span={4} className="h-64px sticky top-0">
              <SideMenu />
            </Col>
            <Col span={20} className="p-10">
              {children}
            </Col>
          </Row>
        </>
      );
    } else {
      return <div onLoad={() => navigateTo("dashboard")} />;
    }
  } else {
    return <div onLoad={() => navigateTo("auth/login")} />;
  }
}

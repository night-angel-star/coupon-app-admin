import { Login } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";

import {
  LevelManage,
  MemberManage,
  GoodsManage,
  JobManage,
  ProxyManage,
  BrowserManage,
  LoginManage,
  MachineManage,
  SurfingSiteManage,
  CouponManage,
  BrandManage,
  CouponCategoryManage,
  AdvertisementManage,
  HistoryView,
  LogView,
} from "./pages/dashboard";
import PrivateRoute from "./components/PrivateRoute";
// import { Link } from "react-router-dom";

const AppRoutes = [
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    label: <div>Dashboard</div>,
  },
  {
    path: "level",
    element: (
      <PrivateRoute>
        <LevelManage />
      </PrivateRoute>
    ),
    label: <div>Level</div>,
  },
  {
    path: "member",
    element: (
      <PrivateRoute>
        <MemberManage />
      </PrivateRoute>
    ),
    label: <div>Member</div>,
  },
  {
    path: "goods",
    element: (
      <PrivateRoute>
        <GoodsManage />
      </PrivateRoute>
    ),
    label: <div>Goods</div>,
  },
  {
    path: "job",
    element: (
      <PrivateRoute>
        <JobManage />
      </PrivateRoute>
    ),
    label: <div>Job</div>,
  },
  {
    path: "proxy",
    element: (
      <PrivateRoute>
        <ProxyManage />
      </PrivateRoute>
    ),
    label: <div>Proxy</div>,
  },
  {
    path: "browser",
    element: (
      <PrivateRoute>
        <BrowserManage />
      </PrivateRoute>
    ),
    label: <div>Browser</div>,
  },
  {
    path: "login",
    element: (
      <PrivateRoute>
        <LoginManage />
      </PrivateRoute>
    ),
    label: <div>Login</div>,
  },
  {
    path: "machine",
    element: (
      <PrivateRoute>
        <MachineManage />
      </PrivateRoute>
    ),
    label: <div>Machine</div>,
  },
  {
    path: "surfing",
    element: (
      <PrivateRoute>
        <SurfingSiteManage />
      </PrivateRoute>
    ),
    label: <div>Surfing</div>,
  },
  {
    path: "coupon_category",
    element: (
      <PrivateRoute>
        <CouponCategoryManage />
      </PrivateRoute>
    ),
    label: <div>Coupon Category</div>,
  },
  {
    path: "brand",
    element: (
      <PrivateRoute>
        <BrandManage />
      </PrivateRoute>
    ),
    label: <div>Coupon Brand</div>,
  },
  {
    path: "coupon",
    element: (
      <PrivateRoute>
        <CouponManage />
      </PrivateRoute>
    ),
    label: <div>Coupon Product</div>,
  },
  {
    path: "advertisement",
    element: (
      <PrivateRoute>
        <AdvertisementManage />
      </PrivateRoute>
    ),
    label: <div>Advertisement</div>,
  },
  {
    path: "history",
    element: (
      <PrivateRoute>
        <HistoryView />
      </PrivateRoute>
    ),
    label: <div>History</div>,
  },
  {
    path: "log",
    element: (
      <PrivateRoute>
        <LogView />
      </PrivateRoute>
    ),
    label: <div>Log</div>,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
];

export default AppRoutes;

import { lazy } from "react";

const LevelManage = lazy(() => import("./pages/dashboard/LevelManage"));
const MemberManage = lazy(() => import("./pages/dashboard/MemberManage"));
const GoodsManage = lazy(() => import("./pages/dashboard/GoodsManage"));
const JobManage = lazy(() => import("./pages/dashboard/JobManage"));
const ProxyManage = lazy(() => import("./pages/dashboard/ProxyManage"));
const BrowserManage = lazy(() => import("./pages/dashboard/BrowserManage"));
const LoginManage = lazy(() => import("./pages/dashboard/LoginManage"));
const MachineManage = lazy(() => import("./pages/dashboard/MachineManage"));
const SurfingSiteManage = lazy(() =>
  import("./pages/dashboard/SurfingSiteManage")
);
const CouponUserManage = lazy(() =>
  import("./pages/dashboard/CouponUserManage")
);
const CouponManage = lazy(() => import("./pages/dashboard/CouponManage"));
const BrandManage = lazy(() => import("./pages/dashboard/BrandManage"));
const CouponCategoryManage = lazy(() =>
  import("./pages/dashboard/CouponCategoryManage")
);
const AdvertisementManage = lazy(() =>
  import("./pages/dashboard/AdvertisementManage")
);
const HistoryView = lazy(() => import("./pages/dashboard/HistoryView"));
const LogView = lazy(() => import("./pages/dashboard/LogView"));

const PrivateRoute = lazy(() => import("./components/PrivateRoute/index"));

const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
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
    path: "coupon_user",
    element: (
      <PrivateRoute>
        <CouponUserManage />
      </PrivateRoute>
    ),
    label: <div>Coupon User</div>,
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

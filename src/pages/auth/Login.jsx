import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth";
// import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setRoute } from "../../redux/actions/route";

export const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const message = useSelector((state) => state.message.message);

  const [loading, setLoading] = useState(false);

  // let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setRoute("dashboard"));
    }
  }, [isLoggedIn, dispatch]);

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(login(values))
      .then(() => {
        setLoading(false);
        // navigate("/");
        // window.location.reload();
        dispatch(setRoute("dashboard"));
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Spin spinning={loading}>
      <ProConfigProvider hashed={false}>
        <div className="bg-white mt-16">
          <LoginForm
            title="SIGN IN"
            subTitle="Sign-in with your e-shop admin account."
            submitter={{
              searchConfig: {
                submitText: "Sign In",
              },
            }}
            onFinish={handleSubmit}
          >
            <>
              {message && (
                <Alert
                  message={message}
                  type="error"
                  className="my-2"
                  showIcon
                />
              )}
              <ProFormText
                name="name"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Input user name"}
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Input password"}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              />
            </>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </Spin>
  );
};
export default Login;

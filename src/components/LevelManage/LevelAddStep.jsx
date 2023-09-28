import React, { useEffect, useState } from "react";
import { Steps, Form } from "antd";
import LevelAdd from "./Forms/LevelAdd";
import Permission from "./Forms/Permission";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const LevelAddStep = (props) => {
  const editId = useSelector((state) => state.drawer.id);
  const [current, setCurrent] = useState(0);
  const [levelAddForm] = Form.useForm();
  const [permissonSetForm] = Form.useForm();

  useEffect(() => {
    setCurrent(0);
    levelAddForm.resetFields();

    if (current === 0) {
      return;
    }
    permissonSetForm.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);
  const onClose = () => {
    // dispatch(setDrawerVisibility(false));
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const reset = () => {
    onClose();
    setCurrent(0);
    levelAddForm.resetFields();

    if (current === 0) {
      return;
    }
    permissonSetForm.resetFields();
  };
  const steps = [
    {
      title: "Entry",
      icon: <UserOutlined />,
      content: <LevelAdd next={next} form={levelAddForm} />,
    },
    {
      title: "Permission",
      icon: <SolutionOutlined />,
      content: <Permission reset={reset} form={permissonSetForm} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <>
      <Steps current={current} items={items} className="mx-32 w-auto" />
      <div>{steps[current].content}</div>
    </>
  );
};
export default LevelAddStep;

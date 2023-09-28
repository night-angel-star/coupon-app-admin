import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, message, Spin } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeData } from "@/redux/actions/data";
import { useDispatch } from "react-redux";
import { getData, clearData } from "@/redux/actions/data";
import { showDrawer } from "@/redux/actions/drawer";
import { clearFilter } from "@/redux/actions/search";

const EditableDataTable = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { columns, showAction } = props;
  const { pathname } = useLocation();
  const pageName = pathname.substring(1, pathname.length);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const { key, value } = useSelector((state) => state.search);

  const data = useSelector((state) => state.data.data);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (key.length > 0) {
      setFilteredData(
        data.filter((d) => {
          console.log(d[key]);
          if (typeof d[key] === "string") {
            return d[key].indexOf(value) > -1 ? true : false;
          } else {
            return d[key].toString() === value ? true : false;
          }
        })
      );
    } else {
      setFilteredData(data);
    }
  }, [key, value, data]);

  useEffect(() => {
    if (pageName) {
      setLoading(true);

      const getHandler = async () => {
        dispatch(clearData());
        dispatch(getData(pageName))
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      };
      dispatch(clearFilter());
      getHandler();
    }
  }, [dispatch, pageName]);

  const editButtonHandler = (id) => {
    dispatch(showDrawer({ id: id, title: `Edit ${pageName}`, show: true }));
  };
  const deleteButtonHandler = (id) => {
    if (permission[pageName].del === 1) {
      setLoading(true);
      dispatch(removeData(pageName, { id }))
        .then(() => setLoading(false))
        .catch(() => {
          message.error("Problem");
          setLoading(false);
        });
    } else {
      message.open({ type: "warning", content: "You have no permission" });
    }
  };
  const columnWithControl = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          {permission[pageName].edit === 1 && (
            <EditTwoTone
              className="cursor-pointer"
              onClick={() => editButtonHandler(item.key)}
            />
          )}
          <Popconfirm
            placement="left"
            title="Sure to delete?"
            description="All levels and members below this level will be deleted."
            onConfirm={() => deleteButtonHandler(item.key)}
            okText="Yes"
            cancelText="No"
          >
            {permission[pageName].del === 1 && (
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                className="cursor-pointer"
              />
            )}
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Spin spinning={loading}>
      <Table
        columns={showAction ? columnWithControl : columns}
        dataSource={filteredData}
      />
    </Spin>
  );
};
export default EditableDataTable;

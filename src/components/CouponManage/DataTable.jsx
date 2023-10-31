import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, message, Spin, Image, Switch } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import { removeData } from "../../redux/actions/data";
import { useDispatch } from "react-redux";
import { getData, clearData, addData } from "../../redux/actions/data";
import { showDrawer } from "../../redux/actions/drawer";
import { clearFilter } from "../../redux/actions/search";
import API_URL from "../../services/API";

const EditableDataTable = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { columns, showAction } = props;
  // const { pathname } = useLocation();
  // const pageName = pathname.substring(1, pathname.length);
  const pageName = useSelector((state) => state.route.name);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const level = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.level : -1
  );

  const realPermissionForEdit = permission[pageName]
    ? permission[pageName].edit
    : level;
  const realPermissionForDel = permission[pageName]
    ? permission[pageName].del
    : level;
  const { key, value } = useSelector((state) => state.search);

  const data = useSelector((state) => state.data.data);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (key.length > 0) {
      setFilteredData(
        data.filter((d) => {
          if (d[key]) {
            if (typeof d[key] === "string") {
              return d[key].toLowerCase().indexOf(value.toLowerCase()) > -1;
            } else {
              return d[key].toString() === value ? true : false;
            }
          } else {
            return false;
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

  const onSwitch = (item) => {
    setLoading(true);
    dispatch(
      addData("coupon", { ...item, status: 1 - item.status }, true)
    ).then(() => {
      setLoading(false);
    });
  };

  const editButtonHandler = (id) => {
    dispatch(showDrawer({ id: id, title: `Edit ${pageName}`, show: true }));
  };
  const deleteButtonHandler = (id) => {
    if (realPermissionForDel === 1) {
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
      title: "Image",
      key: "image",
      render: (item) => (
        <Space size="small">
          <Image
            width={50}
            src={`${API_URL}uploads/${item.image1}`}
            alt={item.image1}
          />
          {item.image2 && (
            <Image
              width={50}
              src={`${API_URL}uploads/${item.image2}`}
              alt={item.image2}
            />
          )}
          {item.image3 && (
            <Image
              width={50}
              src={`${API_URL}uploads/${item.image3}`}
              alt={item.image3}
            />
          )}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          {realPermissionForEdit === 1 && (
            <EditTwoTone
              className="cursor-pointer"
              onClick={() => editButtonHandler(item.key)}
            />
          )}
          <Popconfirm
            placement="left"
            title="Sure to delete?"
            onConfirm={() => deleteButtonHandler(item.key)}
            okText="Yes"
            cancelText="No"
          >
            {realPermissionForDel === 1 && (
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                className="cursor-pointer"
              />
            )}
          </Popconfirm>
          {level === 1 && (
            <Switch
              checkedChildren="Enable"
              unCheckedChildren="Disable"
              checked={item.status}
              style={{ marginLeft: "20px" }}
              onChange={() => onSwitch(item)}
            />
          )}
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

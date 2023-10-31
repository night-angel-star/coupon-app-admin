import React from "react";
// import DataTable from "../../components/Tables/DataTable";
import {
  Row,
  Space,
  Button,
  Tree,
  Switch,
  Popconfirm,
  message,
  Spin,
  Popover,
  Image,
} from "antd";
import {
  PlusOutlined,
  DownOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
// import Search from "../../components/Search";
// import tableColumns from "../../constant/tableColumns";
import { showDrawer } from "../../redux/actions/drawer";
import { useDispatch, useSelector } from "react-redux";

import { getData, removeData, addData } from "../../redux/actions/data";
import API_URL from "../../services/API";

export const CouponCategoryManage = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const level = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.level : {}
  );
  const data = useSelector((state) =>
    state.auth.isLoggedIn ? state.data.data : []
  );
  const onSwitch = (item) => {
    setLoading(true);
    dispatch(
      addData("coupon_category", { ...item, status: 1 - item.status }, true)
    ).then(() => {
      setLoading(false);
    });
  };
  const popoverContent = (item) => {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <h2>{item.name}</h2>
        <div>
          <Image
            width={100}
            src={`${API_URL}uploads/${item.image1}`}
            alt={item.image1}
          />
          {item.image2 && (
            <Image
              width={100}
              src={`${API_URL}uploads/${item.image2}`}
              alt={item.image2}
            />
          )}
          {item.image3 && (
            <Image
              width={100}
              src={`${API_URL}uploads/${item.image3}`}
              alt={item.image3}
            />
          )}
        </div>
      </div>
    );
  };
  const updateTitleRecursively = (data) => {
    return data.map((item) => {
      if (item.children !== undefined) {
        if (item.children.length) {
          return {
            ...item,
            title: (
              <span>
                <Popover
                  placement="rightBottom"
                  content={popoverContent(item)}
                  trigger="hover"
                >
                  <span style={{ color: item.status ? "#333" : "#999" }}>
                    {item.name}
                  </span>
                </Popover>
                {level === 1 && (
                  <>
                    <EditTwoTone
                      className="cursor-pointer"
                      onClick={() => editButtonHandler(item)}
                      style={{ marginLeft: "20px" }}
                    />
                    <Popconfirm
                      placement="left"
                      title="Sure to delete?"
                      description="All categories and goods below this category will be deleted."
                      onConfirm={() => deleteButtonHandler(item.key)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteTwoTone
                        twoToneColor="#eb2f96"
                        className="cursor-pointer"
                        style={{ marginLeft: "20px" }}
                      />
                    </Popconfirm>
                    <Switch
                      checkedChildren="Enable"
                      unCheckedChildren="Disable"
                      checked={item.status}
                      style={{ marginLeft: "20px" }}
                      onChange={() => onSwitch(item)}
                    />
                  </>
                )}
              </span>
            ),
            children: updateTitleRecursively(item.children),
          };
        }
        return {
          ...item,
          title: (
            <span>
              <Popover
                placement="rightBottom"
                content={popoverContent(item)}
                trigger="hover"
              >
                <span style={{ color: item.status ? "#333" : "#999" }}>
                  {item.name}
                </span>
              </Popover>
              {level === 1 && (
                <>
                  <EditTwoTone
                    className="cursor-pointer"
                    onClick={() => editButtonHandler(item)}
                    style={{ marginLeft: "20px" }}
                  />
                  <Popconfirm
                    placement="left"
                    title="Sure to delete?"
                    description="All categories and coupons below this category will be deleted."
                    onConfirm={() => deleteButtonHandler(item.key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteTwoTone
                      twoToneColor="#eb2f96"
                      className="cursor-pointer"
                      style={{ marginLeft: "20px" }}
                    />
                  </Popconfirm>
                  <Switch
                    checkedChildren="Enable"
                    unCheckedChildren="Disable"
                    checked={item.status}
                    style={{ marginLeft: "20px" }}
                    onChange={() => onSwitch(item)}
                  />
                </>
              )}
            </span>
          ),
        };
      } else {
        return {};
      }
    });
  };
  const editButtonHandler = (id) => {
    dispatch(showDrawer({ id: id, title: `Edit Coupon Category`, show: true }));
  };
  const deleteButtonHandler = (id) => {
    setLoading(true);
    dispatch(removeData("coupon_category", { id }))
      .then(() => setLoading(false))
      .catch(() => {
        message.error("Problem");
        setLoading(false);
      });
  };
  React.useEffect(() => {
    setLoading(true);
    dispatch(getData("coupon_category"));
    setLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openDrawer = () => {
    dispatch(showDrawer({ id: 0, title: "Add Category", show: true }));
  };
  const onSelect = (selectedKeys, info) => {
    // console.log("selected", selectedKeys, info);
  };

  return (
    <div>
      <Row justify={"end"} className="p-2">
        <Space>
          {level === 1 && (
            <Button type="primary" icon={<PlusOutlined />} onClick={openDrawer}>
              Add
            </Button>
          )}
        </Space>
      </Row>
      <Spin spinning={loading}>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          treeData={updateTitleRecursively(data)}
          style={{
            fontSize: "20px",
          }}
        />
      </Spin>
    </div>
  );
};

export default CouponCategoryManage;

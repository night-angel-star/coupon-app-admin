import ImgCrop from "antd-img-crop";
import { Form, Input, Button, Spin, TreeSelect, Upload, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../redux/actions/data";
import { hideDrawer } from "../../../redux/actions/drawer";
import dashboardService from "../../../services/dashboard.service";
import API_URL from "../../../services/API";

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const editId = useSelector((state) => state.drawer.id);
  const showDrawer = useSelector((state) => state.drawer.show);
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.data.data);
  const [data, setData] = useState(useSelector((state) => state.data.data));
  const updateTitleRecursively = (data) => {
    return data.map((item) => {
      if (item.children) {
        if (item.children.length) {
          return {
            ...item,
            title: item.name,
            value: item.id,
            children: updateTitleRecursively(item.children),
          };
        }
        return {
          ...item,
          title: item.name,
          value: item.id,
        };
      } else {
        return {};
      }
    });
  };

  const uploadProps = {
    action: `${API_URL}file/upload`,
    listType: "picture-card",
    fileList: fileList,
    beforeUpload: (file) => {
      const newFileName = file.uid + "_" + file.lastModified + "_" + file.name;
      const newFile = new File([file], newFileName, { type: file.type });
      return newFile;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
    onRemove: ({ name }) => {
      dashboardService.delUpload({ filename: name });
    },
  };

  useEffect(() => {
    if (showDrawer === true) {
      // dispatch(getData());
      form.resetFields();
      setFileList([]);
      try {
        if (editId !== 0) {
          const getCategoryData = async () => {
            try {
              const parentData =
                await dashboardService.getCategoryForParentSelect(editId.id);
              setData(parentData);
              // await setCategoryOption(data);
            } catch (error) {
              console.log(error);
            }
          };
          getCategoryData();
          form.setFieldsValue(editId);
          const fileItems = [];
          for (let i = 0; i < 3; i++) {
            editId[`image${i + 1}`] &&
              fileItems.push({
                uid: "-1",
                name: editId[`image${i + 1}`],
                status: "done",
                url: `${API_URL}uploads/${editId[`image${i + 1}`]}`,
              });
          }
          setFileList(fileItems);
        } else {
          setData(initialData);
        }
      } catch {}
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, showDrawer]);
  const handleAdd = async (value) => {
    if (fileList.length < 1) {
      message.warning("Select images!");
    } else {
      setLoading(true);
      let payload = value;
      for (let i = 0; i < 3; i++) {
        payload[`image${i + 1}`] = fileList[i] ? fileList[i].name : null;
      }
      if (editId !== 0) {
        payload = { ...payload, id: editId.id };
      }
      if (payload.parent_id === undefined) {
        payload.parent_id = 0;
      }
      try {
        await dispatch(addData("coupon_category", payload, editId !== 0));
        dispatch(hideDrawer());
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="my-10">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleAdd}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Parent Category" name="parent_id">
            <TreeSelect
              showSearch
              dropdownStyle={{
                maxHeight: 400,
                overflow: "auto",
                minWidth: 300,
              }}
              placeholder="Please select"
              placement={"bottomLeft"}
              allowClear
              treeDefaultExpandAll
              treeData={updateTitleRecursively(data)}
            />
          </Form.Item>
          <Form.Item label="Images" name="image">
            <ImgCrop rotationSlider>
              <Upload {...uploadProps}>
                {fileList.length < 3 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default AddForm;

import ImgCrop from "antd-img-crop";
import {
  Form,
  Input,
  Button,
  Spin,
  TreeSelect,
  Select,
  Upload,
  message,
  InputNumber,
} from "antd";
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
  const initialData = useSelector(
    (state) => state.data.data.filter((data) => data.id === editId)[0]
  );
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const updateTitleRecursively = (data) => {
    return data.map((item) => {
      if (item.children) {
        if (item.children.length) {
          return {
            ...item,
            title: item.name,
            value: item.id,
            disabled: true,
            children: updateTitleRecursively(item.children),
          };
        }
        return {
          ...item,
          disabled: !item.status,
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
      const getCategoryData = async () => {
        try {
          const categoryData = await dashboardService.getCategoryForCoupon();
          setCategoryData(categoryData);
          // await setCategoryOption(data);
        } catch (error) {
          console.log(error);
        }
      };
      getCategoryData();
      const getBrandData = async () => {
        try {
          const brandData = await dashboardService.getBrands();
          setBrandData(brandData);
        } catch (error) {
          console.log(error);
        }
      };
      getBrandData();
      try {
        if (editId !== 0) {
          form.setFieldsValue(initialData);
          const fileItems = [];
          for (let i = 0; i < 3; i++) {
            initialData[`image${i + 1}`] &&
              fileItems.push({
                uid: "-1",
                name: initialData[`image${i + 1}`],
                status: "done",
                url: `${API_URL}uploads/${initialData[`image${i + 1}`]}`,
              });
          }
          setFileList(fileItems);
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
        payload = { ...payload, id: editId };
      }
      if (payload.discount === undefined) {
        payload.discount = 0;
      }
      try {
        await dispatch(addData("coupon", payload, editId !== 0));
        dispatch(hideDrawer());
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
          <Form.Item
            label="Description"
            name="desc"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[
              {
                required: true,
                message: "Please input Category!",
              },
            ]}
          >
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
              treeData={updateTitleRecursively(categoryData)}
            />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[
              {
                required: true,
                message: "Please input brand!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a brand"
              optionFilterProp="children"
              filterOption={filterOption}
              options={brandData.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <InputNumber
              min={1}
              defaultValue={0}
              formatter={(value) => `${value}`}
            />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <InputNumber
              min={0}
              defaultValue={0}
              formatter={(value) => `${value}%`}
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

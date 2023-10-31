import API_URL from "../../services/API";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Row, Col, Carousel, Image, Button } from "antd";
import dashboardService from "../../services/dashboard.service";
const contentStyle = {
  height: "300px",
  color: "#999",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file, index) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return false;
  }
  const newFileName = `Advertisement${index}.jpg`;
  const newFile = new File([file], newFileName, {
    type: file.type,
  });
  return newFile;
};

export const AdvertisementManage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl1, setImageUrl1] = useState(
    `${API_URL}uploads/Advertisement1.jpg`
  );
  const [imageUrl2, setImageUrl2] = useState(
    `${API_URL}uploads/Advertisement2.jpg`
  );
  const [imageUrl3, setImageUrl3] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl4, setImageUrl4] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl5, setImageUrl5] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl6, setImageUrl6] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl7, setImageUrl7] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl8, setImageUrl8] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl9, setImageUrl9] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );
  const [imageUrl10, setImageUrl10] = useState(
    `${API_URL}uploads/Advertisement3.jpg`
  );

  const [images, setImages] = useState([]);
  React.useEffect(() => {
    dashboardService.getAdverts().then((response) => {
      setImages(response.adverts);
    });
  }, [
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    imageUrl5,
    imageUrl6,
    imageUrl7,
    imageUrl8,
    imageUrl9,
    imageUrl10,
  ]);
  const handleChange1 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl1(url);
      });
    }
  };
  const handleChange2 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl2(url);
      });
    }
  };
  const handleChange3 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl3(url);
      });
    }
  };
  const handleChange4 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl4(url);
      });
    }
  };
  const handleChange5 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl5(url);
      });
    }
  };
  const handleChange6 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl6(url);
      });
    }
  };
  const handleChange7 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl7(url);
      });
    }
  };
  const handleChange8 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl8(url);
      });
    }
  };
  const handleChange9 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl9(url);
      });
    }
  };
  const handleChange10 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl10(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dashboardService
        .delAdvert({ filename: images[index] })
        .then((response) => {
          if (response["status"] === 200) {
            message.success("Image deleted successfully!");
            switch (index) {
              case 0:
                setImageUrl1("");
                break;
              case 1:
                setImageUrl2("");
                break;
              case 2:
                setImageUrl3("");
                break;
              case 3:
                setImageUrl4("");
                break;
              case 4:
                setImageUrl5("");
                break;
              case 5:
                setImageUrl6("");
                break;
              case 6:
                setImageUrl7("");
                break;
              case 7:
                setImageUrl8("");
                break;
              case 8:
                setImageUrl9("");
                break;
              case 9:
                setImageUrl10("");
                break;
              default:
                break;
            }
          }
        });
    }
  };

  return (
    <Row gutter={16}>
      <Col span={4} style={{ textAlign: "center" }}>
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 1)}
          onChange={handleChange1}
        >
          {images[0] ? (
            <img
              src={imageUrl1}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(0)}
          danger
          disabled={!images[0]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 2)}
          onChange={handleChange2}
        >
          {images[1] ? (
            <img
              src={imageUrl2}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(1)}
          danger
          disabled={!images[1]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 3)}
          onChange={handleChange3}
        >
          {images[2] ? (
            <img
              src={imageUrl3}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(2)}
          danger
          disabled={!images[2]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 4)}
          onChange={handleChange4}
        >
          {images[3] ? (
            <img
              src={imageUrl4}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(3)}
          danger
          disabled={!images[3]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 5)}
          onChange={handleChange5}
        >
          {images[4] ? (
            <img
              src={imageUrl5}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(4)}
          danger
          disabled={!images[4]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 6)}
          onChange={handleChange6}
        >
          {images[5] ? (
            <img
              src={imageUrl6}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(5)}
          danger
          disabled={!images[5]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 7)}
          onChange={handleChange7}
        >
          {images[6] ? (
            <img
              src={imageUrl7}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(6)}
          danger
          disabled={!images[6]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 8)}
          onChange={handleChange8}
        >
          {images[7] ? (
            <img
              src={imageUrl8}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(7)}
          danger
          disabled={!images[7]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 9)}
          onChange={handleChange9}
        >
          {images[8] ? (
            <img
              src={imageUrl9}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(8)}
          danger
          disabled={!images[8]}
        >
          Delete
        </Button>
        <br />
        <Upload
          name="file"
          listType="picture-card"
          className="file-uploader"
          showUploadList={false}
          action={`${API_URL}file/upload`}
          beforeUpload={(file) => beforeUpload(file, 10)}
          onChange={handleChange10}
        >
          {images[9] ? (
            <img
              src={imageUrl10}
              alt="file"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => onDeleteClick(9)}
          danger
          disabled={!images[9]}
        >
          Delete
        </Button>
        <br />
      </Col>
      <Col span={20}>
        <Carousel
          autoplay
          style={{
            height: "350px",
            background: "#999",
            padding: "20px",
          }}
        >
          {images[0] && (
            <div>
              <Image style={contentStyle} src={imageUrl1} />
            </div>
          )}
          {images[1] && (
            <div>
              <Image style={contentStyle} src={imageUrl2} />
            </div>
          )}
          {images[2] && (
            <div>
              <Image style={contentStyle} src={imageUrl3} />
            </div>
          )}
          {images[3] && (
            <div>
              <Image style={contentStyle} src={imageUrl4} />
            </div>
          )}
          {images[4] && (
            <div>
              <Image style={contentStyle} src={imageUrl5} />
            </div>
          )}
          {images[5] && (
            <div>
              <Image style={contentStyle} src={imageUrl6} />
            </div>
          )}
          {images[6] && (
            <div>
              <Image style={contentStyle} src={imageUrl7} />
            </div>
          )}
          {images[7] && (
            <div>
              <Image style={contentStyle} src={imageUrl8} />
            </div>
          )}
          {images[8] && (
            <div>
              <Image style={contentStyle} src={imageUrl9} />
            </div>
          )}
          {images[9] && (
            <div>
              <Image style={contentStyle} src={imageUrl10} />
            </div>
          )}
        </Carousel>
      </Col>
    </Row>
  );
};

export default AdvertisementManage;

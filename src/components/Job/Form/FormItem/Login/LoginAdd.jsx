import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";

const LoginAdd = ({ form }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  useEffect(() => {
    modalOpen && setModalOpen(false);
    form.setFieldValue("login", currentData.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);
  const onDelete = () => {
    form.setFieldValue("login", "");
    setCurrentData({});
  };
  return (
    <div>
      <Form.Item
        label="Login"
        name="login"
        rules={[
          {
            required: true,
            message: "Please input machine!",
          },
        ]}
        hidden
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Login">
        <Row>
          <Col flex="auto">
            <Input className="w-full" value={currentData.user} disabled />
          </Col>
          {JSON.stringify(currentData) !== "{}" ? (
            <>
              <Col flex="none">
                <Button onClick={() => setModalOpen(true)}>Edit</Button>
              </Col>
              <Col flex="none">
                <Button onClick={onDelete} danger>
                  Delete
                </Button>
              </Col>
            </>
          ) : (
            <Col flex="none">
              <Button onClick={() => setModalOpen(true)}>Add</Button>
            </Col>
          )}
        </Row>
        {modalOpen && (
          <Modal
            title="Select login"
            open={modalOpen}
            footer={[
              <Button key="cancel" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>,
            ]}
            onCancel={() => setModalOpen(false)}
          >
            <ModalContent
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              currentData={currentData}
              setCurrentData={setCurrentData}
            ></ModalContent>
          </Modal>
        )}
      </Form.Item>
    </div>
  );
};

export default LoginAdd;

import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import { useSelector } from "react-redux";

const LoginAdd = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const editId = useSelector((state) => state.drawer.id);
  useEffect(() => {
    if (editId && editId !== 0) {
      setCurrentData(props.initialData ? props.initialData : {});
    } else {
      setCurrentData({});
    }
  }, [editId, props.initialData]);
  useEffect(() => {
    modalOpen && setModalOpen(false);
    props.form.setFieldValue("login_id", currentData.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const onDelete = () => {
    props.form.setFieldValue("login_id", "");
    setCurrentData({});
  };
  return (
    <div>
      <Form.Item label="Login" name="login_id" hidden>
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

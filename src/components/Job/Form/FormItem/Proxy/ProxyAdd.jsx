import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import { useSelector } from "react-redux";

const ProxyAdd = (props) => {
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
    props.form.setFieldValue("proxy_id", currentData.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const onDelete = () => {
    props.form.setFieldValue("proxy_id", "");
    setCurrentData({});
  };
  return (
    <div>
      <Form.Item label="Proxy" name="proxy_id" hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item label="Proxy">
        <Row>
          <Col flex="auto">
            <Input className="w-full" value={currentData.ip} disabled />
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
            title="Select proxy"
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

export default ProxyAdd;

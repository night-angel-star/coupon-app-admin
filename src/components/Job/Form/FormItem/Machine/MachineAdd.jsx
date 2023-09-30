import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
const MachineAdd = ({ form }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  useEffect(() => {
    modalOpen && setModalOpen(false);
    form.setFieldValue("machine", currentData.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);
  const onDelete = () => {
    form.setFieldValue("machine", "");
    setCurrentData({});
  };
  return (
    <div>
      <Form.Item
        label="Machine"
        name="machine"
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

      <Form.Item label="Machine">
        <Row wrap={false}>
          <Col flex="auto">
            <Input value={currentData.type} disabled />
          </Col>
          <Col flex="auto">
            <Input value={currentData.machine_id} disabled />
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
            title="Select Machine"
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

export default MachineAdd;

import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ModalContent from "./ModalContent";
const MachineAdd = (props) => {
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
    console.log(currentData);
    modalOpen && setModalOpen(false);
    props.form.setFieldValue("machine_id", currentData.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);
  const onDelete = () => {
    props.form.setFieldValue("machine_id", "");
    setCurrentData({});
  };
  return (
    <div>
      <Form.Item label="Machine" name="machine_id" hidden>
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

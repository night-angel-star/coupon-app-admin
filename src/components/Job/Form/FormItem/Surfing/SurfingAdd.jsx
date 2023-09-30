import { Form, Input, Button, Row, Col, Modal, Table, InputNumber } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import tableColumns from "@/constant/tableColumns";

const SurfingAdd = ({ form }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    setCurrentData(currentData.map((item) => ({ ...item, delay: 0 })));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  useEffect(() => {
    form.setFieldValue(
      "surfing",
      currentData.map((item) => ({ id: item.id, delay: item.delay }))
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);
  const onDelete = (no) => {
    setCurrentData(currentData.filter((item) => item.no !== no));
  };
  const onChangeDelay = (no, value) => {
    setCurrentData(
      currentData.reduce(
        (accumulator, currentValue) =>
          currentValue.no === no
            ? [...accumulator, { ...currentValue, delay: value }]
            : [...accumulator, currentValue],
        []
      )
    );
  };
  const columns = [
    ...tableColumns.surfing,
    {
      title: "Delay(s)",
      key: "delay",
      render: (item) => (
        <InputNumber
          value={item.delay}
          min={0}
          onChange={(value) => onChangeDelay(item.no, value)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <DeleteTwoTone
          twoToneColor="#eb2f96"
          className="cursor-pointer"
          onClick={() => onDelete(item.no)}
        />
      ),
    },
  ];
  return (
    <div>
      <Form.Item
        label="Surfing"
        name="surfing"
        rules={[
          {
            required: true,
            message: "Please input surfing!",
          },
        ]}
        hidden
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Surfing">
        <Row>
          <Col flex="none">
            <Button onClick={() => setModalOpen(true)}>Add</Button>
          </Col>
        </Row>
        {modalOpen && (
          <Modal
            title="Select surfing"
            open={modalOpen}
            footer={[
              <Button
                key="ok"
                type="primary"
                onClick={() => setModalOpen(false)}
              >
                OK
              </Button>,
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
      <Row justify="end" className="mb-2">
        <Col className="w-full">
          <Table columns={columns} dataSource={currentData}></Table>
        </Col>
      </Row>
    </div>
  );
};

export default SurfingAdd;

import { Form, Input, Button, Row, Col, Modal, Table, InputNumber } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import tableColumns from "../../../../../constant/tableColumns";
import { useSelector } from "react-redux";

const SurfingAdd = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const editId = useSelector((state) => state.drawer.id);
  useEffect(() => {
    if (editId && editId !== 0) {
      setCurrentData(props.initialData);
    } else {
      setCurrentData([]);
    }
  }, [editId, props.initialData]);

  useEffect(() => {
    console.log();
  }, [currentData]);
  useEffect(() => {
    if (currentData.length !== 0) {
      setCurrentData(
        currentData.map((item) => ({
          ...item,
          delay: item.delay ? item.delay : 0,
        }))
      );
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  useEffect(() => {
    props.form.setFieldValue(
      "surfing",
      currentData.map((item) => ({ id: item.id, delay: item.delay }))
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);
  const onDelete = (id) => {
    setCurrentData(currentData.filter((item) => item.id !== id));
  };
  //eslint-disable-next-line
  const [tableColumnsNo, ...restTableColumns] = tableColumns.surfing;
  const onChangeDelay = (id, value) => {
    setCurrentData(
      currentData.reduce(
        (accumulator, currentValue) =>
          currentValue.id === id
            ? [...accumulator, { ...currentValue, delay: value }]
            : [...accumulator, currentValue],
        []
      )
    );
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    ...restTableColumns,
    {
      title: "Delay(s)",
      key: "delay",
      render: (item) => (
        <InputNumber
          value={item.delay}
          min={0}
          onChange={(value) => onChangeDelay(item.id, value)}
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
          onClick={() => onDelete(item.id)}
        />
      ),
    },
  ];
  return (
    <div>
      <Form.Item label="Surfing" name="surfing" hidden>
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
              // <Button
              //     key="cancel"
              //     onClick={() => setModalOpen(false)}
              // >
              //     Cancel
              // </Button>,
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
      <Row justify="end" className="ml-10 mb-2">
        <Col className="w-full">
          <Table
            columns={columns}
            dataSource={currentData.map((data, i) => ({
              ...data,
              key: i,
            }))}
          ></Table>
        </Col>
      </Row>
    </div>
  );
};

export default SurfingAdd;

import { Form, Input, Button, Row, Col, Modal, Table } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import tableColumns from "@/constant/tableColumns";

const GoodsAdd = ({ form }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    form.setFieldValue(
      "goods",
      currentData.map((item) => item.id)
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const onDelete = (no) => {
    setCurrentData(currentData.filter((item) => item.no !== no));
  };
  const columns = [
    ...tableColumns.goods,
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
        label="Goods"
        name="goods"
        rules={[
          {
            required: true,
            message: "Please input goods!",
          },
        ]}
        hidden
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Goods">
        <Row>
          <Col flex="none">
            <Button onClick={() => setModalOpen(true)}>Add</Button>
          </Col>
        </Row>
        {modalOpen && (
          <Modal
            title="Select goods"
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

export default GoodsAdd;

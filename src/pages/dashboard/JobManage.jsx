// import DataTable from "@/components/Tables/DataTable";
// import { Row, Space } from "antd";
// import AddDrawer from "@/components/LevelManage/AddDrawer";
// import Search from "@/components/Search";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
export const JobManage = () => {
  // const columns = [
  //   {
  //     title: 'No',
  //     dataIndex: 'no',
  //     key: 'no'
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Nvid',
  //     dataIndex: 'nvid',
  //     key: 'nvid'
  //   },
  //   {
  //     title: 'Keyword1',
  //     dataIndex: 'keyword1',
  //     key: 'keyword1'
  //   },
  //   {
  //     title: 'Keyword2',
  //     dataIndex: 'keyword2',
  //     key: 'keyword2'
  //   },
  //   {
  //     title: 'Keyword3',
  //     dataIndex: 'keyword3',
  //     key: 'keyword3'
  //   }
  // ];
  // const searchFields = columns.reduce((accumulator, currentValue) => [...accumulator, currentValue.key], [])
  // const data = [
  //   {
  //     no: 1,
  //     name: "Watches",
  //     nvid: 10031,
  //     keyword1: "Rolex",
  //     keyword2: "Clock",
  //     keyword3: "Hand"
  //   },
  //   {
  //     no: 1,
  //     name: "Watches",
  //     nvid: 10032,
  //     keyword1: "abd",
  //     keyword2: "we",
  //     keyword3: "wefw"
  //   },
  // ];
  return <div>
    {/* <Row justify={"end"} className="p-2">
      <Space>
        <Search fields={searchFields} />
        <AddDrawer />
      </Space>
    </Row>
    <DataTable columns={columns} data={data} showAction /> */}
    <ExclamationCircleTwoTone />
    <h3>This page is for job manage. Future version will support this function.</h3>

  </div>;
};

export default JobManage;

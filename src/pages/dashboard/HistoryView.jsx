import DataTable from "../../components/Tables/DataTable";
import { Row, Space, DatePicker } from "antd";
import tableColumns from "../../constant/tableColumns";
import dayjs from "dayjs";

import Search from "../../components/Search";
import moment from "moment/moment";

import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/data";

const dateFormat = "YYYY-MM-DD";

const { RangePicker } = DatePicker;

export const HistoryView = () => {
  const dispatch = useDispatch();
  const columns = tableColumns.history;
  const searchFields = columns.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.key],
    []
  );
  const onPickData = async (value) => {
    const start = value[0].format(dateFormat) + " 00:00:00";
    const end = value[1].format(dateFormat) + " 23:59:59";
    try {
      await dispatch(getData("history", `?from=${start}&to=${end}`));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Row justify={"end"} className="p-2">
        <Space>
          <RangePicker
            defaultValue={[
              dayjs(moment().format("YYYY-MM-DD"), dateFormat),
              dayjs(moment().format("YYYY-MM-DD"), dateFormat),
            ]}
            onChange={onPickData}
          />
          <Search fields={searchFields} />
        </Space>
      </Row>
      <DataTable columns={columns} />
    </div>
  );
};

export default HistoryView;

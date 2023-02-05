import moment from "moment";

import { Tag } from "./styles";

import "moment/locale/ko";

interface Props {
  startDate?: Date;
  endDate: Date;
}

function DateTag({ startDate, endDate }: Props) {
  if (startDate && endDate) {
    return (
      <Tag>
        {moment(startDate).format("YYYY년 MM월")} → {moment(endDate).format("YYYY년 MM월")}
      </Tag>
    );
  } else {
    return <Tag>{moment(endDate).fromNow()}</Tag>;
  }
}

export default DateTag;

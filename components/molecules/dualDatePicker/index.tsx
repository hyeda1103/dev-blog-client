import React, { SyntheticEvent } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import * as T from '@/types'
import { Root, Container, IconWrapper, CalendarIcon } from './styles'

interface Props {
  handleStartDate: (date: Date, event: SyntheticEvent<any, Event>) => void
  handleEndDate: (date: Date, event: SyntheticEvent<any, Event>) => void
  formValues: T.CreatePostForm
  formErrors: T.Object
}

function DualDatePicker({
  handleStartDate,
  handleEndDate,
  formValues,
  formErrors,
}: Props) {
  const { startDate, endDate } = formValues
  return (
    <Root>
      <IconWrapper error={!!formErrors['startDate'] || !!formErrors['endDate']}>
        <CalendarIcon />
      </IconWrapper>
      <Container error={!!formErrors['startDate'] || !!formErrors['endDate']}>
        <DatePicker
          selected={startDate}
          onChange={handleStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          placeholderText='프로젝트 시작 시점'
          closeOnScroll={(e) => e.target === document}
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          placeholderText='프로젝트 종료 시점'
          closeOnScroll={(e) => e.target === document}
        />
      </Container>
    </Root>
  );
};

export default DualDatePicker

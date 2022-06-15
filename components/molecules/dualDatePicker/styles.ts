import { VscCalendar } from "react-icons/vsc";
import styled from "styled-components";

interface StyleProps {
  error: boolean
}

export const Root = styled.div`
  position: relative;
  width: 840px;
  height: 36px;
  margin: 0 auto 6px;
  padding-left: 36px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`

export const Container = styled.div<StyleProps>`
  display: flex;
  width: 100%;
  height: 36px; 

  .react-datepicker-wrapper {
    margin-left: 12px;
  }

  .react-datepicker__tab-loop {
    margin-right: 0;
  }

  .react-datepicker__month-text .react-datepicker__month-1 .react-datepicker__month--in-range .react-datepicker__month--range-start {
    background-color: ${({ theme }) => theme.active};
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0 12px;
    font-size: 18px;
    outline: none;
    border: 1px solid ${({ theme, error }) => error ? theme.fail : theme.border};

    &:focus {
      border-color: ${({ theme }) => theme.active}
    }
  }
`

export const IconWrapper = styled.div<StyleProps>`
  position: absolute;
  left: 12px;
  margin-right: 6px;
  color: ${({ theme, error }) => error ? theme.fail : theme.typePrimary};
  justify-content: center;
  align-items: center;
`;

export const CalendarIcon = styled(VscCalendar)`
  font-size: 20px;
`
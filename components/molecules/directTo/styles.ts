import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

export const Container = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const RightArrow = styled(IoIosArrowForward)`
  font-size: 40px;

  @media only screen and (max-width: 840px) {
    font-size: 32px;
  }
`;

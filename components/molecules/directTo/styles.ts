import { IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';

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

export const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.themePrimary};
  text-align: center;

  p {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.themeWhite};
  }

  @media only screen and (max-width: 840px) {
    width: 28px;
    height: 28px;

    p {
      font-size: 18px;
    }
  }
`;
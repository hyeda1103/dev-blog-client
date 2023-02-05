import { FaArrowAltCircleRight, FaLongArrowAltRight } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 364px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 0;
`;

export const ArrowIcon = styled(FaArrowAltCircleRight)`
  font-size: 17px;
  margin-right: 8px;
`;

export const Button = styled.button`
  font-size: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: inline-block;
`;

export const NextIcon = styled(FaLongArrowAltRight)`
  font-size: 17px;
  margin-left: 8px;
`;

interface StyleProps {
  isSelected: boolean;
}

export const SelectItem = styled.li<StyleProps>`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  align-items: center;
  cursor: pointer;
  display: flex;
  -webkit-box-shadow: 0 2px
    ${({ theme, isSelected }) => (isSelected ? theme.typePrimary : theme.bodyBackground)};
  box-shadow: 0 2px
    ${({ theme, isSelected }) => (isSelected ? theme.typePrimary : theme.bodyBackground)};

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    -webkit-box-shadow: 0 2px ${({ theme }) => theme.typePrimary};
    box-shadow: 0 2px ${({ theme }) => theme.typePrimary};
  }
`;

export const SelectList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 24px 0;
`;

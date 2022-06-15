import styled from 'styled-components';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export const DropDownContainer = styled.div`
  margin: 0 auto;
  z-index: 999;
`;

export const DropDownHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  height: 15px;
  background: #ffffff;
  white-space: nowrap;
  cursor: pointer;
  gap: 7px; 

  p {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme, isOpen }) => (isOpen
    ? theme.typePrimary
    : theme.typePrimary)};
  }

  svg {
    fill: ${({ theme, isOpen }) => (isOpen
    ? theme.typePrimary
    : theme.typePrimary)};
    stroke: ${({ theme, isOpen }) => (isOpen
    ? theme.typePrimary
    : theme.typePrimary)};
  }
`;

export const CaretUpIcon = styled(FaCaretUp)``;

export const CaretDownIcon = styled(FaCaretDown)``;

export const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 999;
  top: 71px;
`;

export const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  box-sizing: border-box;
  color: ${({ theme }) => theme.typePrimary};
  width: 96px;
`;

export const ListItem = styled('li')`
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 5px;
  height: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.typePrimary};
    font-weight: 700;
  }
`;

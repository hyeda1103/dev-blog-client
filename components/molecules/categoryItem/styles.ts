import styled from 'styled-components'

export const Container = styled.li`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 1px 8px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  margin: 2px;
  font-size: 14px;
  transition: 0.05s ease;
  position: relative;

  

  &:hover {
    border: 1px solid ${({ theme }) => theme.themePrimary};

    &:before {
      content: "";
      position: absolute;
      top: -1px;
      right: -3px;
      border-top: 3px solid transparent;
      border-left: 3px solid ${({ theme }) => theme.themePrimary };
      height: 100%;
      width: 0;
    }

    &:after {
      content: "";
      position: absolute;
      left: -1px;
      bottom: -3px;
      border-top: 3px solid ${({ theme }) => theme.themePrimary };
      border-left: 3px solid transparent;
      height: 0;
      width: 100%;
    }
  }
`;

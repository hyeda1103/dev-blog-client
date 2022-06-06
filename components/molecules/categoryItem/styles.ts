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

  &:hover {
    -webkit-box-shadow: 0 1px ${({ theme }) => theme.typePrimary };
    box-shadow: 0 1px ${({ theme }) => theme.typePrimary };
  }
`;

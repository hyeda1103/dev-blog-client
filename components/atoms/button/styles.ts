import styled from "styled-components";

export const BasicButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 52px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background-color 0.25s ease;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  color: ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.bodyBackground};
    background-color: ${({ theme }) => theme.typePrimary};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.disabled};
    border: 1px solid ${({ theme }) => theme.disabled};
  }
`;

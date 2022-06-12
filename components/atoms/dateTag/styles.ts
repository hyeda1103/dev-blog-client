import styled from "styled-components";

export const Tag = styled.div`
  padding: 2px 6px;
  color: ${({ theme }) => theme.typePrimary};
  background: ${({ theme }) => theme.bodyBackground};
  border-radius: 4px;
  font-size: 11px;
`;
import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.p`
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
`;

export const CategoryList = styled.ul`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  position: relative;
  padding: 8px;
  height: fit-content;
`;

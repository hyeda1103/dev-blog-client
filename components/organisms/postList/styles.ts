import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`;


export const Title = styled.p`
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
`;

export const PostList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
  padding: 1px 10px 10px 1px;
  box-sizing: border-box;
`;


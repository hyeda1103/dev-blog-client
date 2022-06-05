import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`;


export const Title = styled.p`
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.text};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
`;

export const PostList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
  padding: 2px;
  box-sizing: border-box;
`;


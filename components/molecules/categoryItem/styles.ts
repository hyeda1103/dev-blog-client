import styled from 'styled-components'

export const Container = styled.li<{
  onPost?: boolean
}>`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 1px 8px;
  color: ${({ theme, onPost }) => onPost ? theme.themeBlack : theme.typePrimary};
  border: 1px solid ${({ theme, onPost }) => onPost ? theme.themeBlack : theme.typePrimary};
  margin: 2px;
  font-size: 14px;
  transition: 0.05s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.themePrimary};
    border: 1px solid ${({ theme }) => theme.themePrimary};
  }
`;

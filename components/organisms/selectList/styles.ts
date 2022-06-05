import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      -webkit-box-shadow: 0 2px ${({ theme }) => theme.text};
      box-shadow: 0 2px ${({ theme }) => theme.text};
    }
  }
`;


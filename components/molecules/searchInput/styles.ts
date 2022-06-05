import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
`;

export const Input = styled.input`
  width: 200px;
  height: 32px;
  padding: 2px 8px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 0;
  font-size: 14px;
  outline: none;

  &:focus {
    background: ${({ theme }) => theme.active};
  }
`;

import styled from "styled-components";

export const Form = styled.form`
  position: relative;
  display: flex;
`;

export const Input = styled.input`
  width: 180px;
  height: 28px;
  padding: 6px 8px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  border-radius: 0;
  font-size: 16px;
  outline: none;

  &:focus {
    background: ${({ theme }) => theme.active};
  }

  @media only screen and (max-width: 425px) {
    width: 150px;
  }
`;

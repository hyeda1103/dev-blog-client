import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const Logline = styled.p`
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 50px;
`;

export const DirectToWrapper = styled.div`
  text-align: right;
  padding: 7px auto;

  a {
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;

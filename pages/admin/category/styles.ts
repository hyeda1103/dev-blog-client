import styled from 'styled-components';


export const Container = styled.div`
  position: relative;
  width: 364px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 0;
`;

export const Header = styled.div`
  margin-bottom: 28px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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

export const StyledForm = styled.form`
  width: 100%;
`;

export const InputWrapper = styled.div`
  margin-bottom: 50.71px;
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

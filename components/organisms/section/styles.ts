import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Header = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;

  @media only screen and (max-width: 840px) {
    align-self: flex-start;
    margin-bottom: 0;
    font-size: 28px;
  }
`;

export const Logline = styled.p`
  color: ${({ theme }) => theme.typePrimary};
  font-size: 14px;
`;

export const ContentsWrapper = styled.div`
  /* padding-right: 10px;
  padding-bottom: 10px; */
`;

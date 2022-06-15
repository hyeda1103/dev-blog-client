import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Header = styled.div`
  margin-bottom: 12px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media only screen and (max-width: 840px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-end;
    margin-bottom: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;

  @media only screen and (max-width: 840px) {
    align-self: flex-start;
    margin-bottom: 0;
  }
`;

export const Logline = styled.p`
  color: ${({ theme }) => theme.typePrimary};
  font-size: 14px;
`;

export const ContentsWrapper = styled.div`
  .infinite-scroll-component {
    overflow: hidden;
    background: 'red';
  }
`;

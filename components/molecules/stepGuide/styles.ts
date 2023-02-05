import styled from "styled-components";

export const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const Logline = styled.p`
  color: ${({ theme }) => theme.typePrimary};
  font-size: 14px;
`;

export const TitleWrapper = styled.div`
  margin-bottom: 28px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

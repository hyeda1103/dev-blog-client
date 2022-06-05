import styled from "styled-components";
import { FaSadTear } from "react-icons/fa";

export const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 364px;
  margin: 80px auto;
  align-items: center;
  gap: 24px;
`;

export const SadFaceIcon = styled(FaSadTear)`
  font-size: 36px;
`;

export const Message = styled.p`
  font-size: 16px;
`;
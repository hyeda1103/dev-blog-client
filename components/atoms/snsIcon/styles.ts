import { AiFillGithub, AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";
import styled, { css } from "styled-components";

const Icon = css`
  color: ${({ theme }) => theme.typePrimary};
`;

export const GitHubIcon = styled(AiFillGithub)`
  ${Icon}
  font-size: 21px;
`;

export const LinkedInIcon = styled(AiOutlineLinkedin)`
  ${Icon}
  font-size: 22px;
`;

export const EmailIcon = styled(AiOutlineMail)`
  ${Icon}
  font-size: 20px;
`;

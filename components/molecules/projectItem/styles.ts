import styled, { css } from 'styled-components'
import { HiCursorClick } from 'react-icons/hi'
import { VscGithubInverted, VscWindow } from 'react-icons/vsc'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 8px 0;
  width: 100%;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const CategoryInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 16px 24px;

  p {
    font-size: 32px;
  }
`;

export const PostList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
`;

export const Container = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 8px 24px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.typePrimary};

  &:before {
    content: "";
    position: absolute;
    top: -1px;
    right: -10px;
    border-top: 10px solid transparent;
	  border-left: 10px solid ${({ theme }) => theme.typePrimary };
	  height: 100%;
	  width: 0;
  }

  &:after {
    content: "";
    position: absolute;
    left: -1px;
    bottom: -10px;
    border-top: 10px solid ${({ theme }) => theme.typePrimary };
	  border-left: 10px solid transparent;
	  height: 0;
	  width: calc(100% + 1px);
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.themePrimary};

    &:before {
      border-left: 10px solid ${({ theme }) => theme.themePrimary };
    }

    &:after {
      content: "";
      border-top: 10px solid ${({ theme }) => theme.themePrimary };
    }
  }
`;

const Icon = css`
  color: ${({ theme }) => theme.hyperlink.default};
  font-size: 16px;
  margin: auto 0;
`;

export const GitHubIcon = styled(VscGithubInverted)`
  ${Icon}
`;

export const WebIcon = styled(VscWindow)`
  ${Icon}
`;

export const Title = styled.p`
  position: relative;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Details = styled.div`
  position: relative;
  margin: 8px 0;
`

export const TypeWrapper = styled.div`
  display: flex;
  gap: 6px;

  @media only screen and (max-width: 840px) {
    align-self: flex-end;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 8px 0;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const PostedAt = styled.div`
  text-align: right;
  font-size: 14px;
`;

const Tag = css`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  font-size: 14px;
`

export const TagBox = styled.div`
  box-sizing: border-box;
  gap: 6px;
`;

export const CategoryTag = styled.span`
  ${Tag}
`

export const Type = styled.span`
  ${Tag}
`

export const Medium = styled.span`
  ${Tag}
`

export const ResultWrapper = styled.div`
  font-size: 32px;
`;

export const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  @media only screen and (max-width: 720px) {
    display: none;
  }
`

export const ClickIcon = styled(HiCursorClick)`
  vertical-align: middle;
  margin-left: 4px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HyperLink = styled.a`
  display: grid;
  grid-template-columns: 16px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 3px;
  position: relative;
  color: ${({ theme }) => theme.hyperlink.default};
`

export const HyperText = styled.p`
  display: flex;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  ${HyperLink}:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
  }
`

import styled, { css } from 'styled-components'
import { HiLink, HiCursorClick } from 'react-icons/hi'

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
  width: calc(100% - 10px);

  &:before {
    content: "";
    position: absolute;
    top: -1px;
    right: -11px;
    border-top: 10px solid transparent;
	  border-left: 10px solid ${({ theme }) => theme.typePrimary };
	  height: calc(100% + 1px);
	  width: 0;
  }

  &:after {
    content: "";
    position: absolute;
    left: -1px;
    bottom: -11px;
    border-top: 10px solid ${({ theme }) => theme.typePrimary };
	  border-left: 10px solid transparent;
	  height: 0;
	  width: calc(100% + 2px);
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

export const LinkIcon = styled(HiLink)`
  color: ${({ theme }) => theme.hyperlink.default};
  vertical-align: middle;
  font-size: 14px;
  margin-right: 4px;
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

export const Details = styled.span`
  vertical-align: middle;
  display: inline-block;
  margin: 8px 0;

  a {
    color: ${({ theme }) => theme.hyperlink.default};

    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`

export const TypeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  font-size: 11px;

  @media only screen and (max-width: 720px) {
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

  @media only screen and (max-width: 840px) {
    display: none;
  }
`

export const ClickIcon = styled(HiCursorClick)`
  vertical-align: middle;
  margin-left: 4px;
`;

export const Description = styled.div`
  position: relative;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ContentsWrapper = styled.div`
  position: relative;
  width: 80%;
`;

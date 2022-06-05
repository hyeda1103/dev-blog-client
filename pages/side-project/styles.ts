import styled, { css } from 'styled-components'
import { HiLink, HiCursorClick } from 'react-icons/hi'

export const Container = styled.div`
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 16px 0;
`;

export const MainText = styled.div`
  padding: 32px 0;
  line-height: 2;
`;

export const CategoryInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 16px 24px;
  p {
    font-size: 32px;
  }
`;

export const ImageWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Profile = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const PostList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
`;

export const LinkItem = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
`;

export const LinkIcon = styled(HiLink)`
  font-size: 17px;
  color: ${({ theme }) => theme.body};
  background-color: ${({ theme }) => theme.hyperlink.default};
  vertical-align: middle;
  padding: 6px;
  margin-right: 8px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 1rem 0;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  margin: 8px 0;

  a {
    color: ${({ theme }) => theme.hyperlink.default};

    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
      ${LinkIcon} {
        color: ${({ theme }) => theme.hyperlink.contrast};
      }
    }
  }
`

export const TypeWrapper = styled.div`
  display: flex;
  font-size: 14px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const PostedAt = styled.div`
  text-align: right;
  font-size: 14px;
`;


const Tag = css`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.text};
  font-size: 14px;
`

export const TagBox = styled.div`
  display: flex;
  justify-content: flex-end;
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
`

export const ClickIcon = styled(HiCursorClick)`
  vertical-align: middle;
  margin-left: 4px;
`;

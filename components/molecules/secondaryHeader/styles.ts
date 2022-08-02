import styled, { css } from 'styled-components'
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { HiLink } from 'react-icons/hi'

interface StyleProps {
  darkmode: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
`

export const Inner = styled.div`
  width: 840px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;

  @media only screen and (max-width: 840px) {
    width: 90%;
  }
`

export const SocialIconWrapper = styled.div`
  display: flex;
  gap: 3px;
  vertical-align: middle;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 6px;
  padding: 4px 6px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  transition: 0.05s ease;

  a {
    font-size: 11px;
    line-height: 1;
  }
`

export const SwitchMode = styled.div<StyleProps>`
  background-color: ${({ theme }) => theme.typePrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;
  transition: 0.25s ease;
  margin-left: 6px;
`

const Icon = css`
  font-size: 17px;
  color: ${({ theme }) => theme.bodyBackground};
  vertical-align: middle;
`;

export const SunIcon = styled(IoMdSunny)`
  ${Icon}
`

export const MoonIcon = styled(IoMdMoon)`
  ${Icon}
`

export const LinkIcon = styled(HiLink)`
  font-size: 17px;
  color: #fff;
  color: ${({ theme }) => theme.typePrimary};
  border: 1px solid ${({ theme }) => theme.typePrimary};
  vertical-align: middle;
  padding: 5px;
  transition: 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.hyperlink.default};
    background-color: ${({ theme }) => theme.hyperlink.contrast};
  }
`;

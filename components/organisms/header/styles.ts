import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
  display: flex;
  align-items: center;
  z-index: 9;
`

export const Inner = styled.div`
  width: 840px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 840px) {
    width: 90%;
  }
`

export const Logo = styled.h3`
  a {
    font-size: 28px;
  }
`

export const Nav = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  position: relative;
`

interface StyleProps {
  isActive: boolean
}

interface StyleProps {
  isActive: boolean
}

export const Item = styled.li<StyleProps>`
  cursor: pointer;
  margin-right: 14px;
  padding: 0 2px;
  display: inline-block; 
  position: relative;
  z-index: 1;

  a {
    font-size: 14px;
    text-decoration: none;
    color: ${({ theme, isActive }) => isActive ? theme.themePrimary : theme.typePrimary };
  }

  &:hover {
    a {
      color: ${({ theme }) => theme.themePrimary};
    }
  }

  @media only screen and (max-width: 840px) {
    display: none;
  }
`

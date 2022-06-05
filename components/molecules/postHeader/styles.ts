import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 106px;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
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

export const Highlight = styled.span<StyleProps>`
  display: inline-block; 
  position: relative;

  &::after {
    content:"";
    width: ${({ isActive }) => isActive ? '100%' : 0};
    height: 8px;
    display: inline-block;
    background: ${({ theme }) => theme.active};
    position: absolute;
    bottom:0;
    left:0;
    z-index: -1;
    transition: 0.25s all;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Item = styled.li`
  cursor: pointer;
  margin-right: 14px;
  padding: 0 2px;
  display: inline-block; 
  position: relative;
  z-index: 1;
  font-size: 14px;
`

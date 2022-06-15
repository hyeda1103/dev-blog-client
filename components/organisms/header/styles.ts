import styled from 'styled-components'

export const Root = styled.header`
  position: fixed;
  width: 100%;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    font-size: 32px;
  }
`

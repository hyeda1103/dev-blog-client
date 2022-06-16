import styled from 'styled-components'

export const Root = styled.footer`
  bottom: 0;
`

export const Inner = styled.div`
  width: 840px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  text-align: center;
  padding: 8px 0;

  @media only screen and (max-width: 840px) {
    width: 90%;
  }
`

export const Copyright = styled.p`
  font-size: 14px;
`

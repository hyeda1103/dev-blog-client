import styled from 'styled-components'

export const Container = styled.footer`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0.5rem 0;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.text};
`

export const Inner = styled.div`
  width: 840px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Copyright = styled.p`
`

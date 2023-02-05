import styled from 'styled-components'

export const Main = styled.main`
  width: 840px;
  margin: 0 auto;
  padding: 120px 0;
  height: 100%;
  min-height: calc(100vh - 41px);
  box-sizing: border-box;
  line-height: 1.5;

  @media only screen and (max-width: 840px) {
    width: 90%;
  }
`;

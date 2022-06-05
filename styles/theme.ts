import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: '#f4f4f4',
  text: '#161E2E',
  subText: '#333333',
  primary: '#B6DBB7',
  paper: '#FFFFFF',
  border: '#d2d6dc',
  disabled: '#c1c1c1',
  active: '#D7E5F0',
  fail: '#ff3300',
  highlight: '#60fd1e',
  hyperlink: {
    default: '#0000ee',
    contrast: '#00ee00',
    broken: '#ee0000'
  },
}

export const darkTheme = {
  body: '#161E2E',
  text: '#f4f4f4',
  subText: '#f4f4f4',
  primary: '#B6DBB7',
  paper: '#161E2E',
  border: '#6B8096',
  active: '#D7E5F0',
  disabled: '#c1c1c1',
  fail: '#ff3300',
  highlight: '#7f7fff',
  hyperlink: {
    default: '#0000ee',
    contrast: '#00ee00',
    broken: '#ee0000'
  },
}

type Theme = {
  theme: {
    body: string
    text: string
    subText: string
    guide: string
    primary: string
    paper: string
    border: string
    hover: string
    active: string
    fail: string
  }
}

export const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  body {
      background: ${({ theme }: Theme) => theme.body};
      color: ${({ theme }: Theme) => theme.text};
      transition: all 0.50s linear;
      overflow-x: hidden;
      font-family: 'KoPubWorld-Dotum-Light';
  }
  a {
    text-decoration: none;
    color: ${({ theme }: Theme) => theme.text};
  }

  .ql-container {
    min-height: 800px;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ql-editor {
    height: 100%;
    flex: 1;
    overflow-y: auto;
    width: 100%;
  }
`;

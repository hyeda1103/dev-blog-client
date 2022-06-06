import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  bodyBackground: '#f4f4f4',
  typePrimary: '#161E2E',
  themeWhite: '#FFFFFF',

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
  bodyBackground: '#161E2E',
  typePrimary: '#f4f4f4',
  themeWhite: '#161E2E',

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
    bodyBackground: string
    typePrimary: string
    themeWhite: string
    
    guide: string
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
    background: ${({ theme }: Theme) => theme.bodyBackground};
    color: ${({ theme }: Theme) => theme.typePrimary};
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: Theme) => theme.typePrimary};
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

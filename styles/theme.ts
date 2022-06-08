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
    bodyBackground: string,
    typePrimary: string,
    themeWhite: string,

    border: string,
    disabled: string,
    active: string,
    fail: string,
    highlight: string,
    hyperlink: {
      default: string,
      contrast: string,
      broken: string
    },
  }
}

export const GlobalStyles = createGlobalStyle`
  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: inherit;
  }

  body {
    background: ${({ theme }: Theme) => theme.bodyBackground};
    color: ${({ theme }: Theme) => theme.typePrimary};
    overflow-x: hidden;
    line-height: 1.5;
  }

  /* ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  } */

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme }: Theme) => theme.typePrimary};
  }

  .ql-toolbar {
    border: none !important;
    border-bottom: 1px solid #161E2E !important;
    background-color: #f4f4f4 !important;
  }

  .ql-container {
    border: none !important;
    background-color: #FFFFFF !important;
    width: 838px;
    height: 840px;
    margin: 0 auto;
    padding: 18px 0 !important;

    .ql-editor {

      a {
        color: ${({ theme }) => theme.hyperlink.default};
      }
    }

    .ql-editor.ql-blank::before{
      font-style: normal;
      color: #757575;
    }
  }
`;

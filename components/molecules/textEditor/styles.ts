import styled from "styled-components";

interface StyleProps {
  error: boolean
}

export const EditorWrapper = styled.div<StyleProps>`
  display: flex;
  box-sizing: border-box;
  width: 840px;
  margin: 0 auto;
  border: 1px solid ${({ theme, error }) => error ? theme.fail : theme.themeWhite };
`
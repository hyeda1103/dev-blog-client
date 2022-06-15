import styled from "styled-components";

interface StyleProps {
  tagColor: {
    background: string
    color: string
  } | undefined
}

export const Tag = styled.div<StyleProps>`
  padding: 2px 6px;
  color: ${({ tagColor }) => tagColor?.color};
  background: ${({ tagColor }) => tagColor?.background};
  border-radius: 4px;
  font-size: 11px;
`;
import styled from "styled-components";

export const StyledLabel = styled.label`
  position: relative;
  width: 840px;
  height: 36px;
  margin: 0 auto 6px;
  overflow: hidden;
  display: flex;
`;

export const IconWrapper = styled.div<StyleProps>`
  position: absolute;
  left: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme, error }) => (error ? theme.fail : theme.hyperlink.default)};
`;

interface StyleProps {
  error: boolean;
}

export const StyledInput = styled.input<StyleProps>`
  width: 100%;
  padding: 0 12px 0 48px;
  font-size: 18px;
  font-family: consolas;
  color: ${({ theme }) => theme.hyperlink.default};
  border: none;
  border-bottom: 1px solid ${({ theme, error }) => (error ? theme.fail : theme.hyperlink.default)};
  outline: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bodyBackground};
  transition: all 0.15s ease;

  &:focus {
  }
`;

export const GuideWrapper = styled.div`
  text-align: right;
`;

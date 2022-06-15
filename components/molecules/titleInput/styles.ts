import styled from 'styled-components';

export const StyledLabel = styled.label`
  position: relative;
  width: 840px;
  margin: 0 auto 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface StyleProps {
  error: boolean
}

export const StyledInput = styled.input<StyleProps>`
  width: 100%;
  padding: 12px;
  font-size: 32px;
  outline: none;
  border: ${({ theme, error }) => (error
    ? `1px solid ${theme.fail}`
  : 'none'
  )};
  outline: none;
  transition: all 0.15s ease;
  background: ${({ theme }) => theme.themeWhite};
  box-sizing: border-box;
`;

export const GuideWrapper = styled.div`
  text-align: right;
`;

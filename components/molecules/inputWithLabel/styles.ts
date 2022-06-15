import styled from 'styled-components';

export const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;

export const Text = styled.span`
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 500;
  margin: 0 0 8px 8px;
`;

interface StyleProps {
  error: boolean
}

export const StyledInput = styled.input<StyleProps>`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: ${({ theme, error }) => (error
    ? `1px solid ${theme.fail}`
  : `1px solid ${theme.typePrimary}`
  )};
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;

  &:focus {
    background: ${({ theme }) => theme.active};
  }
`;

export const GuideWrapper = styled.div`
  text-align: right;
`;

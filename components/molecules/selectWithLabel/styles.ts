import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  flex-direction: column;
  margin: 30px 0;

  &:first-child {
    margin-top: 0;
  }
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
  background-color: ${({ theme }) => theme.bodyBackground};
  border: ${({ theme, error }) => (error
    ? `1px solid ${theme.fail}`
    : `1px solid ${theme.active}`)
};
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
`;

export const GuideWrapper = styled.div`
  text-align: right;
`;

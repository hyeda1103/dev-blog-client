import styled from 'styled-components';
import { MdCheckCircle, MdError } from 'react-icons/md'

interface StyleProps {
  success: boolean
  error: boolean
}

export const Wrapper = styled.div<StyleProps>`
  margin: 7px 6px;
  color: ${({ theme, success, error }) => error ? theme.fail : theme.typePrimary};

  span, svg {
    vertical-align: middle;
    display: inline-block;
  }
  
`;

export const ErrorIcon = styled(MdError)`
  margin-right: 7px;
`;

export const CheckIcon = styled(MdCheckCircle)`
  margin-right: 7px;
`
import styled, { css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io'
import { VscGithubInverted, VscWindow } from 'react-icons/vsc';

export const StyledForm = styled.form`
  width: 100%;
  display: flex;  
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 38.4px;
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
  width: 100%;
  /* margin: 48px 0; */
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 6px;
  width: 100%;
`;

export const DirectToWrapper = styled.div`
  text-align: right;
  padding: 7px auto;

  a {
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const ArrowForward = styled(IoIosArrowForward)`
  font-size: 18px;
`;

export const CategoryLabel = styled.p`
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
`;

export const CategoryList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  position: relative;

  li {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
    
    input {
      margin-right: 10px;
    }

    label {
      cursor: pointer;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

export const ChoiceContainer = styled.div`
`;

export const ChoiceWrapper = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

interface StyleProps {
  isSelected: boolean
}

export const TypeButton = styled.button<StyleProps>`
  padding: 1rem 2rem;
  background-color: ${({ theme, isSelected }) => isSelected ? theme.highlight : theme.bodyBackground};
  color: ${({ theme }) => theme.typePrimary};
  border: 1px solid ${({ theme }) => theme.typePrimary};
  cursor: pointer;
  border-radius: 0;
  transition: 0.25s ease;

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    transform: translate(-2px, -2px);
    -webkit-box-shadow: 2px 2px ${({ theme }) => theme.typePrimary };
    box-shadow: 2px 2px ${({ theme }) => theme.typePrimary };
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BasicButton = styled.button`
  display: inline-block;
  width: 840px;
  height: 52px;
  margin: 0 auto;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background-color .25s ease;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  color: ${({ theme }) => theme.typePrimary};
  background-color: ${({ theme }) => theme.bodyBackground};
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.bodyBackground};
    background-color: ${({ theme }) => theme.typePrimary};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.disabled};
    border: 1px solid ${({ theme }) => theme.disabled};
  }
`

const Icon = css`
  vertical-align: middle;
  font-size: 20px;
  margin-right: 6px;
`;

export const GitHubIcon = styled(VscGithubInverted)`
  ${Icon}
`;

export const WebIcon = styled(VscWindow)`
  ${Icon}
`;
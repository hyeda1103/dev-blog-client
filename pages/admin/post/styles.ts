import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io'

export const StyledForm = styled.form`
  width: 100%;
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
`;

export const InputWrapper = styled.div`
  margin-bottom: 50.71px;
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
  border: 1px solid ${({ theme }) => theme.text};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
`;

export const CategoryList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text};
  position: relative;

  li {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.text};
    
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
  background-color: ${({ theme, isSelected }) => isSelected ? theme.highlight : theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  cursor: pointer;
  border-radius: 0;
  transition: 0.25s ease;

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    -webkit-box-shadow: 0 2px ${({ theme }) => theme.text };
    box-shadow: 0 2px ${({ theme }) => theme.text };
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


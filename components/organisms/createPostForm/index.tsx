import React, { ChangeEvent, FormEventHandler, SetStateAction } from 'react'
import { ActionMeta } from 'react-select';
import { observer } from 'mobx-react';

import InputWithLabel from '@root/components/molecules/inputWithLabel';
import TextEditor from '@root/components/molecules/textEditor';
import ErrorBox from '@root/components/molecules/errorBox';
import SelectWithLabel from '@root/components/molecules/selectWithLabel';
import Button from '@root/components/atoms/button';
import * as T from '@root/types';
import contentStore from '@root/stores/contentStore';
import { InputContainer, InputWrapper, StyledForm } from './styles';

interface Props {
  token: string
  options: Array<T.SelectOption> | undefined;
  successMessage: string;
  serverErrorMessage: string;
  formValues: T.CreatePostForm;
  formErrors: T.Object;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  handleStatus: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  handleContent: (e: string) => void;
}

function CreatePostForm({
  token,
  options,
  successMessage,
  serverErrorMessage,
  formValues,
  formErrors,
  handleSubmit,
  handleChange,
  handleSelect,
  handleStatus,
  handleContent,
}: Props) {
  const { title, description, webLink, githubLink } = formValues;

  const statusOptions = [
    {
      value: '완성',
      label: '완성'
    }, {
      value: '진행중',
      label: '진행중'
    }
  ]

  const RequiredContent = (() => {
    switch (contentStore.postType) {
      case T.PostType.ARTICLE:
        return (
          <InputContainer>
            <StyledForm onSubmit={handleSubmit} noValidate>
              <InputWrapper>
                <InputWithLabel
                  id="title"
                  label="제목"
                  type="text"
                  value={title}
                  placeholder="제목을 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    label="카테고리"
                    handleChange={handleSelect}
                    formErrors={formErrors}
                    options={options}
                    isMulti={true}
                  />
                )}
                <TextEditor
                  id="description"
                  label="포스트"
                  value={description}
                  theme="snow"
                  handleChange={handleContent}
                  formErrors={formErrors}
                />
                <ErrorBox
                  success={successMessage}
                  error={serverErrorMessage}
                />
              </InputWrapper>
              <Button disabled={!token}>
                POST
              </Button>
            </StyledForm>
          </InputContainer>
        )
      case T.PostType.PROJECT:
        return (
          <InputContainer>
            <StyledForm onSubmit={handleSubmit} noValidate>
              <InputWrapper>
                <InputWithLabel
                  id="title"
                  label="제목"
                  type="text"
                  value={title}
                  placeholder="제목을 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <SelectWithLabel
                  id="status"
                  label="진행상황"
                  handleChange={handleStatus}
                  formErrors={formErrors}
                  options={statusOptions}
                  isMulti={false}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    label="카테고리"
                    handleChange={handleSelect}
                    formErrors={formErrors}
                    options={options}
                    isMulti={true}
                  />
                )}
                <InputWithLabel
                  id="githubLink"
                  label="Github 링크"
                  type="text"
                  value={githubLink}
                  placeholder="소스코드가 저장된 github 링크를 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <InputWithLabel
                  id="webLink"
                  label="Website 주소"
                  type="text"
                  value={webLink}
                  placeholder="배포한 웹사이트 주소를 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <TextEditor
                  id="description"
                  label="포스트"
                  value={description}
                  theme="snow"
                  handleChange={handleContent}
                  formErrors={formErrors}
                />
                <ErrorBox
                  success={successMessage}
                  error={serverErrorMessage}
                />
              </InputWrapper>
              <Button disabled={!token}>
                POST
              </Button>
            </StyledForm>
          </InputContainer>
        )
      default:
        break;
    }
  })()

  return (
    <>
      {RequiredContent}
    </>
  );
}

export default observer(CreatePostForm);

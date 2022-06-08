import React, { ChangeEvent, FormEventHandler, SetStateAction } from 'react'
import { ActionMeta } from 'react-select';
import { observer } from 'mobx-react';

import TextEditor from '@root/components/molecules/textEditor';
import ErrorBox from '@root/components/molecules/errorBox';
import SelectWithLabel from '@root/components/molecules/selectWithLabel';
import * as T from '@root/types';
import contentStore from '@root/stores/contentStore';
import { InputContainer, InputWrapper, StyledForm, BasicButton as Button, GitHubIcon, WebIcon } from './styles';
import TitleInput from '@root/components/molecules/titleInput';
import LinkInput from '@root/components/atoms/linkInput';

interface Props {
  token: string
  options: Array<T.SelectOption> | undefined;
  successMessage: string;
  serverErrorMessage: string;
  formValues: T.CreatePostForm;
  formErrors: T.Object;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectSingle: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  handleSelectMulti: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
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
  handleSelectSingle,
  handleSelectMulti,
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
                <TitleInput
                  id="title"
                  label="제목"
                  value={title}
                  placeholder="제목"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    placeholder='카테고리'
                    handleChange={handleSelectMulti}
                    formErrors={formErrors}
                    options={options}
                    isMulti={true}
                  />
                )}
                <TextEditor
                  id="description"
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
                포스팅하기
              </Button>
            </StyledForm>
          </InputContainer>
        )
      case T.PostType.PROJECT:
        return (
          <InputContainer>
            <StyledForm onSubmit={handleSubmit} noValidate>
              <InputWrapper>
                <TitleInput
                  id="title"
                  label="제목"
                  value={title}
                  placeholder="제목"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <SelectWithLabel
                  id="status"
                  placeholder='진행상황'
                  handleChange={handleSelectSingle}
                  formErrors={formErrors}
                  options={statusOptions}
                  isMulti={false}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    placeholder='카테고리'
                    handleChange={handleSelectMulti}
                    formErrors={formErrors}
                    options={options}
                    isMulti={true}
                  />
                )}
                <LinkInput
                  id="githubLink"
                  icon={<GitHubIcon />}
                  type="text"
                  value={githubLink}
                  placeholder="github repo link"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <LinkInput
                  id="webLink"
                  icon={<WebIcon />}
                  type="text"
                  value={webLink}
                  placeholder="website link"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <TextEditor
                  id="description"
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
                포스팅하기
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

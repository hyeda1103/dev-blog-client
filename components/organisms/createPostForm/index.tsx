import React, { ChangeEvent, FormEventHandler, SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { ActionMeta } from "react-select";

import LinkInput from "@/components/atoms/linkInput";
import DatePicker from "@/components/molecules/dualDatePicker";
import ErrorBox from "@/components/molecules/errorBox";
import SelectWithLabel from "@/components/molecules/selectWithLabel";
import TextEditor from "@/components/molecules/textEditor";
import TitleInput from "@/components/molecules/titleInput";
import contentStore from "@/stores/contentStore";
import * as T from "@/types";

import {
  BasicButton as Button,
  GitHubIcon,
  InputContainer,
  InputWrapper,
  StyledForm,
  WebIcon,
} from "./styles";

interface Props {
  token: string;
  options: Array<T.SelectOption> | undefined;
  successMessage: string;
  serverErrorMessage: string;
  formValues: T.CreatePostForm;
  formErrors: T.Object;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleStartDate: (date: Date, event: SyntheticEvent<any, Event>) => void;
  handleEndDate: (date: Date, event: SyntheticEvent<any, Event>) => void;
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
  handleStartDate,
  handleEndDate,
  handleSelectSingle,
  handleSelectMulti,
  handleContent,
}: Props) {
  const { title, description, webLink, githubLink } = formValues;

  const statusOptions = [
    {
      value: "완성",
      label: "완성",
    },
    {
      value: "진행중",
      label: "진행중",
    },
  ];

  const RequiredContent = (() => {
    switch (contentStore.postType) {
      case T.PostType.DEV:
      case T.PostType.DAILY:
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
                    placeholder="카테고리"
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
                <ErrorBox success={successMessage} error={serverErrorMessage} />
              </InputWrapper>
              <Button disabled={!token}>포스팅하기</Button>
            </StyledForm>
          </InputContainer>
        );
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
                  placeholder="진행상황"
                  handleChange={handleSelectSingle}
                  formErrors={formErrors}
                  options={statusOptions}
                  isMulti={false}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    placeholder="기술 스택"
                    handleChange={handleSelectMulti}
                    formErrors={formErrors}
                    options={options}
                    isMulti={true}
                  />
                )}
                <DatePicker
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                  formValues={formValues}
                  formErrors={formErrors}
                />
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
                <ErrorBox success={successMessage} error={serverErrorMessage} />
              </InputWrapper>
              <Button disabled={!token}>포스팅하기</Button>
            </StyledForm>
          </InputContainer>
        );
      default:
        break;
    }
  })();

  return <>{RequiredContent}</>;
}

export default observer(CreatePostForm);

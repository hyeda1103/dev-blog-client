import React, { useState, useEffect, ChangeEvent, FormEventHandler } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next';
import { ActionMeta } from 'react-select';
import { observer } from 'mobx-react'

import TypeList from '@root/components/organisms/typeList';
import CreatePostForm from '@root/components/organisms/createPostForm';
import { getCookie } from '@root/helpers/auth';
import * as T from '@root/types';
import { API } from '@root/config';
import contentStore from '@root/stores/contentStore';

interface Props {
  user: T.Profile
  categoryList: Array<T.Category>
  token: string
}

const postTypes: Array<T.PostType> = [T.PostType.ARTICLE, T.PostType.PROJECT]

function CreateLink({ user, categoryList, token }: Props) {
  const [formValues, setFormValues] = useState<T.CreatePostForm>({
    title: '',
    description: '',
    status: T.Status.In_Progress,
    webLink: '',
    githubLink: '',
    categories: [],
    type: undefined,
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [options, setOptions] = useState<Array<T.SelectOption>>();

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };
  
  // form validation handler
  const validate = (values: T.CreatePostForm) => {
    const errorRegisters: T.Object = {};

    if (!values.title) {
      errorRegisters.title = '제목을 입력해야 합니다';
    } 

    if (values.type === T.PostType.PROJECT && !values.githubLink) {
      errorRegisters.githubLink = 'github 링크를 입력해야 합니다';
    } 
    
    if (values.type === T.PostType.PROJECT && !values.webLink) {
      errorRegisters.webLink = '배포 주소를 입력해야 합니다';
    } 
    
    if (!values.description) {
      errorRegisters.description = '내용을 입력해야 합니다';
    } 

    if (!values.status) {
      errorRegisters.status = '프로젝트 진행 상태를 설정해야 합니다';
    }    

    if (values.categories.length === 0) {
      errorRegisters.categories = '적어도 하나 이상의 카테고리를 선택해야 합니다'
    }    
    
    return errorRegisters;
  };
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const handleContent = (e: string) => {
    setFormValues({
      ...formValues,
      description: e,
    })
    setFormErrors({ ...formErrors, description: '' });
  }

  const reset = () => {
    setFormValues({
      title: '',
      description: '',
      status: T.Status.In_Progress,
      githubLink: '',
      webLink: '',
      categories: [],
      type: undefined,
    })
    setFormErrors({});
    setServerErrorMessage('');
  }
  
  useEffect(() => {
    const create = async () => {
      try {
        const res = await axios.post(`${API}/post`, formValues, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
        reset();
        setSuccessMessage(`${res.data.title}가(이) 성공적으로 생성되었습니다`)
        setIsSubmitting(false);
      } catch (err: any) {
        setServerErrorMessage(err.response.data.error)
        setIsSubmitting(false);
      }
    }
    if (!Object.keys(formErrors).length && isSubmitting) create()
  }, [formErrors, isSubmitting]);

  const handleStatus: ((newValue: Array<{
    value: T.Status, label: T.Status
  }> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined = (option: any) => {
    if (!Array.isArray(option)) return;

    const selectedStatus = option.map((item: {
    value: T.Status, label: T.Status
  }) => item.value)
    setFormValues({
      ...formValues,
      status: selectedStatus[0]
    })
    setFormErrors({
      ...formErrors,
      status: '',
    })
  }
  
  const handleSelect: ((newValue: Array<T.SelectOption> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined = (option: any) => {
    if (!Array.isArray(option)) return;

    const selectedCategories = option.map((item: T.SelectOption) => item.value)
    setFormValues({
      ...formValues,
      categories: selectedCategories
    })
    setFormErrors({
      ...formErrors,
      categories: '',
    })
  }
  
  useEffect(() => {
    const selectOptions = categoryList.map((categoryItem: T.Category) => ({
      value: categoryItem._id,
      label: categoryItem.name,
    }))
    setOptions(selectOptions)
  }, [categoryList])

  const Content = (() => {
    switch (contentStore.step) {
      case T.Step.TYPE:
        return (
          <TypeList postTypes={postTypes} formValues={formValues} setFormValues={setFormValues} />
        )
      case T.Step.POST:
        return (
          <CreatePostForm
            token={token}
            options={options}
            successMessage={successMessage}
            serverErrorMessage={serverErrorMessage}
            formValues={formValues}
            formErrors={formErrors}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleStatus={handleStatus}
            handleContent={handleContent}
          />
        )
      default:
        break;
    }
  })()

  return (
    <>
      {Content}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = getCookie('token', req)

  try {
    const user = await axios.get(`${API}/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const category = await axios.get(`${API}/categories`)
    return {
      props: {
        user: user.data,
        categoryList: category.data,
        token
      }
    }
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default observer(CreateLink)
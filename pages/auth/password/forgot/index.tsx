import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
import Router from 'next/router';
import axios from 'axios';

import { isAuth } from '@root/helpers/auth';
import Button from '@root/components/atoms/button';
import InputWithLabel from '@root/components/molecules/inputWithLabel';
import AuthForm from '@root/components/templates/authForm';
import * as T from '@root/types'
import {
  StyledForm,
  Title,
  InputWrapper,
  Logline,
} from './styles';
import ErrorBox from '@root/components/molecules/errorBox';
import { API } from '@root/config';

const ForgotPassword = () => {
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('링크 보내기')

  const { email } = formValues;

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.ForgotPasswordForm) => {
    const errorRegisters: T.Object = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errorRegisters.email = '이메일 주소를 입력해야 합니다';
    } else if (!regex.test(values.email)) {
      errorRegisters.email = '올바르지 않은 이메일 주소입니다';
    }
    
    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    const sendPasswordRestLink = async () => {
      setButtonText('링크보내는 중...')
      try {
        const res = await axios.put(`${API}/forgot-password`, {
            email
        })      
        setFormValues({
          email: '',
        })
        setButtonText('이메일 발신 완료')
        setServerErrorMessage('')
        setSuccessMessage(res.data.message)
        setIsSubmitting(false);
      } catch (err: any) {
        setButtonText('링크 보내기')
        setServerErrorMessage(err.response.data.error)
        setIsSubmitting(false);
      }
    }
    if (!Object.keys(formErrors).length && isSubmitting) sendPasswordRestLink()
  }, [formErrors, isSubmitting, email]);

  const title = (
    <Title>
      비밀번호 재설정하기
    </Title>
  );

  const subTitle = (
    <Logline>
      아래 입력한 이메일 주소로 비밀번호 재설정을 위한 링크가 발신됩니다. 10분 내로 확인하고 비밀번호 재설정을 완료해주세요.
    </Logline>
  )

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="email"
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일 주소를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <ErrorBox
          success={successMessage}
          error={serverErrorMessage}
        />
      </InputWrapper>
      <Button>
        {buttonText}
      </Button>
    </StyledForm>
  );

  return (
    <AuthForm
      title={title}
      subTitle={subTitle}
      form={form}
    />
  );
}

export default ForgotPassword
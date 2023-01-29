import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
import Router, {withRouter} from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';

import { isAuth } from '@/helpers/auth';
import Button from '@/components/atoms/button';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import AuthForm from '@/components/templates/authForm';
import * as T from '@/types'
import ErrorBox from '@/components/molecules/errorBox';
import { API } from '@/config';

const StyledForm = styled.form`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 38.4px;
`;

const SubTitle = styled.p`
  margin-top: 20px;
  font-size: 16px;
`;

const InputWrapper = styled.div`
  margin-bottom: 50.71px;
`;

function ResetPassword({ router }: WithRouterProps) {
  const [formValues, setFormValues] = useState({
    password: '',
  });
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('비밀번호 재설정하기')

  const { password } = formValues;

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  useEffect(() => {
    const token = router.query.id;
    if (token && typeof token === 'string') {
      const { name } = jwt.decode(token) as T.TokenDecoded
      setName(name)
      setToken(token)
    }
  }, [router])

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.ResetPasswordForm) => {
    const errorRegisters: T.Object = {};

    if (!values.password) {
      errorRegisters.password = '비밀번호를 입력해야 합니다';
    } else if (values.password.length < 4) {
      errorRegisters.password = '비밀번호는 적어도 네 글자 이상입니다';
    }
    
    return errorRegisters;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    const sendPasswordRestLink = async () => {
      try {
        const res = await axios.put(`${API}/reset-password`, {
          resetPasswordLink: token,
          newPassword: password
        })      
        setFormValues({
          password: '',
        })
        setButtonText('비밀번호 재설정 완료')
        setServerErrorMessage('')
        setSuccessMessage(res.data.message)
        setIsSubmitting(false);
      } catch (err: any) {
        setButtonText('비밀번호 재설정하기')
        setServerErrorMessage(err.response.data.error)
        setIsSubmitting(false);
      }
    }
    if (!Object.keys(formErrors).length && isSubmitting) sendPasswordRestLink()
  }, [formErrors, isSubmitting, password, token]);

  const title = (
    <Title>
      비밀번호 재설정하기
    </Title>
  );

  const subTitle = (
    <SubTitle>{name}, 새로운 비밀번호를 입력하세요</SubTitle>
  )

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
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

export default withRouter(ResetPassword)

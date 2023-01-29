import React, { useEffect, useState, ChangeEvent, FormEventHandler } from 'react'
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

import Button from '@/components/atoms/button';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import ErrorBox from '@/components/molecules/errorBox';
import AuthForm from '@/components/templates/authForm';
import * as T from '@/types'
import { isAuth } from '@/helpers/auth';
import axios from 'axios';
import { API } from '@/config'

const StyledForm = styled.form`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 38.4px;
`;

const InputWrapper = styled.div`
  margin-bottom: 50.71px;
`;

const DirectToWrapper = styled.div`
  text-align: right;
  padding: 7px auto;

  a {
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;


function RegisterPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name, email, password, confirmPassword,
  } = formValues;

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.RegisterForm) => {
    const errorRegisters: T.Object = {};

    if (!values.name) {
      errorRegisters.name = '이름을 입력해야 합니다';
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errorRegisters.email = '이메일 주소를 입력해야 합니다';
    } else if (!regex.test(values.email)) {
      errorRegisters.email = '올바르지 않은 이메일 주소입니다';
    }

    if (!values.password) {
      errorRegisters.password = '비밀번호를 입력해야 합니다';
    } else if (values.password.length < 4) {
      errorRegisters.password = '비밀번호는 적어도 네 글자 이상입니다';
    }

    if (!values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호 확인을 입력해야 합니다';
    } else if (values.password !== values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
    }

    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    const register = async () => {
      try {
        const res = await axios.post(`${API}/register`, {
            name, email, password,
        })
        setFormValues({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        setSuccessMessage(res.data.message)
        setIsSubmitting(false);
      } catch (err: any) {
        setServerErrorMessage(err.response.data.error)
        setIsSubmitting(false);
      }
    }
    if (!Object.keys(formErrors).length && isSubmitting) register()
  }, [formErrors, isSubmitting, email, name, password]);

  const title = (
    <Title>
      가입하기
    </Title>
  );

  const subTitle = (
    <p></p>
  )

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="name"
          label="이름"
          type="text"
          value={name}
          placeholder="이름"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <InputWithLabel
          id="email"
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일 주소를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <InputWithLabel
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <InputWithLabel
          id="confirmPassword"
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          placeholder="비밀번호 확인"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <ErrorBox success={successMessage} error={serverErrorMessage} />
      </InputWrapper>
      <Button>
        회원가입
      </Button>
    </StyledForm>
  );

  const directTo = (
    <DirectToWrapper>
      이미 가입하셨나요?
      {' '}
      <Link href="/login">
        <a>로그인하기</a>
      </Link>
    </DirectToWrapper>
  );

  return (
    <AuthForm
      title={title}
      subTitle={subTitle}
      form={form}
      directTo={directTo}
    />
  );
}

export default RegisterPage

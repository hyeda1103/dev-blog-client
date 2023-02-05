import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

import Button from "@/components/atoms/button";
import ErrorBox from "@/components/molecules/errorBox";
import InputWithLabel from "@/components/molecules/inputWithLabel";
import AuthForm from "@/components/templates/authForm";
import { API } from "@/config";
import { authenticate, isAuth } from "@/helpers/auth";
import * as T from "@/types";

const StyledForm = styled.form`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Logline = styled.p`
  color: ${({ theme }) => theme.typePrimary};
  font-size: 14px;
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

const ArrowForward = styled(IoIosArrowForward)`
  font-size: 18px;
`;

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("로그인");

  const { email, password } = formValues;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: "" });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.LoginForm) => {
    const errorRegisters: T.Object = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errorRegisters.email = "이메일 주소를 입력해야 합니다";
    } else if (!regex.test(values.email)) {
      errorRegisters.email = "올바르지 않은 이메일 주소입니다";
    }

    if (!values.password) {
      errorRegisters.password = "비밀번호를 입력해야 합니다";
    } else if (values.password.length < 4) {
      errorRegisters.password = "비밀번호는 적어도 네 글자 이상입니다";
    }
    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    const login = async () => {
      try {
        const res = await axios.post(`${API}/login`, {
          email,
          password,
        });
        setFormValues({
          email: "",
          password: "",
        });
        setButtonText("로그인 완료");
        setServerErrorMessage("");
        setSuccessMessage("성공적으로 로그인하였습니다");
        setIsSubmitting(false);
        authenticate(res, () => {
          if (isAuth()) {
            if (isAuth().role === "admin") {
              Router.push("/admin");
            } else if (isAuth().role === "subscriber") {
              Router.push("/user");
            }
          }
        });
      } catch (err: any) {
        setButtonText("로그인");
        setServerErrorMessage(err.response?.data.error);
        setIsSubmitting(false);
      }
    };
    if (!Object.keys(formErrors).length && isSubmitting) login();
  }, [formErrors, isSubmitting, email, password]);

  const title = <Title>블로그 입장하기</Title>;

  const subTitle = <Logline>해다코님, 반가워요. 이제 블로그에 글을 쓸 시간이에요!</Logline>;

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="email"
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일"
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
        <ErrorBox success={successMessage} error={serverErrorMessage} />
      </InputWrapper>
      <Button>{buttonText}</Button>
    </StyledForm>
  );

  const findPassword = (
    <Link href="/auth/password/forgot">
      <a>
        <span>비밀번호 찾기</span>
        <ArrowForward />
      </a>
    </Link>
  );

  const directTo = (
    <DirectToWrapper>
      새로 오셨나요?{" "}
      <Link href="/register">
        <a>가입하기</a>
      </Link>
    </DirectToWrapper>
  );

  return (
    <AuthForm
      title={title}
      subTitle={subTitle}
      form={form}
      findPassword={findPassword}
      // directTo={directTo}
    />
  );
}

export default LoginPage;

import { FormEventHandler, useEffect, useState } from "react";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import styled from "styled-components";

import Button from "@/components/atoms/button";
import ErrorBox from "@/components/molecules/errorBox";
import AuthForm from "@/components/templates/authForm";
import { API } from "@/config";
import * as T from "@/types";

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

function ActivateAccount({ router }: WithRouterProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    token: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("계정 활성화");

  const { token } = formValues;

  useEffect(() => {
    const token = router.query.id;
    if (token && typeof token === "string") {
      const { name } = jwt.decode(token) as T.TokenDecoded;
      setFormValues({
        name,
        token,
      });
    }
  }, [router]);

  const handleClick: FormEventHandler = async (e) => {
    e.preventDefault();
    setButtonText("활성화하는 중...");
    try {
      const res = await axios.post(`${API}/register/activate`, {
        token,
      });
      setFormValues({
        name: "",
        token: "",
      });
      setSuccessMessage(res.data.message);
      setButtonText("활성화 완료");
    } catch (err: any) {
      setServerErrorMessage(err.response.data.error);
      setButtonText("계정 활성화");
    }
  };

  const title = <Title>계정 활성화하기</Title>;

  const subTitle = <SubTitle>아래 버튼을 클릭하고 계정 활성화를 완료할 수 있습니다</SubTitle>;

  const form = (
    <StyledForm onSubmit={handleClick} noValidate>
      <InputWrapper>
        <ErrorBox success={successMessage} error={serverErrorMessage} />
      </InputWrapper>
      <Button>{buttonText}</Button>
    </StyledForm>
  );

  return <AuthForm title={title} subTitle={subTitle} form={form} />;
}

export default withRouter(ActivateAccount);

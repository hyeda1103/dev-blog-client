import { GetServerSideProps } from 'next'
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import * as T from '@root/types';
import { API } from '@root/config';
import { getCookie } from '@root/helpers/auth';
import Button from '@root/components/atoms/button';
import ErrorBox from '@root/components/molecules/errorBox';
import InputWithLabel from '@root/components/molecules/inputWithLabel';

const Container = styled.div`
  position: relative;
  width: 364px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 0;
`;

const Header = styled.div`
  margin-bottom: 28px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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

const StyledForm = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  margin-bottom: 50.71px;
`;

interface Props {
  admin: T.Profile
  token: string
}

function CreateCategoryPage({ admin, token }: Props) {
  const [formValues, setFormValues] = useState<T.CreateCategoryForm>({
    name: "",
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  
  const {
    name,
  } = formValues;
  
  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };
  
  // form validation handler
  const validate = (values: T.CreateCategoryForm) => {
    const errorRegisters: T.Object = {};

    if (!values.name) {
      errorRegisters.name = '카테고리 이름을 입력해야 합니다';
    }

    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  
  useEffect(() => {
    const create = async () => {
      try {
        const res = await axios.post(`${API}/category`, formValues, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
        setFormValues({
          name: '',
        })
        setServerErrorMessage('')
        setSuccessMessage(`카테고리 ${res.data.name}가(이) 성공적으로 생성되었습니다`)
        setIsSubmitting(false);
      } catch (err: any) {
        setServerErrorMessage(err.response.data.error)
        setIsSubmitting(false);
      }
    }
    if (!Object.keys(formErrors).length && isSubmitting) create();
  }, [formErrors, isSubmitting, formValues, token]);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>카테고리 만들기</Title>
        </TitleWrapper>
        <Logline>{admin.name}님, 반가워요.
          포스팅하고 싶은 글의 새로운 카테고리를 등록해보세요.
        </Logline>
      </Header>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <InputWrapper>
          <InputWithLabel
            id="name"
            label="카테고리 이름"
            type="text"
            value={name}
            placeholder="카테고리 이름을 입력하세요"
            handleChange={handleChange}
            formErrors={formErrors}
          />
          <ErrorBox success={successMessage} error={serverErrorMessage} />
        </InputWrapper>
        <Button>
          카테고리 생성
        </Button>
      </StyledForm>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie('token', context.req)

  try {
    const res = await axios.get(`${API}/admin`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return {
      props: {
        admin: res.data,
        token
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }
}


export default CreateCategoryPage
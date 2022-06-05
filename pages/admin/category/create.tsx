import { GetServerSideProps } from 'next'
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios'

import * as T from '@root/types';
import { API } from '@root/config';
import { getCookie } from '@root/helpers/auth';
import Button from '@root/components/atoms/button';
import ErrorBox from '@root/components/molecules/errorBox';
import InputWithLabel from '@root/components/molecules/inputWithLabel';
import { InputWrapper, StyledForm, Title, Container, TitleWrapper, Header, Logline } from './styles';

interface Props {
  admin: T.Profile
  token: string
}

const CreateCategory = ({ admin, token }: Props) => {
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


export default CreateCategory
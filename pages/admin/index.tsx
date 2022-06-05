import { GetServerSideProps } from 'next'
import axios from 'axios'

import * as T from '@root/types';
import { getCookie } from '@root/helpers/auth';
import { API } from '@root/config';
import SelectList from '@root/components/organisms/selectList';
import { Container, Header, TitleWrapper, Title, Logline } from './styles';

interface Props {
  admin: T.Profile
}


const Admin = ({ admin }: Props) => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>즐거운 블로깅</Title>
        </TitleWrapper>
        <Logline>{admin.name}님, 반가워요.
          아래 목록에서 원하는 작업을 선택해주세요.
        </Logline>
      </Header>
      <SelectList />
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
        admin: res.data
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


export default Admin
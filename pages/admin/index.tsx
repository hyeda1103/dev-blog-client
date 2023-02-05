import { GetServerSideProps } from "next";
import axios from "axios";
import styled from "styled-components";

import SelectList from "@/components/organisms/selectList";
import { API } from "@/config";
import { getCookie } from "@/helpers/auth";
import * as T from "@/types";

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

interface Props {
  admin: T.Profile;
}

function AdminPage({ admin }: Props) {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>즐거운 블로깅</Title>
        </TitleWrapper>
        <Logline>{admin.name}님, 반가워요. 아래 목록에서 원하는 작업을 선택해주세요.</Logline>
      </Header>
      <SelectList />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie("token", context.req);

  try {
    const res = await axios.get(`${API}/admin`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        admin: res.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default AdminPage;

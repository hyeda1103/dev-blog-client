import { GetServerSideProps } from "next";
import axios from "axios";

import SelectItem from "@/components/molecules/selectItem";
import { API } from "@/config";
import { getCookie } from "@/helpers/auth";

import { List } from "./styles";
const SelectList = () => {
  return (
    <List>
      <SelectItem link="admin/category/create" contents="새로운 카테고리 만들기" />
      <SelectItem link="admin/post/create" contents="새로운 포스팅하기" />
      <SelectItem link="admin/analyze" contents="블로그 분석하기" />
    </List>
  );
};

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

export default SelectList;

import { GetServerSideProps } from "next";
import axios from "axios";

import PostList from "@/components/organisms/postList";
import Section from "@/components/organisms/section";
import OneColumn from "@/components/templates/oneColumn";
import { API } from "@/config";
import * as T from "@/types";

interface Props {
  devPosts: Array<T.Post>;
}

function DevPage({ devPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title="개발"
        logline={`검색결과: 총 ${devPosts?.length || 0}건`}
        contents={<PostList posts={devPosts} />}
      />
    </OneColumn>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`);
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV);

    return {
      props: {
        devPosts: devPostList,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default DevPage;

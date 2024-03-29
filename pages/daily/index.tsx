import { GetServerSideProps } from "next";
import axios from "axios";

import PostList from "@/components/organisms/postList";
import Section from "@/components/organisms/section";
import OneColumn from "@/components/templates/oneColumn";
import { API } from "@/config";
import * as T from "@/types";

interface Props {
  dailyPosts: Array<T.Post>;
}

function DailyPage({ dailyPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title="일상"
        logline={`검색결과: 총 ${dailyPosts?.length || 0}건`}
        contents={<PostList posts={dailyPosts} />}
      />
    </OneColumn>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`);
    const dailyPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DAILY);

    return {
      props: {
        dailyPosts: dailyPostList,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default DailyPage;

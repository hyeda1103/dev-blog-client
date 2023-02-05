import { GetServerSideProps } from "next";
import axios from "axios";

import PostList from "@/components/organisms/postList";
import Section from "@/components/organisms/section";
import OneColumn from "@/components/templates/oneColumn";
import { API } from "@/config";
import * as T from "@/types";

interface Props {
  slug: string;
  category: T.Category;
  posts: Array<T.Post>;
  numOfPosts: number;
  postsLimit: number;
  postSkip: number;
}

function SingleCategoryPage({ category, posts }: Props) {
  return (
    <OneColumn>
      <Section
        title={`${category.name}`}
        logline={`검색결과: 총 ${posts?.length}건`}
        contents={<PostList posts={posts} />}
      />
    </OneColumn>
  );
}

export default SingleCategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const skip = 0;
  const limit = 3;
  const { slug } = query;

  const all = await axios.post(encodeURI(`${API}/category/${slug}`));

  const res = await axios.post(encodeURI(`${API}/category/${slug}`), { skip, limit });
  return {
    props: {
      slug,
      category: res.data.category,
      posts: res.data.posts,
      numOfPosts: all.data.posts.length,
      postsLimit: limit,
      postSkip: skip,
    },
  };
};

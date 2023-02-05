import { GetServerSideProps } from "next";
import axios from "axios";

import PostList from "@/components/organisms/postList";
import Section from "@/components/organisms/section";
import OneColumn from "@/components/templates/oneColumn";
import { API } from "@/config";
import * as T from "@/types";

interface Props {
  projectPosts: Array<T.Post>;
}

function ProjectPage({ projectPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title="사이드 프로젝트"
        logline={`검색결과: 총 ${projectPosts?.length || 0}건`}
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`);
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT);

    return {
      props: {
        projectPosts: projectList,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ProjectPage;

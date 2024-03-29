import React, { useEffect, useState } from "react";

import PostItem from "@/components/molecules/postItem";
import ProjectItem from "@/components/molecules/projectItem";
import * as T from "@/types";

import { PostList as List } from "./styles";

interface Props {
  posts: Array<T.Post>;
}

function PostList({ posts }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>([]);

  const Item = (post: T.Post) => {
    switch (post.type) {
      case T.PostType.DEV:
      case T.PostType.DAILY:
        return (
          <PostItem key={post._id} post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
        );
      case T.PostType.PROJECT:
        return (
          <ProjectItem key={post._id} post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);
  return <List>{allPosts?.map(Item)}</List>;
}

export default PostList;

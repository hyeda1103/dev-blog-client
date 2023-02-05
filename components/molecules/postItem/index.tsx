import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DOMPurify from "dompurify";

import DateTag from "@/components/atoms/dateTag";
import CategoryItem from "@/components/molecules/categoryItem/index";
import { API } from "@/config";
import * as T from "@/types";

import {
  ClickIcon,
  Container,
  Description,
  Footer,
  Header,
  TagBox,
  Title,
  TypeWrapper,
  ViewWrapper,
} from "./styles";

interface Props {
  slug?: string;
  post: T.Post;
  allPosts: Array<T.Post>;
  setAllPosts: Dispatch<SetStateAction<T.Post[]>>;
}

function PostItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter();
  const [parsed, setParsed] = useState("");

  const handleClick: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (post.type === T.PostType.DAILY) {
      router.push(`/daily/${post.slug}`);
    } else if (post.type === T.PostType.DEV) {
      router.push(`/dev/${post.slug}`);
    }
    await axios.put(`${API}/click-count`, { postId: post._id });
  };

  useEffect(() => {
    const match = post.description.match(/<p>(.*?)<\/p>/i);

    if (match === null || match[0] === null) return;
    setParsed(match[0]);
  }, [post]);

  return (
    <Container onClick={handleClick}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          <DateTag endDate={post.createdAt} />
        </TypeWrapper>
      </Header>
      <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsed) }} />
      <Footer>
        <TagBox>
          {post.categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <ViewWrapper>
          {post.clicks}
          <ClickIcon />
        </ViewWrapper>
      </Footer>
    </Container>
  );
}

export default PostItem;

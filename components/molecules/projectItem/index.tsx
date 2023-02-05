import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DOMPurify from "dompurify";

import DateTag from "@/components/atoms/dateTag";
import StatusTag from "@/components/atoms/statusTag";
import CategoryItem from "@/components/molecules/categoryItem/index";
import { API } from "@/config";
import * as T from "@/types";

import {
  ClickIcon,
  Container,
  Description,
  Details,
  Footer,
  GitHubIcon,
  Header,
  HyperLink,
  HyperText,
  LinkWrapper,
  TagBox,
  Title,
  TypeWrapper,
  ViewWrapper,
  WebIcon,
} from "./styles";

interface Props {
  slug?: string;
  post: T.Post;
  allPosts: Array<T.Post>;
  setAllPosts: Dispatch<SetStateAction<T.Post[]>>;
}

function ProjectItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter();
  const [parsed, setParsed] = useState("");

  const handleClick: MouseEventHandler = async (e) => {
    if ((e.target as HTMLElement).tagName === "A") return;
    e.preventDefault();
    e.stopPropagation();

    router.push(`/side-project/${post.slug}`);
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
          {post.startDate && post.endDate && (
            <DateTag startDate={post.startDate} endDate={post.endDate} />
          )}
          <StatusTag status={post.status} />
        </TypeWrapper>
      </Header>
      <Details>
        <LinkWrapper>
          <HyperLink href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
            <HyperText>{post.githubLink}</HyperText>
          </HyperLink>
          <HyperLink href={post.webLink} target="_blank" rel="noopener noreferrer">
            <WebIcon />
            <HyperText>{post.webLink}</HyperText>
          </HyperLink>
        </LinkWrapper>
      </Details>
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

export default ProjectItem;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSadTear } from "react-icons/fa";
import styled from "styled-components";

import PostList from "@/components/organisms/postList";
import Section from "@/components/organisms/section";
import { API } from "@/config";
import * as T from "@/types";

export const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 364px;
  margin: 80px auto;
  align-items: center;
  gap: 24px;
`;

export const SadFaceIcon = styled(FaSadTear)`
  font-size: 36px;
`;

export const Message = styled.p`
  font-size: 16px;
`;

function SearchResultPage() {
  const router = useRouter();
  const { keyword } = router.query;

  const [searchResult, setSearchResult] = useState<Array<T.Post>>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPostsByKeyword: (keyword: string) => void = async (keyword) => {
    try {
      const postList = await axios.get(encodeURI(`${API}/posts?keyword=${keyword}`));
      setSearchResult(postList.data);
    } catch (error) {
      setErrorMessage("검색 결과가 존재하지 않습니다");
    }
  };

  useEffect(() => {
    setSearchResult([]);
    setErrorMessage("");
    if (!keyword) router.push("/");
    if (typeof keyword !== "string") return;
    fetchPostsByKeyword(keyword);
  }, [keyword, router]);

  return (
    <>
      {errorMessage && (
        <NoResultBox>
          <SadFaceIcon />
          <Message>{errorMessage}</Message>
        </NoResultBox>
      )}
      {searchResult.length > 0 && (
        <Section
          title={`${keyword}`}
          logline={`검색결과: ${searchResult.length}건`}
          contents={<PostList posts={searchResult} />}
        />
      )}
    </>
  );
}

export default SearchResultPage;

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from "styled-components";
import { FaSadTear } from "react-icons/fa";

import { API } from '@/config'
import * as T from '@/types'
import PostList from '@/components/organisms/postList'
import Section from '@/components/organisms/section'

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
  const router = useRouter()
  const { keyword } = router.query
  
  const [searchResult, setSearchResult] = useState<Array<T.Post>>([])
  const [errorMessage, setErrorMessage] = useState('')
  
  const fetchPostsByKeyword: (keyword: string) => void = async (keyword) => {
    try {
      const postList = await axios.get(encodeURI(`${API}/posts?keyword=${keyword}`))
      setSearchResult(postList.data)
    } catch (error) {
      setErrorMessage('검색 결과가 존재하지 않습니다')
    }
  } 
  
  useEffect(() => {
    setSearchResult([])
    setErrorMessage('')
    if (!keyword) router.push('/')
    if (typeof keyword !== 'string') return;
    fetchPostsByKeyword(keyword)
  }, [keyword, router])
  
  return (
    <>
      {errorMessage && (
        <NoResultBox>
          <SadFaceIcon />
          <Message>
            {errorMessage}
          </Message>
        </NoResultBox>
      )}
      {searchResult.length > 0 && (
        <Section
          logline={`${keyword}에 대해 총 ${searchResult.length}편의 글이 작성되었습니다`}
          contents={<PostList posts={searchResult} />}
        />
      )}
    </>
  )
}

export default SearchResultPage

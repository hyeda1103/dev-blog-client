import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { API } from '@root/config'
import * as T from '@root/types'
import PostList from '@root/components/organisms/postList'
import { Message, NoResultBox, SadFaceIcon } from './styles'
import Section from '@root/components/organisms/section'

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
          logline={`${keyword}에 대해 총 ${searchResult.length}개의 글이 작성되었습니다`}
          contents={<PostList posts={searchResult} />}
        />
      )}
    </>
  )
}

export default SearchResultPage
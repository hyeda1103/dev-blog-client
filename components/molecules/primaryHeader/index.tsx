import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import SearchInput from '../searchInput'
import { Container, Inner, Item, Logo, Nav, Highlight } from './styles'
import * as T from '@root/types'

function PrimaryHeader() {
  const router = useRouter()
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
        <Nav>
          <Item>
            <Link href={T.Page.DEV}>
              <a>
                <Highlight isActive={router.asPath === T.Page.DEV}>개발</Highlight>
              </a>
            </Link>
          </Item>
          <Item>
            <Link href={T.Page.DAILY}>
              <a>
                <Highlight isActive={router.asPath === T.Page.DAILY}>일상</Highlight>
              </a>
            </Link>
          </Item>
          <Item>
            <Link href={T.Page.SIDE_PROJECT}>
              <a>
                <Highlight isActive={router.asPath === T.Page.SIDE_PROJECT}>사이드 프로젝트</Highlight>
              </a>
            </Link>
          </Item>
          <SearchInput />
        </Nav>
      </Inner>
    </Container>
  )
}

export default PrimaryHeader
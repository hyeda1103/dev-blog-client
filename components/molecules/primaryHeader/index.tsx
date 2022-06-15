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
          <Item isActive={router.asPath === T.Page.DEV}>
            <Link href={T.Page.DEV}>
              <a>
                개발
              </a>
            </Link>
          </Item>
          <Item isActive={router.asPath === T.Page.DAILY}>
            <Link href={T.Page.DAILY}>
              <a>
                일상
              </a>
            </Link>
          </Item>
          <Item isActive={router.asPath === T.Page.SIDE_PROJECT}>
            <Link href={T.Page.SIDE_PROJECT}>
              <a>
                사이드 프로젝트
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
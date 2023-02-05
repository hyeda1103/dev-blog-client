import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { Container, Inner, Item, Logo, Nav } from './styles'
import * as T from '@/types'
import SearchInput from '@/components/molecules/searchInput'

export default function Header() {
  const router = useRouter()
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
        <SearchInput />
      </Inner>
    </Container>
  )
}

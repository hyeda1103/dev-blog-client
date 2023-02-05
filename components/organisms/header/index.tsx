import Link from 'next/link'
import React from 'react'

import { Container, Inner, Logo, MoonIcon, Wrapper, SunIcon, SwitchMode } from './styles'
import SearchInput from '@/components/molecules/searchInput'
import useDarkMode from 'use-dark-mode'

export default function Header() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
        <Wrapper>
          <SearchInput />
          <SwitchMode onClick={darkmode.toggle}>
            {darkmode.value ? <MoonIcon /> : <SunIcon />}
          </SwitchMode>
        </Wrapper>
      </Inner>
    </Container>
  )
}

import React from 'react'
import Link from 'next/link'
import useDarkMode from 'use-dark-mode';

import * as T from '@root/types';
import { isAuth, logout } from '@root/helpers/auth'
import SNSIcon from '@root/components/atoms/snsIcon';
import { Container, Inner, SocialIconWrapper, Nav, Item, SwitchMode, SunIcon, MoonIcon } from './styles'
import Tippy from '@root/components/atoms/tippy';

function Secondary() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <SocialIconWrapper>
          <Tippy tooltipContent={`해다의 ${T.Social.GITHUB}으로!`}>
            <SNSIcon snsType={T.Social.GITHUB} />
          </Tippy>
          <Tippy tooltipContent={`해다의 ${T.Social.LINKEDIN} 프로필`}>
            <SNSIcon snsType={T.Social.LINKEDIN} />
          </Tippy>
          {/* <Tippy tooltipContent='dalgona92@gmail.com'>
            <SNSIcon snsType={T.Social.EMAIL} />
          </Tippy> */}
        </SocialIconWrapper>
        <Nav>
          {
            isAuth() && isAuth().role === 'admin' && (
              <Item>
                <Link href="/admin">
                  <a>관리자 페이지</a>
                </Link>
              </Item>  
            )
          }
          {
            isAuth() ? (
              <Item>
                <a onClick={logout}>로그아웃</a>
              </Item>
            ) : (
              <Item>
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </Item>
            )
          }
          <SwitchMode darkmode={darkmode.value} onClick={darkmode.toggle}>
            {darkmode.value ? <MoonIcon /> : <SunIcon />}
          </SwitchMode>
        </Nav>
      </Inner>
    </Container>
  )
}

export default Secondary
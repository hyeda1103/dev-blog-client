import Link from 'next/link';

import * as T from '@/types';
import SNSIcon from '@/components/atoms/snsIcon';
import { Root, Inner, Copyright, SocialIconWrapper } from './styles'

export default function Footer() {
  return (
    <Root>
      <Inner>
        <SocialIconWrapper>
          <SNSIcon snsType={T.Social.GITHUB} />
          <SNSIcon snsType={T.Social.LINKEDIN} />
          <SNSIcon snsType={T.Social.EMAIL} />
        </SocialIconWrapper>
        <Copyright>
          Copyright &copy; 해다코 {new Date().getFullYear()}, Made with{" "}
          <Link href='https://nextjs.org/'>
            <a>
              Next.js
            </a>
          </Link>
        </Copyright>
      </Inner>
    </Root>
  )
}

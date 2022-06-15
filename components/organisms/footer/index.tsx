import Link from 'next/link';

import { Root, Inner, Copyright } from './styles'

export default function Footer() {
  return (
    <Root>
      <Inner>
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

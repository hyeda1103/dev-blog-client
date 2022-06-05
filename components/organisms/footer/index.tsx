import Link from 'next/link';

import { Container, Inner, Copyright } from './styles'

export default function Footer() {
  return (
    <Container>
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
    </Container>
  )
}

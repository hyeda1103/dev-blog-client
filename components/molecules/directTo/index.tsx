import Link from 'next/link'
import React from 'react'

import { Container, RightArrow } from './styles'

interface Props {
  link: string
}

function DirectTo({ link }: Props) {
  return (
    <Container>
      <Link href={link}>
        <a>
          <RightArrow />
        </a>
      </Link>
    </Container>
  )
}

export default DirectTo

import Link from 'next/link'
import React from 'react'

import { Container, RightArrow } from './styles'

interface Props {
  link: string
  text: string
}

function DirectTo({ link, text }: Props) {
  return (
    <Container>
      <Link href={link}>
        {text}
      </Link>
      <RightArrow />
    </Container>
  )
}

export default DirectTo
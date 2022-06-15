import Link from 'next/link'
import React from 'react'

import { Container, RightArrow, Circle } from './styles'

interface Props {
  link: string
  NofNewPost: number
}

function DirectTo({ link, NofNewPost }: Props) {
  return (
    <Container>
      <Link href={link}>
        <a>
          <Circle>  
            <p>
              {NofNewPost}
            </p>
          </Circle>
          <RightArrow />
        </a>
      </Link>
    </Container>
  )
}

export default DirectTo
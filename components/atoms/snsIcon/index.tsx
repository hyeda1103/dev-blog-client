import React from 'react'

import * as T from '@root/types'
import { GitHubIcon, LinkedInIcon, EmailIcon } from './styles'


interface Props {
  snsType: T.Social
}

function SNSIcon({ snsType }: Props) {
  switch (snsType) {
    case T.Social.GITHUB:
      return (
        <a target='_blank' href='https://github.com/hyeda1103' rel="noopener noreferrer">
          <GitHubIcon />
        </a>
      )
    case T.Social.LINKEDIN:
      return (
        <a target='_blank' href='https://www.linkedin.com/in/dahye-ko-1103/' rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      )
    case T.Social.EMAIL: 
      return (
        <a href='mailto: dalgona92@gmail.com'>
          <EmailIcon />
        </a>
      )
    default:
      return <></>
  }
}

export default SNSIcon
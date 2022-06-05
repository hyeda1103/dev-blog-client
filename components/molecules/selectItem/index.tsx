import React from 'react'
import { useRouter } from 'next/router';

import { ListItem, ArrowIcon } from './styles'

interface Props {
  link: string
  contents: string
}

function SelectItem({ link, contents }: Props) {
  const router = useRouter()
  return (
    <ListItem onClick={() => router.push(link)}>
      <ArrowIcon />
      {contents}
    </ListItem>
  )
}

export default SelectItem
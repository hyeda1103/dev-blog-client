import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router';

import * as T from '@root/types';
import { Container } from './styles';

interface Props {
  onPost?: boolean
  category: T.Category
}

function CategoryItem({ category, onPost }: Props) {
  const router = useRouter()
  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    router.push(`/categories/${category.slug}`)
  }
  return (
    <Container key={category._id} onClick={handleClick} onPost={onPost}>
      {category.name}
    </Container>
  )
}

export default CategoryItem

import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router';

import * as T from '@/types';
import { Container } from './styles';

interface Props {
  category: T.Category
}

function CategoryItem({ category }: Props) {
  const router = useRouter()
  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    router.push(`/categories/${category.slug}`)
  }
  return (
    <Container key={category._id} onClick={handleClick}>
      {category.name}
    </Container>
  )
}

export default CategoryItem

import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router';

import * as T from '@/types';
import { Container } from './styles';

interface Props {
  isPost?: boolean
  category: T.Category
}

function CategoryItem({ category, isPost }: Props) {
  const router = useRouter()
  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    router.push(`/categories/${category.slug}`)
  }
  return (
    <Container key={category._id} onClick={handleClick} isPost={isPost}>
      {category.name}
    </Container>
  )
}

export default CategoryItem

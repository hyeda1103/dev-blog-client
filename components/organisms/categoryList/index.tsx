import React from 'react'

import { CategoryList as List } from './styles';
import * as T from '@/types'
import CategoryItem from '@/components/molecules/categoryItem/index';

interface Props {
  categories: Array<T.Category>
}

function CategoryList({ categories }: Props) {
  return (
    <List>
      {categories && categories.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </List>
  )
}

export default CategoryList

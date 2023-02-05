import CategoryItem from "@/components/molecules/categoryItem";
import * as T from "@/types";

import { CategoryList as List } from "./styles";

interface Props {
  categories: Array<T.Category>;
}

function CategoryList({ categories }: Props) {
  return (
    <List>
      {categories &&
        categories.map((category) => <CategoryItem key={category._id} category={category} />)}
    </List>
  );
}

export default CategoryList;

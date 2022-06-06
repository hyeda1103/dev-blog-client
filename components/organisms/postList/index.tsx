import React, { useState, useEffect } from 'react'

import * as T from '@root/types'
import PostItem from '@root/components/molecules/postItem';
import ProjectItem from '@root/components/molecules/projectItem';
import { PostList as List } from './styles';

interface Props {
  posts: Array<T.Post>
}

function PostList({ posts }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>([])
  
  useEffect(() => {
    setAllPosts(posts)
  }, [posts]) 

  const Item = (post: T.Post) => {
    switch (post.type) {
      case T.PostType.ARTICLE:
        return (
          <PostItem
            key={post._id}
            post={post}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
        )
      case T.PostType.PROJECT:
        return (
          <ProjectItem
            key={post._id}
            post={post}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
        )
      default:
        break;
    }
  }

  return (
    <List>
      {allPosts?.map(Item)}
    </List>
  )
}

export default PostList
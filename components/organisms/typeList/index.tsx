import React, { Dispatch, SetStateAction } from 'react'
import { observer } from 'mobx-react'

import * as T from '@/types'
import StepGuide from '@/components/molecules/stepGuide';
import Button from '@/components/atoms/button';
import { Container, SelectList, SelectItem, ArrowIcon } from './styles';
import contentStore from '@/stores/contentStore';

interface Props {
  postTypes: Array<T.PostType>
  formValues: T.CreatePostForm
  setFormValues: Dispatch<SetStateAction<T.CreatePostForm>>
}

function TypeList({ postTypes, formValues, setFormValues }: Props) {
  const setPostType = (type: T.PostType | undefined) => contentStore.setPostType(type)
  const handleClick = (type: T.PostType) => {
    setFormValues({ ...formValues, type })
    setPostType(type)
  };
  const setStep = (step: T.Step | undefined) => contentStore.setStep(step)
  return (
    <Container>
      <StepGuide
        stepNumber={1}
        title='포스트 타입 정하기'
        guideText='개발 (dev), 일상 (daily), 프로젝트 (project) 중 무엇에 관한 포스트를 작성하고 싶나요?' />
      <SelectList>
        {postTypes.map((type) => (
          <SelectItem key={type} value={type} onClick={() => handleClick(type)} isSelected={formValues.type === type}>
            <ArrowIcon />{' '}{type}
          </SelectItem>
        ))}
      </SelectList>
      <Button disabled={formValues.type === undefined} onClick={() => setStep(T.Step.POST)}>
        글 쓰러 가기
      </Button>
    </Container>
  )
}

export default observer(TypeList)

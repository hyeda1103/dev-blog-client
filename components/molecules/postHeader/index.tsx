import { observer } from "mobx-react";

import contentStore from "@/stores/contentStore";
import * as T from "@/types";

import { Container, Highlight, Inner, Item, Nav } from "./styles";

function PostHeader() {
  const setStep = (step: T.Step | undefined) => contentStore.setStep(step);

  const handleClick = () => {
    if (contentStore.postType === undefined) return;
    setStep(T.Step.POST);
  };
  return (
    <Container>
      <Inner>
        <Nav>
          <Item onClick={() => setStep(T.Step.TYPE)}>
            <Highlight isActive={contentStore.step === T.Step.TYPE}>
              STEP 1. 포스트 타입 정하기
            </Highlight>
          </Item>
          <Item onClick={handleClick}>
            <Highlight
              isActive={contentStore.step === T.Step.POST && contentStore.postType !== undefined}
            >
              STEP 2. 포스트 작성하기
            </Highlight>
          </Item>
        </Nav>
      </Inner>
    </Container>
  );
}

export default observer(PostHeader);

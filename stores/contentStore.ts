import { observable } from "mobx";

import * as T from "@/types";

interface ContentState {
  step: T.Step | undefined;
  postType: T.PostType | undefined;
  setStep: (step: T.Step | undefined) => void;
  setPostType: (type: T.PostType | undefined) => void;
}

const contentStore = observable<ContentState>({
  step: T.Step.TYPE,
  postType: undefined,
  setStep(step) {
    this.step = step;
  },
  setPostType(type) {
    this.postType = type;
  },
});

export default contentStore;

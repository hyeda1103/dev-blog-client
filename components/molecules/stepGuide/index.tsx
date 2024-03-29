import { GuideWrapper, Logline, Title, TitleWrapper } from "./styles";

interface Props {
  stepNumber: number;
  title: string;
  guideText: string;
}

function StepGuide({ stepNumber, title, guideText }: Props) {
  return (
    <GuideWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        <Logline>{guideText}</Logline>
      </TitleWrapper>
    </GuideWrapper>
  );
}

export default StepGuide;

import React, { ReactNode } from "react";

import { Container, ContentsWrapper, Header, Logline, Title, TitleWrapper } from "./styles";

interface Props {
  title?: string;
  link?: ReactNode;
  logline?: string;
  contents: ReactNode;
}

function Section({ title, link, logline, contents }: Props) {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>{title}</Title>
          {link}
        </TitleWrapper>
        {logline && <Logline>{logline}</Logline>}
      </Header>
      <ContentsWrapper>{contents}</ContentsWrapper>
    </Container>
  );
}

export default Section;

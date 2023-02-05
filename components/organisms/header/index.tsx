import Link from "next/link";
import useDarkMode from "use-dark-mode";

import SearchInput from "@/components/molecules/searchInput";

import { Container, Inner, Logo, MoonIcon, SunIcon, SwitchMode, Wrapper } from "./styles";

export default function Header() {
  const darkmode = useDarkMode(true);
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
        <Wrapper>
          <SearchInput />
          <SwitchMode onClick={darkmode.toggle}>
            {darkmode.value ? <MoonIcon /> : <SunIcon />}
          </SwitchMode>
        </Wrapper>
      </Inner>
    </Container>
  );
}

import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

import { Form, Input } from "./styles";

function SearchInput() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!keyword) return;
    router.push(`/search?keyword=${keyword}`);
  };
  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Input name="keyword" type="text" placeholder="검색..." onChange={handleChange} />
    </Form>
  );
}

export default SearchInput;

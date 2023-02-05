import { CheckIcon, ErrorIcon, Wrapper } from "./styles";

interface Props {
  success?: string;
  error?: string;
}

function ErrorBox({ success, error }: Props) {
  const Status = (() => {
    if (success) {
      return (
        <span>
          <CheckIcon />
          {success}
        </span>
      );
    }
    if (error) {
      return (
        <span>
          <ErrorIcon />
          {error}
        </span>
      );
    }
  })();
  return success || error ? (
    <Wrapper success={!!success} error={!!error}>
      {Status}
    </Wrapper>
  ) : null;
}

export default ErrorBox;

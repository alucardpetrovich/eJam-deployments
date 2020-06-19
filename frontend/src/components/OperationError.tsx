import React from "react";
import styled from "styled-components";

const ErrorStyled = styled.div`
  border: 3px ridge red;
  color: #e33e10;
  padding: 5px;
`;

interface IOperationErrorProps {
  errorMessage: string;
}

export function OperationError(props: IOperationErrorProps) {
  const { errorMessage } = props;

  return <>{errorMessage && <ErrorStyled>{errorMessage}</ErrorStyled>}</>;
}

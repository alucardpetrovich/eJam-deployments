import React from "react";
import styled from "styled-components";

const LoadingStyled = styled.div`
  border: 3px ridge red;
`;

interface ILoadingProps {
  isLoading: boolean;
}

export function OperationError(props: ILoadingProps) {
  const { isLoading } = props;

  return <>{isLoading && <LoadingStyled>Loading...</LoadingStyled>}</>;
}

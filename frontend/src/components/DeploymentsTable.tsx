import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { RootState } from "../store/root.reducer";
import { DeploymentRow } from "./DeploymentRow";
import { getDeployments } from "../store/deployments/deployments.operations";
import { OperationError } from "./OperationError";
import { DeploymentTimer } from "./DeploymentTimer";

const H2Styled = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

const TableStyled = styled.table`
  th,
  td {
    padding-right: 10px;
  }

  td {
    max-width: 700px;
  }
`;

export const DeploymentsTable = () => {
  const dispatch = useDispatch();
  const { data: deployments, errorMessage, isLoading } = useSelector(
    (state: RootState) => state.deployments
  );

  console.log(deployments, errorMessage, isLoading);

  useEffect(() => {
    dispatch(getDeployments());
  }, [dispatch]);

  const isLoadedEmptyDeployments =
    !isLoading && !errorMessage && deployments.length === 0;

  return (
    <>
      <H2Styled>Deployments</H2Styled>

      {isLoading && <p>Loading...</p>}
      <OperationError errorMessage={errorMessage} />
      {isLoadedEmptyDeployments && <p>No deployments</p>}

      {!isLoading && (
        <TableStyled>
          <thead>
            <th>template name</th>
            <th>version</th>
            <th>url</th>
            <th></th>
          </thead>
          {deployments.map((deployment) =>
            deployment.hideDeployment ? (
              <tr>
                <DeploymentTimer _id={deployment._id} />
              </tr>
            ) : (
              <DeploymentRow key={deployment._id} deployment={deployment} />
            )
          )}
        </TableStyled>
      )}
    </>
  );
};

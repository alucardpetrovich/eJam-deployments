import React from "react";
import { useDispatch } from "react-redux";

import { IDeployment } from "../shared/interfaces";
import { removeDeployment } from "../store/deployments/deployments.operations";

export interface IDeploymentItemProps {
  deployment: IDeployment;
}

export const DeploymentRow = ({ deployment }: IDeploymentItemProps) => {
  const dispatch = useDispatch();
  const { _id, templateName, version, url } = deployment;

  const onRemoveClick = (_id: string) => {
    dispatch(removeDeployment(_id));
  };

  return (
    <tr>
      <td>{templateName}</td>
      <td>{version}</td>
      <td>{url}</td>
      <td>
        <button onClick={() => onRemoveClick(_id)}>Remove</button>
      </td>
    </tr>
  );
};

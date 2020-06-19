import { ICreateDeploymentRequest } from "./ICreateDeploymentRequest";

export interface IDeployment extends ICreateDeploymentRequest {
  _id: string;
  deployedAt: Date;
  hideDeployment?: boolean;
}

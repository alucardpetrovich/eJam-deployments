import { AxiosError } from "axios";
import { IDeployment } from "../../shared/interfaces";

export const GET_DEPLOYMENTS_REQUEST = "GET_DEPLOYMENTS_REQUEST";
export const GET_DEPLOYMENTS_SUCCESS = "GET_DEPLOYMENTS_SUCCESS";
export const GET_DEPLOYMENTS_FAIL = "GET_DEPLOYMENTS_FAIL";

export const ADD_DEPLOYMENT_REQUEST = "ADD_DEPLOYMENT_REQUEST";
export const ADD_DEPLOYMENT_SUCCESS = "ADD_DEPLOYMENT_SUCCESS";
export const SHOW_NEW_DEPLOYMENT = "SHOW_NEW_DEPLOYMENT";
export const ADD_DEPLOYMENT_FAIL = "ADD_DEPLOYMENT_FAIL";

export const REMOVE_DEPLOYMENT_REQUEST = "REMOVE_DEPLOYMENT_REQUEST";
export const REMOVE_DEPLOYMENT_SUCCESS = "REMOVE_DEPLOYMENT_SUCCESS";
export const REMOVE_DEPLOYMENT_FAIL = "REMOVE_DEPLOYMENT_FAIL";

export const getDeploymentsRequest = () => {
  return { type: GET_DEPLOYMENTS_REQUEST };
};

export const getDeploymentsSuccess = (deployments: IDeployment[]) => {
  return { type: GET_DEPLOYMENTS_SUCCESS, payload: { deployments } };
};

export const getDeploymentsFail = (error: AxiosError) => {
  return { type: GET_DEPLOYMENTS_FAIL, payload: { error } };
};

export const addDeploymentRequest = () => {
  return { type: ADD_DEPLOYMENT_REQUEST };
};

export const addDeploymentSuccess = (deployment: IDeployment) => {
  return { type: ADD_DEPLOYMENT_SUCCESS, payload: { deployment } };
};

export const showNewDeploymentAction = (_id: string) => {
  return { type: SHOW_NEW_DEPLOYMENT, payload: { _id } };
};

export const addDeploymentFail = (error: AxiosError) => {
  return { type: GET_DEPLOYMENTS_FAIL, payload: { error } };
};

export const removeDeploymentRequest = () => {
  return { type: REMOVE_DEPLOYMENT_REQUEST };
};

export const removeDeploymentSuccess = (_id: string) => {
  return { type: REMOVE_DEPLOYMENT_SUCCESS, payload: { _id } };
};

export const removeDeploymentFail = (error: AxiosError) => {
  return { type: REMOVE_DEPLOYMENT_REQUEST, payload: { error } };
};

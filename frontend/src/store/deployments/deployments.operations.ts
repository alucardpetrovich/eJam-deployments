import { Dispatch } from "redux";

import * as api from "../../clients/api";
import {
  getDeploymentsRequest,
  getDeploymentsSuccess,
  getDeploymentsFail,
  addDeploymentRequest,
  addDeploymentSuccess,
  addDeploymentFail,
  removeDeploymentRequest,
  removeDeploymentSuccess,
  removeDeploymentFail,
  showNewDeploymentAction,
} from "./deployments.actions";
import { ICreateDeploymentRequest } from "../../shared/interfaces";

export const getDeployments = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getDeploymentsRequest());

    const templates = await api.getDeployments();

    dispatch(getDeploymentsSuccess(templates));
  } catch (error) {
    dispatch(getDeploymentsFail(error));
  }
};

export const addDeployment = (data: ICreateDeploymentRequest) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(addDeploymentRequest());

    const deployment = await api.createDeployment(data);

    dispatch(addDeploymentSuccess(deployment));
  } catch (error) {
    dispatch(addDeploymentFail(error));
  }
};

export const removeDeployment = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(removeDeploymentRequest());

    await api.removeDeployment(_id);

    dispatch(removeDeploymentSuccess(_id));
  } catch (error) {
    dispatch(removeDeploymentFail(error));
  }
};

export const showNewDeployment = (_id: string) => (dispatch: Dispatch) => {
  dispatch(showNewDeploymentAction(_id));
};

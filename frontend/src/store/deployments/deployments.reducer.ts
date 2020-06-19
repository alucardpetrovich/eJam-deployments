import { IDeployment, IAction } from "../../shared/interfaces";
import {
  GET_DEPLOYMENTS_REQUEST,
  ADD_DEPLOYMENT_REQUEST,
  REMOVE_DEPLOYMENT_REQUEST,
  GET_DEPLOYMENTS_FAIL,
  ADD_DEPLOYMENT_FAIL,
  REMOVE_DEPLOYMENT_FAIL,
  GET_DEPLOYMENTS_SUCCESS,
  ADD_DEPLOYMENT_SUCCESS,
  REMOVE_DEPLOYMENT_SUCCESS,
  SHOW_NEW_DEPLOYMENT,
} from "./deployments.actions";

interface IDeploymentsState {
  data: IDeployment[];
  isLoading: boolean;
  errorMessage: string;
}

const initialDeploymentsState: IDeploymentsState = {
  data: [],
  isLoading: true,
  errorMessage: "",
};

export const deploymentsReducer = (
  state: IDeploymentsState = initialDeploymentsState,
  action: IAction
): IDeploymentsState => {
  console.log(action);

  switch (action.type) {
    case GET_DEPLOYMENTS_REQUEST:
    case ADD_DEPLOYMENT_REQUEST:
    case REMOVE_DEPLOYMENT_REQUEST:
      return { ...state, isLoading: true };

    case GET_DEPLOYMENTS_FAIL:
    case ADD_DEPLOYMENT_FAIL:
    case REMOVE_DEPLOYMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload?.error?.message,
      };

    case GET_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload?.deployments,
      };
    case ADD_DEPLOYMENT_SUCCESS:
      const newDeployment: IDeployment = {
        ...action.payload?.deployment,
        hideDeployment: true,
      };
      return {
        ...state,
        isLoading: false,
        data: [...state.data, newDeployment],
      };
    case REMOVE_DEPLOYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(
          (deployment) => deployment._id !== action.payload?._id
        ),
      };

    case SHOW_NEW_DEPLOYMENT:
      return {
        ...state,
        data: state.data.map((deployment) => {
          if (deployment._id === action.payload?._id) {
            return {
              ...deployment,
              hideDeployment: false,
            };
          }

          return deployment;
        }),
      };

    default:
      return state;
  }
};

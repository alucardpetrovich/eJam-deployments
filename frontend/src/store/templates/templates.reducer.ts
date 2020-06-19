import { IAction, ITemplate } from "../../shared/interfaces";
import {
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAIL,
} from "./templates.actions";

interface ITemplatesState {
  data: ITemplate[];
  isLoading: boolean;
  errorMessage: string;
}

const initialTemplatesState: ITemplatesState = {
  data: [],
  isLoading: false,
  errorMessage: "",
};

export const templatesReducer = (
  state: ITemplatesState = initialTemplatesState,
  action: IAction
): ITemplatesState => {
  switch (action.type) {
    case GET_TEMPLATES_REQUEST:
      return { ...state, isLoading: true };

    case GET_TEMPLATES_SUCCESS:
      return { ...state, isLoading: false, data: action.payload?.templates };

    case GET_TEMPLATES_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload?.error?.message,
      };

    default:
      return state;
  }
};

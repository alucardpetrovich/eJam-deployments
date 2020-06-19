import { Dispatch } from "redux";

import * as api from "../../clients/api";
import {
  getTemplatesRequest,
  getTemplatesSuccess,
  getTemplatesFail,
} from "./templates.actions";

export const getTemplates = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getTemplatesRequest());

    const templates = await api.getTemplates();

    dispatch(getTemplatesSuccess(templates));
  } catch (error) {
    dispatch(getTemplatesFail(error));
  }
};

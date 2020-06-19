import { ITemplate } from "../../shared/interfaces";
import { AxiosError } from "axios";

export const GET_TEMPLATES_REQUEST = "GET_TEMPLATES_REQUEST";
export const GET_TEMPLATES_SUCCESS = "GET_TEMPLATES_SUCCESS";
export const GET_TEMPLATES_FAIL = "GET_TEMPLATES_FAIL";

export const getTemplatesRequest = () => {
  return { type: GET_TEMPLATES_REQUEST };
};

export const getTemplatesSuccess = (templates: ITemplate[]) => {
  return { type: GET_TEMPLATES_SUCCESS, payload: { templates } };
};

export const getTemplatesFail = (error: AxiosError) => {
  return { type: GET_TEMPLATES_FAIL, payload: { error } };
};

import axios, { AxiosRequestConfig } from "axios";

import { config } from "../config";
import {
  ITemplate,
  IDeployment,
  ICreateDeploymentRequest,
} from "../shared/interfaces";

const api = axios.create({ baseURL: config.apiBaseUrl });

const TEMPLATES_BASE_PATH = "/templates";
const DEPLOYMENTS_BASE_PATH = "/deployments";

const request = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await api(url, config);
  return data;
};

export const getTemplates = async (): Promise<ITemplate[]> => {
  return request(TEMPLATES_BASE_PATH, { method: "GET" });
};

export const getDeployments = async (): Promise<IDeployment[]> => {
  return request(DEPLOYMENTS_BASE_PATH, { method: "GET" });
};

export const createDeployment = async (
  data: ICreateDeploymentRequest
): Promise<IDeployment> => {
  return request(DEPLOYMENTS_BASE_PATH, { method: "POST", data });
};

export const removeDeployment = async (id: string): Promise<void> => {
  return request(`${DEPLOYMENTS_BASE_PATH}/${id}`, { method: "DELETE" });
};

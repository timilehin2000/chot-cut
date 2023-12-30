import axios, { AxiosRequestHeaders } from "axios";

import { parseError } from "./parseError";

const defaultHeaders = {
  "Content-Type": "application/json",
};

/**
 *
 * @param {any} dataObject
 * @returns Promise<{ isError : boolean; data?: { message : { data : any }}; errorMessage ?: string}>
 */

export const fetchApi = async (
  dataObject: Object,
  method: "POST" | "GET" | "PATCH" | "PUT",
  url: string,
  headers = defaultHeaders,
  params?: Object
) => {
  try {
    const data = await axios({
      method,
      url,
      params,
      data: dataObject,
      headers,
    });

    return { isError: false, data };
  } catch (error) {
    const { errorMessage, isError } = parseError(error);
    return { errorMessage, isError };
  }
};

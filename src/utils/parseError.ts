/**
 *
 * @param { import("axios").AxiosError } errorObject
 */

import { AxiosError } from "axios";

const returnValue = (errorMessage: AxiosError | any) => {
  return { isError: true, errorMessage };
};

export const parseError = (errorObject: AxiosError | any) => {
  const { request, response, error } = errorObject;
  if (response) {
    if (response.data) {
      const {
        data: { message },
      } = response;

      return returnValue(response.data[0] || message);
    }

    return returnValue(response.statusText);
  } else if (request) {
    const statusCodeForNoInternet = 0;

    const { status, statusText: errorMessage } = request;

    if (status === statusCodeForNoInternet) {
      return returnValue(
        "Seems you are not connected to the internet, refresh your browser"
      );
    }

    return returnValue(errorMessage);
  } else {
    return returnValue(error);
  }

  // return "Error Occured";
};

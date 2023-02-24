const selectErrorCode = (error) => {
  if (error && error.response) {
    return Number(error.response.status);
  }

  if (error && error.request) {
    return 500;
  }

  return 500;
};

const selectErrorMessage = (error) => {
  // if (error && error.response && error.response.status === 307) {
  //   return 307;
  // }
  if (error && error.response && error.response.status === 503) {
    return error.response.message || 'Service Unavailable';
  }

  if (error && error.response && error.response.data) {
    return error.response.data.message;
  }

  if (error && error.request) {
    return error.message;
  }

  return 'Unknown Error';
};

export default class ApiErrorHandler {
  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    // if (selectErrorCode(error) === 503) {
    //   return 'Something went wrong';
    // }

    return selectErrorMessage(error);
  }
}

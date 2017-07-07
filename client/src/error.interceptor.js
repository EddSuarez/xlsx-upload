function errorInterceptor($q) {
  'ngInject';

  return {
    response: (response) => {
      // Will only be called for HTTP up to 300
      return response;
    },
    responseError: (rejection) => {
      if (rejection.status === 401) {
        console.log('unauthorized');
      } else if (rejection.status === 403) {
        console.log('Forbidden');
      } else if (rejection.status === 404) {
        console.log('Not found');
      } else if (rejection.status) {
        if (rejection.data && rejection.data.errorMessage) {
          console.log(rejection.data.errorMessage);
        } else {
          console.log('An unexpected server error has occurred');
        }
      }
      return $q.reject(rejection);
    }
  };
}

export default errorInterceptor;

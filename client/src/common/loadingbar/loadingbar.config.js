const loadingConfig = (cfpLoadingBarProvider) => {
  'ngInject';

  cfpLoadingBarProvider.includeBar = true;
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 500;
};

export default loadingConfig;


const AppConfig = ($locationProvider, $httpProvider, $stateProvider) => {
  'ngInject';

  $stateProvider
    .state('dashboardLayout', {
      abstract: true,
      views: {
        app: {
          template: '<dashboard-layout></dashboard-layout>',
        }
      }
    });

  // $httpProvider.interceptors.push('errorInterceptor');
  // $httpProvider.interceptors.push('authInterceptor');

  $locationProvider.html5Mode(true);
};

export default AppConfig;

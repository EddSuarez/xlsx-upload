import lbServices from 'services/lb-services';
import angular from 'angular';
import appComponent from './app.component.js';
import common from './common/common';
import components from './components/components';
import appRun from './app.run.js';
import appConfig from './app.config.js';
import errorInterceptor from './error.interceptor';
import constants from './components/services/constants';


const app = angular.module('app', [
  'ui.router',
  lbServices,
  constants,
  common,
  components
])
  .config(appConfig)
  .directive('app', appComponent)
  .factory('errorInterceptor', errorInterceptor)
  .run(appRun)
  .name;

export default app;


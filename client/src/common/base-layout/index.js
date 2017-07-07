import angular from 'angular';
import 'angular-bootstrap-form-validation/dist/form-validation';
import './base.layout.less';

const baseLayoutModule = angular.module('baseLayout', [
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'ui.bootstrap',
  'ui.bootstrap.validation'
])
  .name;

export default baseLayoutModule;

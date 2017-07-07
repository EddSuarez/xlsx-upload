import angular from 'angular';
import errorPagesComponent from './error-pages.component';

const errorPagesModule = angular.module('error-pages', [
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('error-pages', {
      url: '/error/:code',
      template: '<error-pages></error-pages>',
      parent: 'quickstartLayout'
    });
})
.component('errorPages', errorPagesComponent)
.name;

export default errorPagesModule;

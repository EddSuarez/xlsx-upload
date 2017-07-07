import constants from 'services/constants';
import angular from 'angular';
import uploadFileComponent from './upload-file.component';


const dashboardModule = angular.module('upload-file', [
  'ui.router',
  'ngFileUpload',
  constants
])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('upload-file', {
        url: '/upload-file',
        template: '<upload-file></upload-file>',
        parent: 'dashboardLayout'
      });
  })
  .component('uploadFile', uploadFileComponent)
  .directive('fileModel', ['$parse', ($parse) => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        const model = $parse(attrs.fileModel);
        const modelSetter = model.assign;
        element.bind('change', () => {
          scope.$apply(() => {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])
  .directive('ngfChange', () => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        const onChangeHandler = scope.$eval(attrs.ngfChange);
        element.bind('change', onChangeHandler);
      }
    };
  })
  .name;

export default dashboardModule;

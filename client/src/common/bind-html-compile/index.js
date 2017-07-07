import angular from 'angular';
import BindHtmlCompile from './bind-html-compile.directive';

const bindHtmlCompileModule = angular.module('bindHtmlCompile', [
])

  .directive('bindHtmlCompile', BindHtmlCompile)
  .name;

export default bindHtmlCompileModule;


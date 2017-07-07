import angular from 'angular';
import sidebarComponent from './sidebar.component';

const sidebarModule = angular.module('sidebar', [
])
  .directive('sidebar', sidebarComponent)
  .name;

export default sidebarModule;

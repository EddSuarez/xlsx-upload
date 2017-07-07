import navbarDashboard from 'common/navbar-dashboard';
import sidebar from 'common/sidebar';
import baseLayout from 'common/base-layout';
import loadingBar from 'common/loadingbar';
import angular from 'angular';
import dashboardLayoutComponent from './dashboard.layout.component.js';

const dashboardLayoutModule = angular.module('dashboardLayout', [
  baseLayout,
  loadingBar,
  navbarDashboard,
  sidebar
])
.directive('dashboardLayout', dashboardLayoutComponent)
.name;

export default dashboardLayoutModule;


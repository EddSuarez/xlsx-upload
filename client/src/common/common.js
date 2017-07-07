import angular from 'angular';
import dashboardLayout from './dashboard-layout';
import BindHtmlCompile from './bind-html-compile';
import blockUi from './block-ui';
import translate from './translate';
import toast from './toast';

const common = angular.module('app.common', [
  'toastr',
  BindHtmlCompile,
  translate,
  dashboardLayout,
  blockUi,
])
.service('toast', toast)
.name;


export default common;

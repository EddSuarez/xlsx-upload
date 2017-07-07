import angular from 'angular';
import loadingBarConf from './loadingbar.config';
import './loadingbar.less';

const loadingBarModule = angular.module('loadingbar', [
  'angular-loading-bar'
])
  .config(loadingBarConf)
  .name;

export default loadingBarModule;


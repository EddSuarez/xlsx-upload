import 'nodeModules/angular-translate/dist/angular-translate.js';
import 'nodeModules/angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.js';
import 'nodeModules/angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js';
import 'nodeModules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js';
import angular from 'angular';
import translateConfig from './translate.config';
import translateRun from './translate.run';
import './i18n/en.json';
import './i18n/es.json';

const translateModule = angular.module('translate', [
  'pascalprecht.translate'
])
  .config(['$translateProvider', translateConfig])
  .run(['$rootScope', '$translate', translateRun])
  .name;

export default translateModule;

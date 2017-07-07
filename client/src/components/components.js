import angular from 'angular';
import Dashboard from './dashboard';
import ErrorPages from './error-pages';
import UploadFile from './upload-file';

const components = angular.module('app.components', [
  Dashboard,
  ErrorPages,
  UploadFile
])
  .name;

export default components;

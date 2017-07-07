import angular from 'angular';

const stringLiterals = {
  APP_NAME: 'Base',
  HOME_PAGE: '',
};

const dateFormats = {
  DATE: 'MM/DD/YYYY',
  EN_DATE_TIME: 'MM/dd/yyyy \'at\' h:mm a'
};


const constantModule = angular.module('constant', [])
  .constant('DATE_FORMATS', dateFormats)
  .constant('STRING_LITERALS', stringLiterals)
  .name;

export default constantModule;

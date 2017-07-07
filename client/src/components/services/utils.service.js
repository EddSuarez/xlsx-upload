/*eslint-disable */
'use strict';

class UtilsService {
  constructor($rootScope, $state, toast) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.toast = toast;
    this.$state = $state;
  }
}

export default UtilsService;

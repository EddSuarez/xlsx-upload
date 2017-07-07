'use strict';

class DashboardController {
  constructor($rootScope, $scope, STRING_LITERALS) {
    'ngInject';

    this.language = $rootScope.language;
    $scope.stringLiterals = STRING_LITERALS;
  }

}

export default DashboardController;

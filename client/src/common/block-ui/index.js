import 'nodeModules/angular-block-ui/dist/angular-block-ui.min.js';
import 'nodeModules/angular-block-ui/dist/angular-block-ui.min.css';
import angular from 'angular';

const blockUIModule = angular.module('block-ui', ['blockUI'])
  .run(($rootScope, blockUIConfig, $translate) => {
    'ngInject';

    $rootScope.$on('$translateChangeSuccess', () => {
      blockUIConfig.message = $translate.instant('words.LOADING') + '...';
    });
  })
  .name;

export default blockUIModule;

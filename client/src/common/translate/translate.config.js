const translateConfig = ($translateProvider) => {
  'ngInject';

  $translateProvider.useStaticFilesLoader({
    prefix: '/i18n/', // taking files from "dist/"
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useLocalStorage();
  $translateProvider.usePostCompiling(true);
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
};

export default translateConfig;

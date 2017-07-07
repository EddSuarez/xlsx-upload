const translateRun = ($rootScope, $translate) => {
  'ngInject';

  // Internationalization
  // ----------------------
  $rootScope.language = {
    // Handles language dropdown
    listIsOpen: false,
    // list of available languages
    available: {
      en: 'English',
      es: 'Español'
    },
    // display always the current ui language
    init: () => {
      const proposedLanguage = $translate.proposedLanguage() || $translate.use();
      // we know we have set a preferred one in app.config
      const preferredLanguage = $translate.preferredLanguage();
      $rootScope.language.selected = $rootScope.language
        .available[(proposedLanguage || preferredLanguage)];
      $rootScope.language.selectedLocale = (proposedLanguage || preferredLanguage);
    },
    set: (localeId) => {
      // Set the new idiom
      $translate.use(localeId);
      $rootScope.language.selected = $rootScope.language.available[localeId];
      $rootScope.language.selectedLocale = localeId;
      $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
    }
  };

  $rootScope.language.init();
};

export default translateRun;

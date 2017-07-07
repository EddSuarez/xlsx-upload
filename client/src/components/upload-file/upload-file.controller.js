'use strict';

class UploadFileController {
  constructor($rootScope, $scope, STRING_LITERALS, $http, Upload) {
    'ngInject';

    this.language = $rootScope.language;
    $scope.stringLiterals = STRING_LITERALS;

    this.sheets = [];
    this.xlsx = null;

    this.getSheets = (file, errFiles) => {
      this.xlsx = file;
      this.errorFile = errFiles && errFiles[0];

      const upload = Upload.upload({
        url: '/api/upload/getSheets',
        data: { file: this.xlsx },
      });

      upload.then((response) => {
        this.sheets = response.data;
      }, (error) => {
        console.error(error);
      });
    };

    this.proccess = () => {
      const upload = Upload.upload({
        url: '/api/upload/proccessData/' + this.selectedSheet,
        data: { file: this.xlsx, table: this.selectedSheet }
      });

      upload.then((response) => {
        if (response.data.status) {
          $('#xlsxInput').val('');
          this.selectedSheet = false;
          this.proccessSuccess = response.data.message;
        } else {
          this.proccessErrors = response.data.validationErrors;
        }
      }, (error) => {
        console.error(error);
      });
    };
  }
}

export default UploadFileController;

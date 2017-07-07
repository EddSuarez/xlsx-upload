class ErrorPagesController {
  constructor($state) {
    'ngInject';

    this.$state = $state;
    this.setMessage(this.$state.params.code);
  }

  setMessage(code) {
    switch (code) {
      case '403':
        this.message = '403 - Forbidden';
        break;
      case '404':
        this.message = '404 - Not found';
        break;
      default:
        this.message = 'Invalid';
        break;
    }
  }
}

export default ErrorPagesController;

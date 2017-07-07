'use strict';

class ToastService {
  constructor(toastr) {
    'ngInject';

    this.toastr = toastr;
  }

  pop(type, message) {
    switch (type) {
      case 'success':
        this.toastr.success(message, type);
        break;
      case 'warning':
        this.toastr.warning(message, type);
        break;
      case 'error':
        this.toastr.error(message, type);
        break;
      default:
        this.toastr.info(message, type);
        break;
    }
  }
}

export default ToastService;

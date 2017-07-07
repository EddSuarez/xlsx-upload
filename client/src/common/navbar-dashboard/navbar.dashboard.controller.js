/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */
class NavbarDashbboardController {
  constructor($window, $rootScope) {
    'ngInject';

    this.window = $window;
    this.isCollapsed = true;

    this.upToTablet = this.window.matchMedia('(max-width: 767px)');
    this.upToTablet.addListener(this.widthChange);

    if (this.upToTablet.matches) {
      $('.aside-inner, .wrapper, body').addClass('aside-collapsed');
    }

    // Adjustment on route changes
    $rootScope.$on('$stateChangeStart', () => {
      $('body').removeClass('aside-toggled');

      if (this.upToTablet.matches) {
        $('.aside-inner, .wrapper, body').removeClass('aside-toggled');
        $('.aside-inner, .wrapper, body').addClass('aside-collapsed');
      } else {
        $('.aside-inner, .wrapper, body').removeClass('aside-collapsed');
      }
    });
  }

  loadImage(image) {
    const img = process.env.ASSETS_URL + '/images/' + image;
    return img;
  }

  toggleAside() {
    $('body').toggleClass('aside-toggled');
    this.widthChange(this.upToTablet);
  }

  widthChange(mediaQuery) {
    if (mediaQuery.matches) {
      // window width is less than 767px
      $('.aside-inner, .wrapper, body').addClass('aside-collapsed');
    } else {
      $('.aside-inner, .wrapper, body').toggleClass('aside-collapsed');
    }
  }
}

export default NavbarDashbboardController;

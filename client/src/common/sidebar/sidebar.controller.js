import angular from 'angular';

class sidebarController {
  constructor($element, $window, $location) {
    'ngInject';

    this.location = $location;
    this.html = angular.element('html');
    this.window = angular.element($window);
    this.body = angular.element('body');
    this.collapsed = {
      user: true,
      account: true
    };
    this.link($element, this.body);
  }

  isActive(path) {
    const option = path.substr(1, path.length);
    this.collapsed[option] = true;
    if (this.location.path().substr(0, path.length) === path) {
      this.collapsed[option] = false;
      return 'active';
    }
    return '';
  }


  link(element, body) {
    const $sidebar = element;
    let subNav = $();
    const ctrl = this; // allow to call this.toggleMenuItem()
    $sidebar.on('click', '.nav > li', (event) => {
      if (body.hasClass('aside-collapsed')) {
        subNav.trigger('mouseleave');
        subNav = ctrl.toggleMenuItem($(event.currentTarget), $sidebar);
        // Used to detect click and touch events outside
        // the sidebar
        const $backdrop = $('<div/>', { class: 'dropdown-backdrop' });
        $backdrop.insertAfter('.aside-inner');
      }
    });

    // close dropdown-backdrop if click outside
    $('.wrapper').bind('click', (event) => {
      if (!$(event.target).parents('.aside').length) {
        subNav.trigger('mouseleave');
      }
    });
  }

  toggleCollapse(option, isCollapsed) {
    if (isCollapsed === false) {
      for (let i = 0; i < this.collapsed.length; i++) {
        if (this.collapsed[i] !== option) {
          this.collapsed[i] = true;
        }
      }
    }
    this.collapsed[option] = isCollapsed;
  }

  toggleTouchItem($element) {
    $element
    .siblings('li')
    .removeClass('open')
    .end()
    .toggleClass('open');
  }

  toggleMenuItem($listItem, $sidebar) {
    this.removeFloatingNav();
    const ctrl = this;
    const ul = $listItem.children('ul');
    if (!ul.length) return $();
    if ($listItem.hasClass('open')) {
      ctrl.toggleTouchItem($listItem);
      return $();
    }
    const $aside = $('.aside');
    const $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    const mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
    const subNav = ul.clone().appendTo($aside);

    ctrl.toggleTouchItem($listItem);

    const itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    const vwHeight = this.window.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: 'fixed',
        top: itemTop,
        bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', () => {
      ctrl.toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }
}

export default sidebarController;

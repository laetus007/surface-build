(function (Drupal) {
  Drupal.surface = {};

  function isDesktopNav() {
    var navButtons = document.querySelector('[data-drupal-selector="mobile-nav"]');
    return navButtons ? window.getComputedStyle(navButtons).getPropertyValue('display') === 'none' : false;
  }

  Drupal.surface.isDesktopNav = isDesktopNav;

  window.addEventListener('load', function(event) {
    document.body.classList.remove('preload');
  });

})(Drupal);
button.getAttribute('aria-expanded') !== 'true';

    if (state) {
      if (isDesktopNav()) {
        secondLevelNavMenus.forEach(function (el) {
          el.querySelector(buttonSelector).setAttribute('aria-expanded', 'false');
          el.querySelector('[data-drupal-selector="menu-main--level-2"]').classList.remove('is-active-menu-parent');
          el.querySelector('[data-drupal-selector="menu-main--1"]').classList.remove('is-active-menu-parent');
        });
      }

      button.setAttribute('aria-expanded', 'true');
      topLevelMenuItem.querySelector('[data-drupal-selector="menu-main--level-2"]').classList.add('is-active-menu-parent');
      topLevelMenuItem.querySelector('[data-drupal-selector="menu-main--1"]').classList.add('is-active-menu-parent');
    } else {
      button.setAttribute('aria-expanded', 'false');
      topLevelMenuItem.classList.remove('is-touch-event');
      topLevelMenuItem.querySelector('[data-drupal-selector="menu-main--level-2"]').classList.remove('is-active-menu-parent');
      topLevelMenuItem.querySelector('[data-drupal-selector="menu-main--1"]').classList.remove('is-active-menu-parent');
    }
  }

  Drupal.surface.toggleSubNav = toggleSubNav;

  function handleBlur(e) {
    if (!Drupal.surface.isDesktopNav()) return;
    setTimeout(function () {
      var menuParentItem = e.target.closest('[data-drupal-selector="menu__item--has-children"]');

      if (!menuParentItem.contains(document.activeElement)) {
        toggleSubNav(menuParentItem, false);
      }
    }, 200);
  }

  secondLevelNavMenus.forEach(function (el) {
    var button = el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');
    button.removeAttribute('aria-hidden');
    button.removeAttribute('tabindex');

    el.addEventListener('touchstart', function () {
      el.classList.add('is-touch-event');
    }, {
      passive: true
    });

    el.addEventListener('mouseover', function () {
      if (isDesktopNav() && !el.classList.contains('is-touch-event')) {
        el.classList.add('is-active-mouseover-event');
        toggleSubNav(el, true);
        setTimeout(function () {
          el.classList.remove('is-active-mouseover-event');
        }, 500);
      }
    });

    button.addEventListener('click', function () {
      if (!el.classList.contains('is-active-mouseover-event')) {
        toggleSubNav(el);
      }
    });

    el.addEventListener('mouseout', function () {
      if (isDesktopNav() && !document.activeElement.matches('[aria-expanded="true"], .is-active-menu-parent *')) {
        toggleSubNav(el, false);
      }
    });

    el.addEventListener('blur', handleBlur, true);
  });

  function closeAllSubNav() {
    secondLevelNavMenus.forEach(function (el) {
      if (el.contains(document.activeElement)) {
        el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]').focus();
      }

      toggleSubNav(el, false);
    });
  }

  Drupal.surface.closeAllSubNav = closeAllSubNav;

  function areAnySubNavsOpen() {
    var subNavsAreOpen = false;
    secondLevelNavMenus.forEach(function (el) {
      var button = el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');
      var state = button.getAttribute('aria-expanded') === 'true';

      if (state) {
        subNavsAreOpen = true;
      }
    });

    return subNavsAreOpen;
  }

  Drupal.surface.areAnySubNavsOpen = areAnySubNavsOpen;
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (isDesktopNav()) closeAllSubNav();
    }
  });

  document.addEventListener('touchstart', function (e) {
    if (areAnySubNavsOpen() && !e.target.matches('[data-drupal-selector="header-nav"], [data-drupal-selector="header-nav"] *')) {
      closeAllSubNav();
    }
  }, {
    passive: true
  });
})(Drupal);

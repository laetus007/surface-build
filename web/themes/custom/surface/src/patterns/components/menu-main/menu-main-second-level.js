((Drupal) => {
  var isDesktopNav = Drupal.surface.isDesktopNav;
  var secondLevelNavMenus = document.querySelectorAll('[data-drupal-selector="menu-main__item--has-children"]');

  function toggleSubNav(topLevelMenuItem, toState) {
    var buttonSelector = '[data-drupal-selector="menu-toggle"]';
    var button = topLevelMenuItem.querySelector(buttonSelector);
    var state = toState !== undefined ? toState : button.getAttribute('aria-expanded') !== 'true';

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
      var menuParentItem = e.target.closest('[data-drupal-selector="menu-main__item--has-children"]');

      if (!menuParentItem.contains(document.activeElement)) {
        toggleSubNav(menuParentItem, false);
      }
    }, 200);
  }

  secondLevelNavMenus.forEach(function (el) {
    var button = el.querySelector('[data-drupal-selector="menu-toggle"]');
    button.removeAttribute('aria-hidden');
    button.removeAttribute('tabindex');

    el.addEventListener('mouseover', function () {
      if (isDesktopNav() && !el.classList.contains('is-touch-event')) {
        el.classList.add('is-active-mouseover-event');
        toggleSubNav(el, true);
      }
    });

    button.addEventListener('click', function () {
      if (!el.classList.contains('is-active-mouseover-event')) {
        if(this.ariaExpanded === 'true') {
          toggleSubNav(el);
        } else {
          closeAllSubNav();
          toggleSubNav(el);
        }
      }
    });

    el.addEventListener('mouseout', function () {
      if (isDesktopNav() && !document.activeElement.matches('[aria-expanded="true"], .is-active-menu-parent *')) {
        toggleSubNav(el, false);
        el.classList.remove('is-active-mouseover-event');
      }
    });

    el.addEventListener('blur', handleBlur, true);
  });

  function closeAllSubNav() {
    secondLevelNavMenus.forEach(function (el) {
      if (el.contains(document.activeElement)) {
        el.querySelector('[data-drupal-selector="menu-toggle"]').focus();
      }

      toggleSubNav(el, false);
    });
  }

  Drupal.surface.closeAllSubNav = closeAllSubNav;

  function areAnySubNavsOpen() {
    var subNavsAreOpen = false;
    secondLevelNavMenus.forEach(function (el) {
      var button = el.querySelector('[data-drupal-selector="menu-toggle"]');
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
})(Drupal);

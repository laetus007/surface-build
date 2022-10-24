(function (Drupal) {
  Drupal.theme.checkbox = function () {
    return '<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';
  };
})(Drupal);
(function (Drupal) {
  var isDesktopNav = Drupal.surface.isDesktopNav;
  var secondLevelNavMenus = document.querySelectorAll('[data-drupal-selector="menu__item--has-children"]');

  function toggleSubNav(topLevelMenuItem, toState) {
    var buttonSelector = '[data-drupal-selector="primary-nav-submenu-toggle-button"]';
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
(function (Drupal, once, tabbable) {
  function isNavOpen(navWrapper) {
    return navWrapper.classList.contains('is-active');
  }

  function toggleNav(props, state) {
    var value = !!state;
    props.navButton.setAttribute('aria-expanded', value);

    if (value) {
      props.body.classList.add('is-overlay-active');
      props.navWrapper.classList.add('is-active');
    } else {
      props.body.classList.remove('is-overlay-active');
      props.navWrapper.classList.remove('is-active');
    }
  }

  function init(props) {
    props.navButton.setAttribute('aria-controls', props.navWrapperId);
    props.navButton.setAttribute('aria-expanded', 'false');
    props.navButton.addEventListener('click', function () {
      toggleNav(props, !isNavOpen(props.navWrapper));
    });
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (props.surface.areAnySubNavsOpen()) {
          props.surface.closeAllSubNav();
        } else {
          toggleNav(props, false);
        }
      }
    });
    props.overlay.addEventListener('click', function () {
      toggleNav(props, false);
    });
    props.overlay.addEventListener('touchstart', function () {
      toggleNav(props, false);
    });
    props.header.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && isNavOpen(props.navWrapper)) {
        var tabbableNavElements = tabbable.tabbable(props.navWrapper);
        tabbableNavElements.unshift(props.navButton);
        var firstTabbableEl = tabbableNavElements[0];
        var lastTabbableEl = tabbableNavElements[tabbableNavElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstTabbableEl && !props.surface.isDesktopNav()) {
            lastTabbableEl.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastTabbableEl && !props.surface.isDesktopNav()) {
          firstTabbableEl.focus();
          e.preventDefault();
        }
      }
    });
    window.addEventListener('resize', function () {
      if (props.surface.isDesktopNav()) {
        toggleNav(props, false);
        props.body.classList.remove('is-overlay-active');
      }

      Drupal.surface.closeAllSubNav();
    });
    props.navWrapper.addEventListener('click', function (e) {
      if (e.target.matches("[href*=\"".concat(window.location.pathname, "#\"], [href*=\"").concat(window.location.pathname, "#\"] *, [href^=\"#\"], [href^=\"#\"] *"))) {
        toggleNav(props, false);
      }
    });
  }

  Drupal.behaviors.surfaceNavigation = {
    attach: function attach(context) {
      var headerId = 'header';
      var header = once('navigation', "#".concat(headerId), context).shift();
      var navWrapperId = 'header-nav';

      if (header) {
        var navWrapper = header.querySelector("#".concat(navWrapperId));
        var surface = Drupal.surface;
        var navButton = context.querySelector('[data-drupal-selector="mobile-nav__button"]');
        var body = context.querySelector('body');
        var overlay = context.querySelector('[data-drupal-selector="header-nav-overlay"]');
        init({
          surface: surface,
          header: header,
          navWrapperId: navWrapperId,
          navWrapper: navWrapper,
          navButton: navButton,
          body: body,
          overlay: overlay
        });
      }
    }
  };
})(Drupal, once, tabbable);
(function (Drupal) {
  Drupal.surface = {};

  function isDesktopNav() {
    var navButtons = document.querySelector('[data-drupal-selector="mobile-nav"]');
    return navButtons ? window.getComputedStyle(navButtons).getPropertyValue('display') === 'none' : false;
  }

  Drupal.surface.isDesktopNav = isDesktopNav;
  window.addEventListener('load', function (event) {
    document.body.classList.remove('preload');
  });
})(Drupal);
(function (Drupal) {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('messages__close')) {
      const message = e.target.parentNode.parentNode.parentNode;
      message.classList.add('hidden');
    }
  });

  Drupal.theme.message = function (_ref, _ref2) {
    var text = _ref.text;
    var type = _ref2.type;
    var id = _ref2.id;
    var messagesTypes = Drupal.Message.getMessageTypeLabels();
    var messageWrapper = document.createElement('div');
    messageWrapper.setAttribute('class', 'messages messages--'.concat(type));
    messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    messageWrapper.setAttribute('data-drupal-message-id', id);
    messageWrapper.setAttribute('data-drupal-message-type', type);
    messageWrapper.setAttribute('aria-label', messagesTypes[type]);
    messageWrapper.innerHTML = '\n   <div class="messages__container" data-drupal-selector="messages-container"> \n' + '<div class="messages__header">\n      <h2 class="visually-hidden">\n       ' + messagesTypes[type] + '</h2>\n      ' + '<div class="messages__icon"></div>\n   </div> \n  <div class="messages__content">' + text + '</div>' + '<div class="messages__button"><button type="button" class="messages__close"> <span class="visually-hidden">Close message</span>' + '</button></div></div>';
    return messageWrapper;
  };
})(Drupal);
!function (Drupal) {
  'use strict';

  Drupal.behaviors.messages = {
    attach: function attach(context) {
      const messages = context.querySelectorAll('.messages__close'); // Close messages

      messages.forEach(message => {
        message.addEventListener('click', e => {
          this.closeMessage(e);
        });
      });
    },

    closeMessage(e) {
      const message = e.target.parentNode.parentNode.parentNode;
      message.classList.add('hidden');
    }

  };
}(Drupal);
(function (Drupal) {
  var searchWide = document.querySelector('[data-drupal-selector="search-wide"]');
  var searchWideButton = document.querySelector('[data-drupal-selector="search-wide-button"]');
  var searchWideWrapper = document.querySelector('[data-drupal-selector="search-wide-wrapper"]');

  function searchIsVisible() {
    return searchWideWrapper.classList.contains('is-active');
  }

  Drupal.surface.searchIsVisible = searchIsVisible;

  function handleFocus() {
    if (searchIsVisible()) {
      searchWideWrapper.querySelector('input[type="search"]').focus();
    } else if (searchWideWrapper.contains(document.activeElement)) {
      searchWideButton.focus();
    }
  }

  function toggleSearchVisibility(visibility) {
    searchWideButton.setAttribute('aria-expanded', visibility === true);
    searchWideWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });

    if (visibility === true) {
      Drupal.surface.closeAllSubNav();
      searchWideWrapper.classList.add('is-active');
    } else {
      searchWideWrapper.classList.remove('is-active');
    }
  }

  Drupal.surface.toggleSearchVisibility = toggleSearchVisibility;
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleSearchVisibility(false);
    }
  });

  if (searchWideButton) {
    searchWideButton.addEventListener('click', function () {
      toggleSearchVisibility(!searchIsVisible());
    });
  }

  Drupal.behaviors.searchWide = {
    attach: function attach(context) {
      var searchWideButton = once('search-wide', '[data-drupal-selector="search-wide-button"]', context).shift();

      if (searchWideButton) {
        searchWideButton.setAttribute('aria-expanded', 'false');
      }
    }
  };

  if (searchWide) {
    searchWide.addEventListener('focusout', function (e) {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        toggleSearchVisibility(false);
      }
    });
  }
})(Drupal);
(function (Drupal, once) {
  function init(el) {
    var tabs = el.querySelector('.tabs');
    var expandedClass = 'is-expanded';
    var activeTab = tabs.querySelector('.is-active');

    function isTabsMobileLayout() {
      return tabs.querySelector('.tabs__trigger').clientHeight > 0;
    }

    function handleTriggerClick(e) {
      if (!tabs.classList.contains(expandedClass)) {
        e.currentTarget.setAttribute('aria-expanded', 'true');
        tabs.classList.add(expandedClass);
      } else {
        e.currentTarget.setAttribute('aria-expanded', 'false');
        tabs.classList.remove(expandedClass);
      }
    }

    if (isTabsMobileLayout() && !activeTab.matches('.tabs__tab:first-child')) {
      var newActiveTab = activeTab.cloneNode(true);
      var firstTab = tabs.querySelector('.tabs__tab:first-child');
      tabs.insertBefore(newActiveTab, firstTab);
      tabs.removeChild(activeTab);
    }

    tabs.querySelector('.tabs__trigger').addEventListener('click', handleTriggerClick);
  }

  Drupal.behaviors.primaryTabs = {
    attach: function attach(context) {
      once('surface-tabs', '[data-drupal-nav-primary-tabs]', context).forEach(init);
    }
  };
})(Drupal, once);
//# sourceMappingURL=all.js.map

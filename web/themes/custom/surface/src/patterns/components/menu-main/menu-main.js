(function (Drupal, tabbable) {
  function isNavOpen(navWrapper) {
    return navWrapper.classList.contains('is-active');
  }

  function toggleNav(props, state) {
    var value = !!state;
    props.navButton.setAttribute('aria-expanded', value);

    if (value) {
      props.navWrapper.classList.add('is-active');
    } else {
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
      var header = context.querySelector('[data-drupal-selector="site-header"]');
      var navWrapperId = 'header-nav';

      if (header) {
        var navWrapper = header.querySelector("#".concat(navWrapperId));
        var surface = Drupal.surface;
        var navButton = context.querySelector('[data-drupal-selector="mobile-nav__button"]');
        var body = context.querySelector('body');

        init({
          surface: surface,
          header: header,
          navWrapperId: navWrapperId,
          navWrapper: navWrapper,
          navButton: navButton,
          body: body,
        });
      }
    }
  };
})(Drupal, tabbable);

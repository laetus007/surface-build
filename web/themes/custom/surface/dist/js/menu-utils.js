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
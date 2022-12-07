(function (Drupal) {
  var searchButton = document.querySelector('[data-drupal-selector="search-button"]');
  var searchWide = document.querySelector('[data-drupal-selector="site-search"]');
  var searchWrapper = document.querySelector('[data-drupal-selector="site-search-wrapper"]');

  function searchIsVisible() {
    return searchWrapper.classList.contains('is-active');
  }

  Drupal.surface.searchIsVisible = searchIsVisible;

  function handleFocus() {
    if (searchIsVisible()) {
      searchWrapper.querySelector('input[type="search"]').focus();
    } else if (searchWrapper.contains(document.activeElement)) {
      searchButton.focus();
    }
  }

  function toggleSearchVisibility(visibility) {
    searchButton.setAttribute('aria-expanded', visibility === true);
    searchWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });

    if (visibility === true) {
      Drupal.surface.closeAllSubNav();
      searchWrapper.classList.add('is-active');
    } else {
      searchWrapper.classList.remove('is-active');
    }
  }

  Drupal.surface.toggleSearchVisibility = toggleSearchVisibility;
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleSearchVisibility(false);
    }
  });

  if(searchButton) {
    searchButton.addEventListener('click', function () {
      toggleSearchVisibility(!searchIsVisible());
    });
  }

  Drupal.behaviors.searchWide = {
    attach: function attach(context) {
      var searchButton = once('search-wide', '[data-drupal-selector="search-button"]', context).shift();

      if (searchButton) {
        searchButton.setAttribute('aria-expanded', 'false');
      }
    }
  };

  if(searchWide) {
    searchWide.addEventListener('focusout', function (e) {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        toggleSearchVisibility(false);
      }
    });
  }
})(Drupal);

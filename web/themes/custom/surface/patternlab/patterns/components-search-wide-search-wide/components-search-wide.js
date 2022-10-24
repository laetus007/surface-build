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

  if(searchWideButton) {
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

  if(searchWide) {
    searchWide.addEventListener('focusout', function (e) {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        toggleSearchVisibility(false);
      }
    });
  }
})(Drupal);

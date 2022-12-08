(function (Drupal) {
  let searchButton = document.querySelector('[data-drupal-selector="search-button"]');
  let searchWide = document.querySelector('[data-drupal-selector="site-search"]');
  let searchWrapper = document.querySelector('[data-drupal-selector="site-search-wrapper"]');

  function searchIsVisible() {
    return searchWrapper.classList.contains('is-active');
  }

  function handleFocus() {
    if (searchIsVisible()) {
      searchWrapper.querySelector('input[type="search"]').focus();
    }
  }

  function toggleSearch() {
    if (searchIsVisible()) {
      closeSearch();
    } else {
      openSearch();
    }
  }

  function openSearch() {
    searchButton.setAttribute('aria-expanded', 'true');
    searchWrapper.classList.add('is-active');
    searchWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });
  }

  function closeSearch() {
    searchButton.setAttribute('aria-expanded', 'false');
    searchWrapper.classList.remove('is-active');
    searchButton.focus();
  }

  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' || e.code === 'Escape') {
      closeSearch();
    }

    if (e.key === ' ' || e.code === 'Space') {
      openSearch();
    }

  });

  if(searchWide) {
    searchWide.addEventListener('focusout', function (e) {
      closeSearch();
    });
  }

  Drupal.behaviors.searchWide = {
    attach: function attach(context) {
      var searchButton = once('site-search', '[data-drupal-selector="search-button"]', context).shift();

      if(searchButton) {
        searchButton.addEventListener('mousedown', function () {
          toggleSearch();
        });
      }
    }
  };
})(Drupal);

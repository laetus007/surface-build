(function (Drupal) {
  const searchButton = document.querySelector('[data-drupal-selector="search-button"]');
  const searchContainer = document.querySelector('[data-drupal-selector="site-search"]');

  function searchIsVisible() {
    return searchContainer.classList.contains('is-active');
  }

  function handleFocus() {
    if (searchIsVisible()) {
      searchContainer.querySelector('input[type="search"]').focus();
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
    searchContainer.classList.add('is-active');
    searchContainer.addEventListener('transitionend', handleFocus, {
      once: true
    });
  }

  function closeSearch() {
    searchButton.setAttribute('aria-expanded', 'false');
    searchContainer.classList.remove('is-active');
    searchButton.focus();
  }

  if(searchContainer){
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape' || e.code === 'Escape') {
        closeSearch();
      }

      if (e.key === ' ' || e.code === 'Space') {
        openSearch();
      }
    });
  }

  if(searchContainer) {
    searchContainer.addEventListener('focusout', function (e) {
      closeSearch();
    });
  }

  Drupal.behaviors.search = {
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

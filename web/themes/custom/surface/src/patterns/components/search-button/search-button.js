((Drupal, once) => {
  const searchType = document.getElementsByTagName('body')[0].getAttribute('data-search');
  const searchButton = document.querySelector('[data-drupal-selector="search-button"]');
  const searchContainer = document.querySelector('[data-drupal-selector="site-search"]');
  const searchInput = searchContainer.querySelector('input[type="search"]');
  const searchClose = searchContainer.querySelector('[data-drupal-selector="search-close"]');

  Drupal.behaviors.surfaceSearch = {
    attach: function attach(context) {
      Drupal.surfaceSearch.init(context);
    },
  };

  Drupal.surfaceSearch = {
    init: function (context) {
      once('surfaceSearchInit', '[data-drupal-selector="site-search"]', context).forEach(() => {
        document.addEventListener('keyup', e => {
          if (Drupal.surfaceSearch.searchIsVisible() && e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            this.toggleSearch();
          }
        });
      });

      // Search toggle
      once('surfaceSearchToggle', '[data-drupal-selector="search-button"]', context).forEach(el => el.addEventListener('click', e => {
        e.preventDefault();
        this.toggleSearch();
      }));
    },

    searchIsVisible: () => {
      return searchContainer.classList.contains('is-active');
    },

    toggleSearch: () => {
      if (Drupal.surfaceSearch.searchIsVisible()) {
        Drupal.surfaceSearch.collapseSearch();
      } else {
        Drupal.surfaceSearch.showSearch();
      }
    },

    showSearch: () => {
      const searchButton = document.querySelector('[data-drupal-selector="search-button"]');
      const searchContainer = document.querySelector('[data-drupal-selector="site-search"]');

      searchButton.setAttribute('aria-expanded', 'true');
      searchContainer.classList.add('is-active');

      searchContainer.addEventListener('transitionend', Drupal.surfaceSearch.handleFocus, {
        once: true
      });
    },

    collapseSearch: () => {
      const searchButton = document.querySelector('[data-drupal-selector="search-button"]');
      const searchContainer = document.querySelector('[data-drupal-selector="site-search"]');

      searchButton.setAttribute('aria-expanded', 'false');
      searchContainer.classList.remove('is-active');
    },

    handleFocus: () => {
      const searchInput = searchContainer.querySelector('input[type="search"]');

      if (Drupal.surfaceSearch.searchIsVisible()) {
        searchInput.focus();
      }
    }
  };
})(Drupal, once);

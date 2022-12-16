(function (Drupal) {
  const searchType = document.getElementsByTagName('body')[0].getAttribute('data-search');
  const searchButton = document.querySelector('[data-drupal-selector="search-button"]');
  const searchContainer = document.querySelector('[data-drupal-selector="site-search"]');
  const searchInput = searchContainer.querySelector('input[type="search"]');

  function searchIsVisible() {
    return searchContainer.classList.contains('is-active');
  }

  function watchForClickOut(e) {
    let clickInSearchArea = e.target.classList.contains('form-element--type-search');
    if (!clickInSearchArea && searchIsVisible()) {
      toggleSearchVisibility(false);
    }
  }

  function watchForFocusOut(e) {
    if (e.relatedTarget) {
      let inSearchBar = e.relatedTarget.classList.contains('form-element--type-search');
      let inSearchButton = e.relatedTarget.classList.contains('search-block-form__submit');
      if (!inSearchBar && !inSearchButton) {
        toggleSearchVisibility(false);
      }
    }
  }

  function watchForEscapeOut(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleSearchVisibility(false);
    }
  }

  function handleFocus() {
    if (searchIsVisible()) {
      searchInput.focus();
    } else if (searchContainer.contains(document.activeElement)) {
      searchButton.focus();
    }
  }

  function toggleSearchVisibility(visibility) {
    searchButton.setAttribute('aria-expanded', visibility === true);
    searchContainer.addEventListener('transitionend', handleFocus, {
      once: true
    });

    if (visibility === true) {
      searchContainer.classList.add('is-active');
      document.addEventListener('click', watchForClickOut, {
        capture: true
      });
      document.addEventListener('focusout', watchForFocusOut, {
        capture: true
      });
      document.addEventListener('keyup', watchForEscapeOut, {
        capture: true
      });

      console.log(searchIsVisible());
    } else {
      searchContainer.classList.remove('is-active');
      document.removeEventListener('click', watchForClickOut, {
        capture: true
      });
      document.removeEventListener('focusout', watchForFocusOut, {
        capture: true
      });
      document.removeEventListener('keyup', watchForEscapeOut, {
        capture: true
      });

      console.log(searchIsVisible());
    }
  }

  Drupal.behaviors.search = {
    attach: function attach(context) {
      let searchButtonEl = once('search-button', searchButton, context).shift();

      if(searchButtonEl) {
        searchButtonEl.setAttribute('aria-expanded', searchIsVisible());
        searchButtonEl.addEventListener('click', function () {
          toggleSearchVisibility(!searchIsVisible());
        });
      }
    }
  };
})(Drupal);

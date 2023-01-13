'use strict';

((Drupal, once) => {
  const translateContainer = document.querySelector('[data-drupal-selector="gtranslate-container"]');

  Drupal.behaviors.surfaceTranslate = {
    attach: function attach(context) {
      Drupal.surfaceTranslate.init(context);
    },
  };

  Drupal.surfaceTranslate = {
    init: function (context) {
      once('surfaceTranslateInit', '[data-drupal-selector="gtranslate"]', context).forEach(() => {
        document.addEventListener('keyup', e => {
          if (Drupal.surfaceTranslate.translateIsVisible() && e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            this.toggleTranslate();
          }
        });
      });

      // Translate toggle
      once('surfaceTranslateToggle', '[data-drupal-selector="gtranslate-button"]', context).forEach(el => el.addEventListener('click', e => {
        e.preventDefault();
        this.toggleTranslate();
      }));
    },

    translateIsVisible: () => {
      return translateContainer.classList.contains('is-active');
    },

    toggleTranslate: () => {
      if (Drupal.surfaceTranslate.translateIsVisible()) {
        Drupal.surfaceTranslate.collapseTranslate();
      }
      else {
        Drupal.surfaceTranslate.showTranslate();
      }
    },

    showTranslate: () => {
      const translateButton = document.querySelector('[data-drupal-selector="gtranslate-button"]');
      const translateContainer = document.querySelector('[data-drupal-selector="gtranslate-container"]');

      translateButton.setAttribute('aria-expanded', 'true');
      translateContainer.classList.add('is-active');
    },

    collapseTranslate: () => {
      const translateButton = document.querySelector('[data-drupal-selector="gtranslate-button"]');
      const translateContainer = document.querySelector('[data-drupal-selector="gtranslate-container"]');

      translateButton.setAttribute('aria-expanded', 'false');
      translateContainer.classList.remove('is-active');
    }
  };
})(Drupal, once);

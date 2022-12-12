(function (Drupal) {
  const modal = document.querySelector('[data-drupal-selector="modal"]');
  const openModal = document.querySelector('[data-drupal-selector="open-button"]');
  const closeModal = document.querySelector('[data-drupal-selector="close-button"]');

  if(modal){
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape' || e.code === 'Escape') {
        modal.close();
      }

      if (e.key === ' ' || e.code === 'Space') {
        modal.showModal();
      }
    });
  }

  Drupal.behaviors.searchModal = {
    attach: function attach(context) {
      if(openModal) {
        openModal.addEventListener('click', () => {
          modal.showModal();
        });

        closeModal.addEventListener('click', () => {
          modal.close();
        });
      }
    }
  };
})(Drupal);

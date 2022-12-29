'use strict';

((Drupal) => {
  Drupal.behaviors.messages = {
    attach: function attach(context) {
      const messages = context.querySelectorAll('.messages__close');

      // Close messages
      messages.forEach((message) => {
        message.addEventListener('click', (e) => {
          this.closeMessage(e);
        });
      });
    },

    closeMessage(e) {
      const message = e.target.parentNode.parentNode.parentNode;
      message.classList.add('hidden');
    }
  };

})(Drupal);

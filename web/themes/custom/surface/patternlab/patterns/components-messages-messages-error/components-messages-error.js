!function (Drupal) {
  'use strict';

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
}(Drupal);
;

    messageWrapper.setAttribute('class', 'messages messages--'.concat(type));
    messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    messageWrapper.setAttribute('data-drupal-message-id', id);
    messageWrapper.setAttribute('data-drupal-message-type', type);
    messageWrapper.setAttribute('aria-label', messagesTypes[type]);

    messageWrapper.innerHTML = '\n   <div class="messages__container" data-drupal-selector="messages-container"> \n' +
            '<div class="messages__header">\n      <h2 class="visually-hidden">\n       ' + messagesTypes[type] + '</h2>\n      ' +
            '<div class="messages__icon"></div>\n   </div> \n  <div class="messages__content">' + text + '</div>' +
            '<div class="messages__button"><button type="button" class="messages__close"> <span class="visually-hidden">Close message</span>' +
            '</button></div></div>';

    return messageWrapper;
  };
})(Drupal);

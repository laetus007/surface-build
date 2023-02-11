'use strict';

((Drupal) => {
  document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('messages__close')) {
      const message = e.target.closest('.messages');
      message.classList.add('hidden');
    }
  });

  Drupal.theme.message = function (_ref, _ref2) {
    var text = _ref.text;
    var type = _ref2.type;
    var id = _ref2.id;
    var messagesTypes = Drupal.Message.getMessageTypeLabels();
    var messageWrapper = document.createElement('div');

    messageWrapper.setAttribute('class', 'fade messages messages--'.concat(type));
    messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    messageWrapper.setAttribute('data-drupal-message-id', id);
    messageWrapper.setAttribute('data-drupal-message-type', type);
    messageWrapper.setAttribute('aria-label', messagesTypes[type]);

    messageWrapper.innerHTML = '\n   <div class="messages__container" data-drupal-selector="messages-container"> \n' +
            '<div class="messages__header">\n      <h2 class="visually-hidden">\n       ' + messagesTypes[type] + '</h2>\n      ' +
            '<div class="messages__icon"></div>\n   </div> \n  <div class="messages__content">' + text + '</div>' +
            '<button type="button" class="messages__close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg> <span class="visually-hidden">Close message</span>' +
            '</button></div>';

    return messageWrapper;
  };
})(Drupal);

'use strict';

((Drupal) => {
  document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('messages__close')) {
      const message = e.target.parentNode.parentNode.parentNode;
      message.classList.add('hidden');
    }
  });

  Drupal.theme.message = function (_ref, _ref2) {
    var text = _ref.text;
    var type = _ref2.type;
    var id = _ref2.id;
    var messagesTypes = Drupal.Message.getMessageTypeLabels();
    var messageWrapper = document.createElement('div');

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

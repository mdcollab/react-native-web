'use strict';

exports.__esModule = true;
/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Alert
 * 
 */

var createContainer = function createContainer(options) {
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.backgroundColor = 'rgba(0,0,0,0.6)';
  container.onclick = function () {
    if (options && options.cancelable === false) {
      return;
    }
    if (options && options.onDismiss) {
      options.onDismiss();
    }
    container.remove();
  };
  return container;
};

var createMessageBox = function createMessageBox() {
  var box = document.createElement('div');
  box.style.width = '100%';
  box.style.margin = '15px';
  box.style.padding = '15px';
  box.style.backgroundColor = 'white';
  box.style.maxWidth = '300px';
  box.style.fontSize = '14px';
  // Clicking message box should not trigger onDismiss
  box.onclick = function (event) {
    return event.stopPropagation();
  };
  return box;
};

var createTitleDiv = function createTitleDiv(title) {
  var titleDiv = document.createElement('h2');
  titleDiv.textContent = title || '';
  titleDiv.style.marginTop = '0';
  titleDiv.style.fontSize = '20px';
  return titleDiv;
};

var createButtonsContainer = function createButtonsContainer() {
  var buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'space-between';
  buttonsContainer.style.alignItems = 'center';
  buttonsContainer.style.marginTop = '15px';
  return buttonsContainer;
};

var createButton = function createButton(button) {
  var buttonElement = document.createElement('button');
  buttonElement.textContent = button.text ? button.text : '';
  buttonElement.style.color = '#3897fe';
  buttonElement.style.backgroundColor = 'transparent';
  buttonElement.style.border = 'none';
  buttonElement.style.textTransform = 'uppercase';
  buttonElement.style.cursor = 'pointer';
  buttonElement.style.fontSize = '14px';
  buttonElement.style.fontWeight = '500';
  return buttonElement;
};

var alert = function alert(title, message) {
  var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [{ text: 'OK' }];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { cancelable: true };

  /**
   * Alert dialog is a plain DOM element instead of a React element.
   * It's not a React element because this is a static method.
   */
  var container = createContainer(options);
  var box = createMessageBox();
  var titleDiv = createTitleDiv(title);
  var messageDiv = document.createTextNode(message || '');
  var buttonsContainer = createButtonsContainer();
  var leftContainer = document.createElement('div');
  var rightContainer = document.createElement('div');

  container.appendChild(box);
  box.appendChild(titleDiv);
  box.appendChild(messageDiv);
  box.appendChild(buttonsContainer);
  buttonsContainer.appendChild(leftContainer);
  buttonsContainer.appendChild(rightContainer);

  buttons && buttons.forEach(function (button, index, array) {
    var isNeutralButton = array.length === 3 && index === 0;
    var buttonElement = createButton(button);
    buttonElement.onclick = function () {
      button.onPress && button.onPress();
      container.remove();
    };
    if (isNeutralButton) {
      leftContainer.appendChild(buttonElement);
    } else {
      rightContainer.appendChild(buttonElement);
    }
  });

  document.body && document.body.appendChild(container);
};

exports.default = { alert: alert };
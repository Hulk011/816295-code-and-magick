'use strict';

var PLAYER_SECOND_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PLAYER_COLOR_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var PLAYER_COLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var COUNT = 4;
var FIRST_NAME_PLAYER = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var FIREBALL_WRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;
var SYMBOL_MIN = 'Имя должно состоять минимум из 2-х символов';
var SYMBOL_MAX = 'Имя не должно превышать 25-ти символов';
var OBLIGATORY_FIELD = 'Обязательное поле';


var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createRandomWizards = function () {
  var wizards = [];

  for (var i = 0; i < COUNT; i++) {
    wizards.push({
      name: getRandomElement(PLAYER_SECOND_NAME) + ' ' + getRandomElement(FIRST_NAME_PLAYER),
      coatColor: getRandomElement(PLAYER_COLOR_COAT),
      eyesColor: getRandomElement(PLAYER_COLOR_EYES)
    });
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplateElement.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizardFragment = function (wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  return fragment;
};

var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = document.querySelector('.setup-close');
setupCloseElement.setAttribute('tabindex', 0);
var showOpenIconElement = document.querySelector('.setup-open-icon');
showOpenIconElement.setAttribute('tabindex', 0);
var setupUserNameElement = document.querySelector('.setup-user-name');
setupUserNameElement.setAttribute('minlength', 2);
var setupWizardFormElement = document.querySelector('.setup-wizard-form');
setupWizardFormElement.setAttribute('action', 'https://js.dump.academy/code-and-magick');
var setupSubmitElement = document.querySelector('.setup-submit');
setupSubmitElement.setAttribute('tabindex', 0);

var openPopup = function () {
  showSetupElement.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closePopup();
    }
  });
};

var closePopup = function () {
  showSetupElement.classList.add('hidden');
};

setupOpenElement.addEventListener('click', function () {
  openPopup();

  setupSubmitElement.addEventListener('click', function () {
    setupWizardFormElement.submit();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      setupWizardFormElement.submit();
    }
  });
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closePopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      openPopup();
    }
  });
});

setupUserNameElement.addEventListener('invalid', function () {
  if (setupUserNameElement.validity.tooShort) {
    setupUserNameElement.setCustomValidity(SYMBOL_MIN);
  } else if (setupUserNameElement.validity.tooLong) {
    setupUserNameElement.setCustomValidity(SYMBOL_MAX);
  } else if (setupUserNameElement.validity.valueMissing) {
    setupUserNameElement.setCustomValidity(OBLIGATORY_FIELD);
  } else {
    setupUserNameElement.setCustomValidity('');
  }
});

setupUserNameElement.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity(SYMBOL_MIN);
  } else {
    target.setCustomValidity('');
  }
});

var setupPlayerElement = document.querySelector('.setup-player');
var wizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
var wizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
var wizardFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');

var makeCounter = function (arr) {
  var i = 1;
  return function () {
    if (i === arr.length) {
      i = 0;
    }
    return arr[i++];
  };
};

var coatColorCounter = makeCounter(PLAYER_COLOR_COAT);
var eyesColorCounter = makeCounter(PLAYER_COLOR_EYES);
var fireballColorCounter = makeCounter(FIREBALL_WRAP);
var changeCoatColor = function () {
  wizardCoatElement.style.fill = coatColorCounter();
};
var changeEyesColor = function () {
  wizardEyesElement.style.fill = eyesColorCounter();
};
var changeFireballColor = function () {
  wizardFireballElement.style.backgroundColor = fireballColorCounter();
};

wizardCoatElement.addEventListener('click', changeCoatColor);
wizardEyesElement.addEventListener('click', changeEyesColor);
wizardFireballElement.addEventListener('click', changeFireballColor);

var showSetupElement = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var wizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = createRandomWizards();
var wizardFragment = createWizardFragment(wizards);

similarListElement.appendChild(wizardFragment);

openPopup();
showSetupElement.querySelector('.setup-similar').classList.remove('hidden');

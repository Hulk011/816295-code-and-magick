'use strict';

var PLAYER_SECOND_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PLAYER_COLOR_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var PLAYER_COLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var COUNT = 4;
var FIRST_NAME_PLAYER = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

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

var showSetupElement = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var wizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = createRandomWizards();
var wizardFragment = createWizardFragment(wizards);

similarListElement.appendChild(wizardFragment);

showSetupElement.classList.remove('hidden');
showSetupElement.querySelector('.setup-similar').classList.remove('hidden');



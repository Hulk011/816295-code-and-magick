'use strict';
var wizzard = {
  PLAYER_SECOND_NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  PlAYER_NAME_FIRST: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  PLAYER_COLOR_COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  PLAYER_COLOR_EYES: ['black', 'red', 'blue', 'yellow', 'green'],
  COUNT: 4
};

var showSetup = document.querySelector('.setup');
showSetup.classList.remove('hidden');
showSetup.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

var createRandomWizzard = function () {
  var wizzards = [];

  for (var i = 0; i < wizzard.COUNT; i++) {
    wizzards.push({
      name: getRandomElement(wizzard.PLAYER_SECOND_NAME + ' ' + getRandomElement(wizzard.PlAYER_FIRST_NAME)),
      coatColor: getRandomElement(wizzard.PLAYER_COLOR_COAT),
      eyesColor: getRandomElement(wizzard.PLAYER_COLOR_EYES)
    });
  }
  return wizzards;
};

var renderWizzard = function (wizzard) {
  var wizzardElement = similarWizardTemplate.cloneNode(true);

  wizzardElement.querySelector('.setup-similar-label').textContent = wizzard.name;
  wizzardElement.querySelector('.wizzard-coat').style.fill = wizzard.coatColor;
  wizzardElement.querySelector('.wizzard-eyes').style.fill = wizzard.eyesColor;

  return wizzardElement;
};

var createSimilarWizzard = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizzard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var openShowSetup = function () {
  var newWizzard = createRandomWizzard();
  createSimilarWizzard(newWizzard);
};

openShowSetup();

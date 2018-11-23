'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGTH = 270;
var CLOUD_WIDTH = 420;

var SHADOW_OFFSET = 10;
var SHADOW_X = CLOUD_X + SHADOW_OFFSET;
var SHADOW_Y = CLOUD_Y + SHADOW_OFFSET;

var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
var MESSAGE_CONGRATULATIONS = 'Ура, вы победили!';
var MESSAGE_X = 120;
var MESSAGE_Y = 40;
var MESSAGE_RESULT = 'Список результатов';

var HISTOGRAM_HEIGHT = 150;
var STEP_BETWEEN_COLUMN = 30;
var COLUMN_WIDTH = 40;
var COLUMN_COLOR_YOU = 'rgba(255, 0, 0, 1)';

var MAIN_PLAYER_NAME = 'Вы';


var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

var generateBarColor = function () {
  return 'rgba(0, 0, 255, ' + getRandom(0, 1) + ')';
};

var renderCloud = function (ctx) {
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var renderShadow = function (ctx) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var renderMessages = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(MESSAGE_CONGRATULATIONS, MESSAGE_X, MESSAGE_Y);
  ctx.fillText(MESSAGE_RESULT, MESSAGE_X, MESSAGE_Y + (SHADOW_OFFSET * 2));
};

var getMaxTime = function (times) {
  var maxTimes = 0;

  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTimes) {
      maxTimes = times[i];
    }
  }
  return maxTimes;
};

var renderGistagramm = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < names.length; i++) {
    var timeWhole = Math.round(times[i]);
    var height = HISTOGRAM_HEIGHT * times[i] / maxTime;
    var x = CLOUD_X + STEP_BETWEEN_COLUMN * 2 + (COLUMN_WIDTH + STEP_BETWEEN_COLUMN * 1.5) * i;
    var y = CLOUD_Y + STEP_BETWEEN_COLUMN + STEP_BETWEEN_COLUMN * 2 + (HISTOGRAM_HEIGHT - height);

    ctx.fillStyle = (names[i] === MAIN_PLAYER_NAME) ? COLUMN_COLOR_YOU : generateBarColor();
    ctx.fillRect(x, y + STEP_BETWEEN_COLUMN, COLUMN_WIDTH, height);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], x, CLOUD_Y + CLOUD_HEIGTH - STEP_BETWEEN_COLUMN);
    ctx.fillText(timeWhole, x, y);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderShadow(ctx);
  renderCloud(ctx);
  renderMessages(ctx);
  renderGistagramm(ctx, names, times);
};
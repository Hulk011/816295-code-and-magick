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
var MESSAGE_OFFSET = 20;
var HISTOGRAM_HEIGHT_MAX = 150;
var HISTOGRAM_OFFSET_X = 60;
var STEP_BETWEEN_COLUMN = 30;
var COLUMN_WIDTH = 40;
var COLUMN_COLOR_YOU = 'rgba(255, 0, 0, 1)';
var MAIN_PLAYER_NAME = 'Вы';
var BAR_NAME_Y = CLOUD_Y + CLOUD_HEIGTH - STEP_BETWEEN_COLUMN / 2;
var BAR_OFFSET_Y = 80;
var TIME_OFFSET_Y = 60;

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
  ctx.fillText(MESSAGE_RESULT, MESSAGE_X, MESSAGE_Y + MESSAGE_OFFSET);
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

var renderHistagramm = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  var time;
  var height;
  var heightDifference;
  var barY;
  var timeY;
  var x;

  for (var i = 0; i < names.length; i++) {
    time = Math.round(times[i]);
    height = times[i] / maxTime * HISTOGRAM_HEIGHT_MAX;
    heightDifference = HISTOGRAM_HEIGHT_MAX - height;

    barY = CLOUD_Y + heightDifference + BAR_OFFSET_Y;
    timeY = CLOUD_Y + heightDifference + TIME_OFFSET_Y;

    x = CLOUD_X + HISTOGRAM_OFFSET_X + i * (COLUMN_WIDTH + STEP_BETWEEN_COLUMN);

    ctx.fillStyle = names[i] === MAIN_PLAYER_NAME ? COLUMN_COLOR_YOU : generateBarColor();
    ctx.fillRect(x, barY, COLUMN_WIDTH, height);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], x, BAR_NAME_Y);
    ctx.fillText(time, x, timeY);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderShadow(ctx);
  renderCloud(ctx);
  renderMessages(ctx);
  renderHistagramm(ctx, names, times);
};

'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGTH = 270;
var CLOUD_WIDTH = 420;

var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
var MESSAGE_CONGRATULATIONS = 'Ура, вы победили!';
var MESSAGE_CONGRATULATIONS_SITE_X = 120;
var MESSAGE_CONGRATULATIONS_SITE_Y = 40;
var MESSAGE_RESULT = 'Список результатов';

var HISTOGRAM_HEIGHT = 150;
var STEP_BETWEEN_COLUMN = 30;
var COLUMN_WIDTH = 40;
var COLUMN_COLOR_YOU = 'rgba(255, 0, 0, 1)';


var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

var COLUMN_COLOR_OTHER = 'rgba(0, 0, 255, ' + getRandom(0, 1) + ')';

var offset = 10;

var renderCloud = function (ctx) {
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var renderShadow = function (ctx) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + offset, CLOUD_Y + offset, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var renderMessages = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(MESSAGE_CONGRATULATIONS, MESSAGE_CONGRATULATIONS_SITE_X, MESSAGE_CONGRATULATIONS_SITE_Y);
  ctx.fillText(MESSAGE_RESULT, MESSAGE_CONGRATULATIONS_SITE_X, MESSAGE_CONGRATULATIONS_SITE_Y + (offset * 2));
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

    var height = (HISTOGRAM_HEIGHT * times[i]) / maxTime;

    var x = CLOUD_X + STEP_BETWEEN_COLUMN * 2 + (COLUMN_WIDTH + 50) * i;
    var y = CLOUD_Y + STEP_BETWEEN_COLUMN + STEP_BETWEEN_COLUMN * 2 + (HISTOGRAM_HEIGHT - height);

    ctx.fillStyle = (names[i] === 'Вы') ? COLUMN_COLOR_YOU : COLUMN_COLOR_OTHER;
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

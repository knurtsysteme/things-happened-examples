var getColor = function(rating, weight) {
  var alpha = getOpacity(weight);
  var color = 'rgba(255,255,255,' + alpha + ');'
  switch (rating) {
  case 1:
    color = 'rgba(255,0,0,' + alpha + ');'
    break;
  case 2:
    color = 'rgba(255,65,0,' + alpha + ');'
    break;
  case 3:
    color = 'rgba(255,130,0,' + alpha + ');'
    break;
  case 4:
    color = 'rgba(255,195,0,' + alpha + ');'
    break;
  case 5:
    color = 'rgba(255,255,0,' + alpha + ');'
    break;
  case 6:
    color = 'rgba(210,255,0,' + alpha + ');'
    break;
  case 7:
    color = 'rgba(165,255,0,' + alpha + ');'
    break;
  case 8:
    color = 'rgba(120,255,0,' + alpha + ');'
    break;
  case 9:
    color = 'rgba(60,255,0,' + alpha + ');'
    break;
  case 10:
    color = 'rgba(0,255,0,' + alpha + ');'
    break;
  }
  return color;
};
var getOpacity = function(i) {
  return i / 10;
};
var ratings = 11;
var weights = 11;
while (ratings--) {
  var color = getColor(ratings);
  while (weights--) {
    var alpha = getColor(weights);
    console.info('.rating-' + ratings + '.weight-' + weights + ' {');
    console.info('background: ' + getColor(ratings, weights));
    console.info('}');
  }
  weights = 11;
};

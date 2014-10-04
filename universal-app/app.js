things.config.serviceurl = 'http://things-happened.org'
angular.module('myApp', [ 'thingsHappened', 'ipCookie' ]).controller('MyCtrl', [ 'ipCookie', '$scope', 'thingsDao', function(ipCookie, $scope, thingsDao) {
  var cookieOptions = {
    expires : 365
  };

  var setStaticText = function() {
    $scope.app = things.univ.app || {};
    $scope.app.title = $scope.app.title || things.univ._cn + ' ' + things.univ._state;
    $scope.app.date = $scope.app.date || 'date';
    $scope.app.login = $scope.app.login || 'login';
    $scope.app.logout = $scope.app.logout || 'logout';
    $scope.app.submit = $scope.app.submit || 'submit';
    $scope.app.showoutput = $scope.app.showoutput || 'show all ' + $scope.app.title;
    $scope.app.showinput = $scope.app.showinput || 'add ' + $scope.app.title;
    $scope.app.titlesecret = $scope.app.titlesecret || 'your secret';
    $scope.app.showtree = $scope.app.showtree || 'show tree';
  };

  var setInputs = function() {
    $scope.inputs = [];
    angular.forEach(things.univ.inputs, function(input) {
      input.type = input.type || 'text';
      input.placeholder = input.placeholder || '';
      input.pattern = input.pattern || '.*';
      $scope.thing[input.name] = input.value || '';
      $scope.inputs.push(input);
    });

  };

  var login = function() {
    ipCookie('secret', $scope.secret, cookieOptions);
    $scope.area = 'input';
  };

  var logout = function() {
    $scope.secret = null;
    ipCookie('secret', null, {
      expires : 365
    });
    $scope.area = 'login';
  };

  var showInput = function() {
    $scope.area = 'input';
  };

  var showOutput = function() {
    var query = things.query.select(things.univ._cn).got(things.univ._state);
    angular.forEach(things.univ.inputs, function(input) {
      query.whose(input.name).exists();
    });
    thingsDao.get(query).success(function(things) {
      $scope.things = things;
      $scope.area = 'output';
    });
  };

  var submit = function(thing) {
    things.config.secret = $scope.secret;
    if (things.univ.options.timeline && ipCookie('lastThing')) {
      thing._id = ipCookie('lastThing')._id;
    } else if (things.univ._id) {
      thing._id = things.univ._id;
    }
    var query = things.query.add(thing).to(things.univ._cn).being(things.univ._state);
    thingsDao.add(query).success(function(thing) {
      ipCookie('lastThing', thing, cookieOptions);
      $scope.lastThing = thing;
      $scope.showOutput();
    });
  };

  setStaticText();
  $scope.secret = ipCookie('secret');
  $scope.area = $scope.secret ? 'input' : 'login';
  $scope.things = [];
  $scope.thing = {};
  setInputs();
  $scope.login = login;
  $scope.logout = logout;
  $scope.showInput = showInput;
  $scope.showOutput = showOutput;
  $scope.submit = submit;
} ]);

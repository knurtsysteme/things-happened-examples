things.config.serviceurl = things.config.serviceurl || 'http://things-happened.org'
angular.module('myApp', [ 'thingsHappened', 'ipCookie' ]).controller('MyCtrl', [ 'ipCookie', '$scope', 'thingsDao', function(ipCookie, $scope, thingsDao) {
  var cookieOptions = {
    expires : 365
  };

  var setStaticText = function() {
    $scope.app = $scope.univ.app || {};
    $scope.app.title = $scope.app.title || $scope.univ._cn + ' ' + $scope.univ._state;
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
    angular.forEach($scope.univ.inputs, function(input) {
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
    things.config.secret = $scope.secret;
    var query = things.query.select($scope.univ._cn).got($scope.univ._state);
    angular.forEach($scope.univ.inputs, function(input) {
      if (!input.value) {
        query.whose(input.name).exists();
      }
    });
    thingsDao.get(query).success(function(things) {
      // set default value to things where default value not given
      angular.forEach(things, function(thing) {
        angular.forEach($scope.univ.inputs, function(input) {
          if (input.value && !thing[input.name]) {
            thing[input.name] = input.value;
          }
        });
      });
      $scope.things = things;
      $scope.area = 'output';
    });
  };

  var getCookieLastThingKey = function() {
    return 'lastThing_' + $scope.app.title.toLowerCase().replace(/[^a-z]/g, '');
  }

  var submit = function(thing) {
    things.config.secret = $scope.secret;
    if ($scope.univ.options.timeline && ipCookie(getCookieLastThingKey())) {
      thing._id = ipCookie(getCookieLastThingKey())._id;
    } else if ($scope.univ._id) {
      thing._id = $scope.univ._id;
    }
    var query = things.query.add(thing).to($scope.univ._cn).being($scope.univ._state);
    thingsDao.add(query).success(function(thing) {
      ipCookie(getCookieLastThingKey(), thing, cookieOptions);
      $scope.lastThing = thing;
      $scope.showOutput();
    });
  };

  var univChanged = function() {
    setStaticText();
    $scope.things = [];
    $scope.thing = {};
    setInputs();
    setInputs();
    showInput();
  };

  var refreshCookies = function() {
    if (ipCookie('secret')) {
      ipCookie('secret', ipCookie('secret'), cookieOptions);
    }
  };

  var appendCss = function() {
    if ($scope.univ.css) {
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", $scope.univ.css);
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  };

  $scope.univs = things.univs;
  $scope.univ = things.univs[0];
  setStaticText();
  $scope.secret = ipCookie('secret');
  refreshCookies();
  $scope.area = $scope.secret ? 'input' : 'login';
  $scope.things = [];
  $scope.thing = {};
  setInputs();
  $scope.login = login;
  $scope.logout = logout;
  $scope.showInput = showInput;
  $scope.showOutput = showOutput;
  $scope.submit = submit;
  appendCss();
  $scope.$watch('univ', univChanged);

} ]);

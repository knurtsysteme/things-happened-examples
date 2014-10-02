things.config.serviceurl = 'http://things-happened.org'
angular.module('myApp', [ 'thingsHappened', 'ipCookie' ]).controller('MyCtrl', [ 'ipCookie', '$scope', 'thingsDao', function(ipCookie, $scope, thingsDao) {
	$scope.secret = ipCookie('secret');
	$scope.area = $scope.secret ? 'input' : 'login';
	$scope.subjects = [];
	$scope.subject = {};
	$scope.app = things.simpleauth.app;
	// TODO set default values for app.title, app.login ...
	$scope.inputs = [];
	angular.forEach(things.simpleauth.inputs, function(input){
		input.type = input.type || 'text';
		input.placeholder = input.placeholder || '';
		input.pattern = input.pattern || '.*';
		$scope.subject[input.name] = input.value || '';
		$scope.inputs.push(input);
	});

	$scope.login = function() {
		ipCookie('secret', $scope.secret, { expires: 365 });
		things.config.secret = $scope.secret;
		$scope.area = 'input';
	};

	$scope.logout = function() {
		$scope.secret = null;
		ipCookie('secret', null, { expires: 365 });
		$scope.area = 'login';
	};

	$scope.showInput = function() {
		$scope.area = 'input';
	};

	$scope.showOutput = function() {
		var query = things.query.select(things.simpleauth._cn).got(things.simpleauth._state);
		angular.forEach(things.simpleauth.inputs, function(input){
			query.whose(input.name).exists();
		});
		thingsDao.get(query).success(function(subjects){
			$scope.subjects = subjects;
			$scope.area = 'output';
		});
	};

	$scope.submit = function(subject) {
		if(things.simpleauth._id) {
			subject._id = things.simpleauth._id;
		}
		var query = things.query.add(subject).to(things.simpleauth._cn).being(things.simpleauth._state);
		thingsDao.add(query).success($scope.showOutput);
	};
}]);

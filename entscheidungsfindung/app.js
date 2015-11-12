angular.module('myApp', []).controller('MyCtrl', [ '$scope', function($scope) {
  var entscheidungsfindung = {
    possibilities : [ {
      name : 'dem'
    }, {
      name : 'oder dem'
    } ],
    factors : [ {
      name : 'dies',
      weight : 5
    }, {
      name : 'und das',
      weight : 5
    } ]
  };

  var setRatings = function() {
    angular.forEach(entscheidungsfindung.factors, function(factor, i) {
      if (!factor.ratings) {
        factor.ratings = [];
      }
      angular.forEach(entscheidungsfindung.possibilities, function(possibility, i) {

      });
      var i = 0;
      while (entscheidungsfindung.possibilities.length - i) {
        if (!factor.ratings[i]) {
          factor.ratings.push({
            value : 5
          });
        }
        i++;
      }
    });
  };

  $scope.total = function(column) {
    var result = 0;
    angular.forEach($scope.entscheidungsfindung.factors, function(factor) {
      result += factor.ratings[column].value * factor.weight;
    });
    return result;
  };

  $scope.addFactor = function() {
    $scope.entscheidungsfindung.factors.push({
      name : 'und das',
      weight : 5
    });
    setRatings();
  };

  $scope.addPossibility = function() {
    $scope.entscheidungsfindung.possibilities.push({
      name : 'oder dem'
    });
    setRatings();
  };

  $scope.deletePossibility = function(column) {
    $scope.entscheidungsfindung.possibilities.splice(column, 1);
    angular.forEach($scope.entscheidungsfindung.factors, function(factor) {
      factor.ratings.splice(column, 1);
    });
    setRatings();
  };

  $scope.deleteFactor = function(row) {
    $scope.entscheidungsfindung.factors.splice(row, 1);
    setRatings();
  };

  $scope.entscheidungsfindung = entscheidungsfindung;
  setRatings();

} ]);

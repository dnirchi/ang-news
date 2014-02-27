'use strict';

app.controller('AuthCtrl', function($scope, $location, User, Auth) {

    if (Auth.signedIn()) {
        $location.path('/');
    }

    $scope.$on('$firebaseSimpleLogin:login', function () {
        $location.path('/');
    });

    $scope.login = function () {
        Auth.login($scope.user).then(function () {
            $location.path('/');
        }, function(error) {
           $scope.error = error.toString();
        });
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function(authUser) {
         //console.log('LOG: auth object contains ', JSON.stringify(authUser));
          User.create(authUser, $scope.user.username)
          $location.path('/');
      }, function(error) {
          $scope.error = error.toString();
      });
    };
});
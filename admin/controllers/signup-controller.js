/**
 * Created by phuoclam on 31/12/2016.
 */
angular.module('signupController', ['authServices'])
    .controller('signupCtr', function ($scope, Auth) {
        $scope.createUser = function () {
            Auth.singup($scope.newUser);
        }
    });
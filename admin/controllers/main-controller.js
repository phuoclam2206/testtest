/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('mainController', ['authServices'])
    .controller('mainCtr', function (Auth, $scope, $location) {
        $scope.logout = function () {
            Auth.logout();
            $location.path('/dashboard/login');
        };
    });
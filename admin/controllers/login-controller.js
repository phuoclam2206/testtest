/**
 * Created by phuoclam on 03/01/2017.
 */

angular.module('loginController', ['authServices'])
    .controller('loginCtr', function (Auth, $scope, $location) {
        if (Auth.isLoggedId()) {
            $location.path("/dashboard/japan-study-board")
        } else {
            $scope.submitLogin = function () {
                Auth.login($scope.login).then(function (response) {
                    if (response != null && response.data != null && response.data.success) {
                        $location.path("/dashboard/japan-study-board")
                    } else {
                        $scope.login = {};
                    }
                });

            };
        }
    });

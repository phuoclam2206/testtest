/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('contactController', [])
    .controller('contactCtr', function ($scope, Contact, $location) {
        $scope.sendMail = function (mail) {
            Contact.sendMail(mail).then(function (response) {
                $location.path("/");
            });
        }
    });
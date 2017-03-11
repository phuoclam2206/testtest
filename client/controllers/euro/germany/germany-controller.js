/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('germanyController',[])
    .controller('germanyCtr', function () {

    })
    .controller('germanyDetailCtr', function ($scope, $stateParams) {
        console.log($stateParams.id);
        $scope.id = $stateParams.id;
    });
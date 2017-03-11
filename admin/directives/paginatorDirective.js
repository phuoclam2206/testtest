/**
 * Created by phuoclam on 08/01/2017.
 */
angular.module('paginationDirective', [])
    .directive('pagination', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl:'admin/view/pagination.html',
            link: function (scope, element, attrs) {
            }

        }
    });
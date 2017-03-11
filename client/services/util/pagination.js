/**
 * Created by phuoclam on 08/01/2017.
 */

angular.module('paginationUtil', [])
    .factory('Pagination', function () {
        var paginationFactory = {};

        //Pagination.page()
        paginationFactory.page = function (limit, offset, total) {
            var totalPage = (total % limit) != 0 ? (total / limit) + 1 : (total / limit);

            var currentPage = (offset % limit) != 0 ? (offset / limit) + 1 : (offset / limit);

            return {
                totalPage: totalPage,
                currentPage: currentPage
            }
        };

        return paginationFactory;
    });
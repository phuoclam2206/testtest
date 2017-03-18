/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('australiaServices', [])
    .factory('AuPost', function ($http) {
        var auPostFactory = {};

        // AuPost.fetch
        auPostFactory.fetch = function (limit, page) {
            return $http.get('/api/euro/australia?limit=' + limit + '&page=' + page);
        };

        // AuPost.fetchDetail
        auPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/australia/detail/' + id);
        };

        return auPostFactory;
    });
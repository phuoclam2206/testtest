/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('germanyServices', [])
    .factory('GrPost', function ($http) {
        var jpPostFactory = {};

        // GrPost.fetch
        jpPostFactory.fetch = function (limit, page) {
            return $http.get('/api/euro/germany?limit=' + limit + '&page=' + page);
        };

        // GrPost.fetchDetail
        jpPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/germany/detail/' + id);
        };

        return jpPostFactory;
    });
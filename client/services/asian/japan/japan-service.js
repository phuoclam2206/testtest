/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('japanServices', [])
    .factory('JpPost', function ($http) {
        var jpPostFactory = {};

        // JpPost.fetch
        jpPostFactory.fetch = function (limit, page) {
            return $http.get('/api/asian/japan?limit=' + limit + '&page=' + page);
        };

        // JpPost.fetchDetail
        jpPostFactory.fetchDetail = function (id) {
            return $http.get('/api/asian/japan/detail/' + id);
        };

        return jpPostFactory;
    });
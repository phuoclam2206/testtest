/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('canadaServices', [])
    .factory('CaPost', function ($http) {
        var caPostFactory = {};

        // CaPost.fetch
        caPostFactory.fetch = function (limit, page) {
            return $http.get('/api/euro/canada?limit=' + limit + '&page=' + page);
        };

        // CaPost.fetchDetail
        caPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/canada/detail/' + id);
        };

        return caPostFactory;
    });
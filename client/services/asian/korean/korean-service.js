/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('koreanServices', [])
    .factory('KrPost', function ($http) {
        var krPostFactory = {};

        // KrPost.fetch
        krPostFactory.fetch = function (limit, page) {
            return $http.get('/api/asian/korean?limit=' + limit + '&page=' + page);
        };

        // KrPost.fetchDetail
        krPostFactory.fetchDetail = function (id) {
            return $http.get('/api/asian/korean/detail/' + id);
        };

        return krPostFactory;
    });
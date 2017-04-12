/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('canadaServices', [])
    .factory('CaPost', function ($http) {
        var caPostFactory = {};

        // CaPost.fetch
        caPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/euro/canada?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // CaPost.fetchDetail
        caPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/canada/detail/' + id);
        };

        // CaPost.fetchMostView
        caPostFactory.fetchMostView = function () {
            return $http.get('/api/euro/canada/fetch_most_view');
        };

        // CaPost.fetchCorrelative
        caPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/euro/canada/fetch_correlative?tag=' + tagName);
        };

        return caPostFactory;
    });
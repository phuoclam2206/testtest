/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('japanServices', [])
    .factory('JpPost', function ($http) {
        var jpPostFactory = {};

        // JpPost.fetch
        jpPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/asian/japan?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // JpPost.fetchDetail
        jpPostFactory.fetchDetail = function (id) {
            return $http.get('/api/asian/japan/detail/' + id);
        };

        // JpPost.fetchMostView
        jpPostFactory.fetchMostView = function () {
            return $http.get('/api/asian/japan/fetch_most_view');
        };

        // JpPost.fetchCorrelative
        jpPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/asian/japan/fetch_correlative?tag=' + tagName);
        };

        return jpPostFactory;
    });
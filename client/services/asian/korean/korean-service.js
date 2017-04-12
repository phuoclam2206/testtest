/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('koreanServices', [])
    .factory('KrPost', function ($http) {
        var krPostFactory = {};

        // KrPost.fetch
        krPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/asian/korean?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // KrPost.fetchDetail
        krPostFactory.fetchDetail = function (id) {
            return $http.get('/api/asian/korean/detail/' + id);
        };

        // KrPost.fetchMostView
        krPostFactory.fetchMostView = function () {
            return $http.get('/api/asian/korean/fetch_most_view');
        };

        // KrPost.fetchCorrelative
        krPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/asian/korean/fetch_correlative?tag=' + tagName);
        };

        return krPostFactory;
    });
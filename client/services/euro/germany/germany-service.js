/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('germanyServices', [])
    .factory('GrPost', function ($http) {
        var grPostFactory = {};

        // GrPost.fetch
        grPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/euro/germany?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // GrPost.fetchDetail
        grPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/germany/detail/' + id);
        };

        // JpPost.fetchMostView
        grPostFactory.fetchMostView = function () {
            return $http.get('/api/euro/germany/fetch_most_view');
        };

        // JpPost.fetchCorrelative
        grPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/euro/germany/fetch_correlative?tag=' + tagName);
        };

        return grPostFactory;
    });
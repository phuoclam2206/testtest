/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('australiaServices', [])
    .factory('AuPost', function ($http) {
        var auPostFactory = {};

        // AuPost.fetch
        auPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/euro/australia?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // AuPost.fetchDetail
        auPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/australia/detail/' + id);
        };

        // AuPost.fetchMostView
        auPostFactory.fetchMostView = function () {
            return $http.get('/api/euro/australia/fetch_most_view');
        };

        // AuPost.fetchCorrelative
        auPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/euro/australia/fetch_correlative?tag=' + tagName);
        };

        return auPostFactory;
    });
/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('americanServices', [])
    .factory('ArPost', function ($http) {
        var arPostFactory = {};

        // ArPost.fetch
        arPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/euro/american?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // ArPost.fetchDetail
        arPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/american/detail/' + id);
        };

        // ArPost.fetchMostView
        arPostFactory.fetchMostView = function () {
            return $http.get('/api/euro/american/fetch_most_view');
        };

        // ArPost.fetchCorrelative
        arPostFactory.fetchCorrelative = function (tagName) {
            return $http.get('/api/euro/american/fetch_correlative?tag=' + tagName);
        };

        return arPostFactory;
    });
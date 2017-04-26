/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('newsServices', [])
    .factory('NewsPost', function ($http) {
        var newsPostFactory = {};

        // NewsPost.fetch
        newsPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/news?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // NewsPost.fetchDetail
        newsPostFactory.fetchDetail = function (id) {
            return $http.get('/api/news/detail/' + id);
        };

        // NewsPost.fetchMostView
        newsPostFactory.fetchMostView = function () {
            return $http.get('/api/news/fetch_most_view');
        };

        return newsPostFactory;
    });
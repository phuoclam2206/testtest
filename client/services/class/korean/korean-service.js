/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('classKoreanServices', [])
    .factory('CkPost', function ($http) {
        var ckPostFactory = {};

        // CkPost.fetch
        ckPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/class/korean?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // CkPost.fetchDetail
        ckPostFactory.fetchDetail = function (id) {
            return $http.get('/api/class/korean/detail/' + id);
        };

        // CkPost.fetchMostView
        ckPostFactory.fetchMostView = function () {
            return $http.get('/api/class/korean/fetch_most_view');
        };

        return ckPostFactory;
    });
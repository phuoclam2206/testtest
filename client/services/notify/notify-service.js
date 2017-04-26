/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('notifyServices', [])
    .factory('NotifyPost', function ($http) {
        var notifyPostFactory = {};

        // NotifyPost.fetch
        notifyPostFactory.fetch = function (limit, page, tag) {
            return $http.get('/api/notify?limit=' + limit + '&page=' + page + '&tag=' + tag);
        };

        // NotifyPost.fetchDetail
        notifyPostFactory.fetchDetail = function (id) {
            return $http.get('/api/notify/detail/' + id);
        };

        // NotifyPost.fetchMostView
        notifyPostFactory.fetchMostView = function () {
            return $http.get('/api/notify/fetch_most_view');
        };

        return notifyPostFactory;
    });
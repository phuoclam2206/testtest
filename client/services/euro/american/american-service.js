/**
 * Created by phuoclam on 07/03/2017.
 */
angular.module('americanServices', [])
    .factory('ArPost', function ($http) {
        var arPostFactory = {};

        // ArPost.fetch
        arPostFactory.fetch = function (limit, page) {
            return $http.get('/api/euro/american?limit=' + limit + '&page=' + page);
        };

        // ArPost.fetchDetail
        arPostFactory.fetchDetail = function (id) {
            return $http.get('/api/euro/american/detail/' + id);
        };

        return arPostFactory;
    });
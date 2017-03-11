angular.module('japanServices', [])
    .factory('JpPost', function ($http) {
        var jpPostFactory = {};
        var post = {};

        // JpPost.create
        jpPostFactory.create = function (post) {
            return $http.post('/api/dashboard/japan-study-aboard/create', post).then(function (response) {
                return response;
            });
        };

        // JpPost.fetch
        jpPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/japan-study-aboard?limit=' + limit + '&page=' + page);
        };

        // JpPost.delete
        jpPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/japan-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // JpPost.update
        jpPostFactory.update = function (post) {
            return $http.post('/api/dashboard/japan-study-aboard/update', post).then(function (response) {
                console.log(response);
                return response;
            });
        };

        //JpPost.setPost
        jpPostFactory.setPost = function (data) {
            post = data;
        };

        //JpPost.getPost
        jpPostFactory.getPost = function () {
           return post;
        };

        return jpPostFactory;
    });
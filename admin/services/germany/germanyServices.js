angular.module('germanyServices', [])
    .factory('GrPost', function ($http) {
        var grPostFactory = {};
        var post = {};

        grPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/germany-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        // GrPost.fetch
        grPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/germany-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // GrPost.delete
        grPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/germany-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // GrPost.update
        grPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/germany-study-aboard/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //GrPost.setPost
        grPostFactory.setPost = function (data) {
            post = data;
        };

        //GrPost.getPost
        grPostFactory.getPost = function () {
           return post;
        };

        return grPostFactory;
    });
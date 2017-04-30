angular.module('japanServices', [])
    .factory('JpPost', function ($http) {
        var jpPostFactory = {};
        var post = {};

        jpPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/japan-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // JpPost.fetch
        jpPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/japan-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // JpPost.delete
        jpPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/japan-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // JpPost.update
        jpPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/japan-study-aboard/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
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
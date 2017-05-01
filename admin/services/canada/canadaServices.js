angular.module('canadaServices', [])
    .factory('CaPost', function ($http) {
        var caPostFactory = {};
        var post = {};

        caPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/canada-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        // CaPost.fetch
        caPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/canada-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // CaPost.delete
        caPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/canada-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // CaPost.update
        caPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/canada-study-aboard/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //CaPost.setPost
        caPostFactory.setPost = function (data) {
            post = data;
        };

        //CaPost.getPost
        caPostFactory.getPost = function () {
           return post;
        };

        return caPostFactory;
    });
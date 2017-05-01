angular.module('australiaServices', [])
    .factory('AuPost', function ($http) {
        var auPostFactory = {};
        var post = {};

        auPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/australia-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        // AuPost.fetch
        auPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/australia-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // AuPost.delete
        auPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/australia-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // AuPost.update
        auPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/australia-study-aboard/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //AuPost.setPost
        auPostFactory.setPost = function (data) {
            post = data;
        };

        //AuPost.getPost
        auPostFactory.getPost = function () {
           return post;
        };

        return auPostFactory;
    });
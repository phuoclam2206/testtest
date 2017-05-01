angular.module('koreanServices', [])
    .factory('KrPost', function ($http) {
        var krPostFactory = {};
        var post = {};

        krPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/korean-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // KrPost.fetch
        krPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/korean-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // KrPost.delete
        krPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/korean-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // KrPost.update
        krPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/korean-study-aboard/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //KrPost.setPost
        krPostFactory.setPost = function (data) {
            post = data;
        };

        //KrPost.getPost
        krPostFactory.getPost = function () {
            return post;
        };

        return krPostFactory;
    });
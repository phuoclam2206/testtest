angular.module('newsServices', [])
    .factory('NewsPost', function ($http) {
        var newsPostFactory = {};
        var post = {};

        newsPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/news/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // NewsPost.fetch
        newsPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/news?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // NewsPost.delete
        newsPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/news/delete/' + id).then(function (response) {
                return response;
            })
        };

        // NewsPost.update
        newsPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/news/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //NewsPost.setPost
        newsPostFactory.setPost = function (data) {
            post = data;
        };

        //NewsPost.getPost
        newsPostFactory.getPost = function () {
            return post;
        };

        return newsPostFactory;
    });
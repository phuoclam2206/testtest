angular.module('notifyServices', [])
    .factory('NotifyPost', function ($http) {
        var notifyPostFactory = {};
        var post = {};

        notifyPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/notify/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // NotifyPost.fetch
        notifyPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/notify?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // NotifyPost.delete
        notifyPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/notify/delete/' + id).then(function (response) {
                return response;
            })
        };

        // NotifyPost.update
        notifyPostFactory.update = function (post) {
            return $http.post('/api/dashboard/notify/update', post).then(function (response) {
                console.log(response);
                return response;
            });
        };

        //NotifyPost.setPost
        notifyPostFactory.setPost = function (data) {
            post = data;
        };

        //NotifyPost.getPost
        notifyPostFactory.getPost = function () {
            return post;
        };

        return notifyPostFactory;
    });
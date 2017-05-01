angular.module('classKoreanServices', [])
    .factory('CkPost', function ($http) {
        var ckPostFactory = {};
        var post = {};

        ckPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/class/korean/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // CkPost.fetch
        ckPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/class/korean?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // CkPost.delete
        ckPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/class/korean/delete/' + id).then(function (response) {
                return response;
            })
        };

        // CkPost.update
        ckPostFactory.update = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            return $http.post('/api/dashboard/class/korean/update', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                return response;
            });
        };

        //CkPost.setPost
        ckPostFactory.setPost = function (data) {
            post = data;
        };

        //CkPost.getPost
        ckPostFactory.getPost = function () {
            return post;
        };

        return ckPostFactory;
    });
angular.module('americanServices', [])
    .factory('ArPost', function ($http) {
        var arPostFactory = {};
        var post = {};

        arPostFactory.create = function (post, file) {
            var formData = new FormData();
            angular.forEach(post, function (value, key) {
                formData.append(key, value);
            });
            formData.append('image', file);

            console.log(formData);
            return $http.post('/api/dashboard/american-study-aboard/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {
                console.log(response);
                return response;
            });
        };

        // ArPost.fetch
        arPostFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/american-study-aboard?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // ArPost.delete
        arPostFactory.delete = function (id) {
            return $http.post('/api/dashboard/american-study-aboard/delete/' + id).then(function (response) {
                return response;
            })
        };

        // ArPost.update
        arPostFactory.update = function (post) {
            return $http.post('/api/dashboard/american-study-aboard/update', post).then(function (response) {
                console.log(response);
                return response;
            });
        };

        //ArPost.setPost
        arPostFactory.setPost = function (data) {
            post = data;
        };

        //ArPost.getPost
        arPostFactory.getPost = function () {
           return post;
        };

        return arPostFactory;
    });
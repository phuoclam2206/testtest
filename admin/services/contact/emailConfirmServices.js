angular.module('contactServices', [])
    .factory('Contact', function ($http) {
        var contactFactory = {};
        var post = {};

        // Contact.fetch
        contactFactory.fetch = function (limit, page) {
            return $http.get('/api/dashboard/contact/email/fetch?limit=' + limit + '&page=' + page + '&sortBy=_id');
        };

        // Contact.fetchDetail
        contactFactory.fetchDetail = function (id) {
            return $http.get('/api/dashboard/contact/email/fetch/' + id);
        };

        // Contact.delete
        contactFactory.delete = function (id) {
            return $http.post('/api/dashboard/contact/email/delete/' + id).then(function (response) {
                return response;
            })
        };

        // Contact.reply
        contactFactory.reply = function (id, email) {
            return $http.post('/api/dashboard/contact/email/reply/' + id, email).then(function (response) {
                return response;
            })
        };

        // Contact.fetchConfig
        contactFactory.fetchConfig = function () {
            return $http.get('/api/dashboard/contact/email/config');
        };

        // Contact.updateConfig
        contactFactory.updateConfig = function (post) {
            return $http.post('/api/dashboard/contact/email/config', post).then(function (response) {
                console.log(response);
                return response;
            });
        };

        //Contact.setPost
        contactFactory.setPost = function (data) {
            post = data;
        };

        //Contact.getPost
        contactFactory.getPost = function () {
            return post;
        };

        return contactFactory;
    });
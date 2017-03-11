/**
 * Created by phuoclam on 03/01/2017.
 */

angular.module('authServices', [])
    .factory('Auth', function ($http, $window, $q, AuthToken) {
        var authFactory = {};

        // Auth.signup
        authFactory.singup = function (signupData) {
            return $http.post('api/dashboard/user/signup', signupData).then(function (err, response) {
                if (err) throw err;
                return response;
            });
        };

        // Auth.login
        authFactory.login = function (loginData) {
            return $http.post('/api/dashboard/user/login', loginData).then(function (response) {
                AuthToken.setToken(response.data.token);
                return response;
            });
        };

        // Auth.isLoggedId
        authFactory.isLoggedId = function () {
            return AuthToken.getToken() ? true : false;
        };

        // Auth.logout()
        authFactory.logout = function () {
            AuthToken.setToken();
        };
        
        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get('/api/tova')
            } else {
                $q.reject({message: 'User no has token'});
            }
        };

        return authFactory;
    })
    .factory('AuthToken', function ($window) {
        var authTokenFactory = {};

        // AuthToken.setToken
        authTokenFactory.setToken = function (token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }

        };

        // AuthToken.getToken
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })
    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();

            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        };

        return authInterceptorsFactory;
    });
/**
 * Created by phuoclam on 03/01/2017.
 */

angular.module('tovaApp', [
    'appRoutes',
    'signupController',
    'loginController',
    'authServices',
    'mainController',
    'emailConfirmController',
    'ui.tinymce',
    'paginationUtil',
    'paginationDirective',
    'tinymceOptionService',
    'fileDirective',
    'japanStudyAboardController',
    'koreanStudyAboardController',
    'germanyStudyAboardController',
    'japanServices',
    'koreanServices',
    'germanyServices',

    ])
    .constant('_', window._)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })
    .run(function (Auth, $location, $rootScope) {
        // $rootScope.$on('$stateChangeStart', function(event) {
        //     if (!Auth.isLoggedId()) {
        //         event.preventDefault();
        //         $location.path('/dashboard/login');
        //     }
        // })
    });
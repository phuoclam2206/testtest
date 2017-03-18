/**
 * Created by phuoclam on 31/12/2016.
 */
angular.module("appRoutes", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard/japan-study-board');
        $stateProvider
            .state('signUp', {
                url: '/dashboard/signup',
                templateUrl: 'admin/view/signup.html',
                controller: 'signupCtr'
            })
            .state('login', {
                url: '/dashboard/login',
                templateUrl: 'admin/view/login.html',
                controller: 'loginCtr'
            })
            .state('emailConfirm', {
                url: '/dashboard/email-confirm',
                templateUrl: 'admin/view/email-confirm.html',
                controller: 'emailConfirmCtr'
            })

            // Route Japan study aboard
            .state('japanStudyAboard', {
                url: '/dashboard/japan-study-board',
                templateUrl: 'admin/view/japan-study-aboard/study-aboard.html',
                controller: 'fetchJapanStudyAboardCtr',
                resolve: {
                    postJapanStudyAboard: function (JpPost) {
                        return JpPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('japanStudyAboardCreated', {
                url: '/dashboard/japan-study-board/create',
                templateUrl: 'admin/view/japan-study-aboard/created-study-aboard.html',
                controller: 'japanStudyAboardCtr'
            })
            .state('japanStudyAboardUpdate', {
                url: '/dashboard/japan-study-board/update',
                templateUrl: 'admin/view/japan-study-aboard/update-study-aboard.html',
                controller: 'updateJapanStudyAboardCtr'
            })

            // Route Korean study aboard
            .state('koreanStudyAboard', {
                url: '/dashboard/korean-study-board',
                templateUrl: 'admin/view/korean-study-aboard/study-aboard.html',
                controller: 'fetchKoreanStudyAboardCtr',
                resolve: {
                    postKoreanStudyAboard: function (KrPost) {
                        return KrPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('koreanStudyAboardCreated', {
                url: '/dashboard/korean-study-board/create',
                templateUrl: 'admin/view/korean-study-aboard/created-study-aboard.html',
                controller: 'koreanStudyAboardCtr'
            })
            .state('koreanStudyAboardUpdate', {
                url: '/dashboard/korean-study-board/update',
                templateUrl: 'admin/view/korean-study-aboard/update-study-aboard.html',
                controller: 'updateKoreanStudyAboardCtr'
            })
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    });
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

            // Route Germany study aboard
            .state('germanyStudyAboard', {
                url: '/dashboard/germany-study-board',
                templateUrl: 'admin/view/germany-study-aboard/study-aboard.html',
                controller: 'fetchGermanyStudyAboardCtr',
                resolve: {
                    postGermanyStudyAboard: function (GrPost) {
                        return GrPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('germanyStudyAboardCreated', {
                url: '/dashboard/germany-study-board/create',
                templateUrl: 'admin/view/germany-study-aboard/created-study-aboard.html',
                controller: 'germanyStudyAboardCtr'
            })
            .state('germanyStudyAboardUpdate', {
                url: '/dashboard/germany-study-board/update',
                templateUrl: 'admin/view/germany-study-aboard/update-study-aboard.html',
                controller: 'updateGermanyStudyAboardCtr'
            })

            // Route American study aboard
            .state('americanStudyAboard', {
                url: '/dashboard/american-study-board',
                templateUrl: 'admin/view/american-study-aboard/study-aboard.html',
                controller: 'fetchAmericanStudyAboardCtr',
                resolve: {
                    postAmericanStudyAboard: function (ArPost) {
                        return ArPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('americanStudyAboardCreated', {
                url: '/dashboard/american-study-board/create',
                templateUrl: 'admin/view/american-study-aboard/created-study-aboard.html',
                controller: 'americanStudyAboardCtr'
            })
            .state('americanStudyAboardUpdate', {
                url: '/dashboard/american-study-board/update',
                templateUrl: 'admin/view/american-study-aboard/update-study-aboard.html',
                controller: 'updateAmericanStudyAboardCtr'
            })

            // Route Australia study aboard
            .state('australiaStudyAboard', {
                url: '/dashboard/australia-study-board',
                templateUrl: 'admin/view/australia-study-aboard/study-aboard.html',
                controller: 'fetchAustraliaStudyAboardCtr',
                resolve: {
                    postAustraliaStudyAboard: function (AuPost) {
                        return AuPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('australiaStudyAboardCreated', {
                url: '/dashboard/australia-study-board/create',
                templateUrl: 'admin/view/australia-study-aboard/created-study-aboard.html',
                controller: 'australiaStudyAboardCtr'
            })
            .state('australiaStudyAboardUpdate', {
                url: '/dashboard/australia-study-board/update',
                templateUrl: 'admin/view/australia-study-aboard/update-study-aboard.html',
                controller: 'updateAustraliaStudyAboardCtr'
            })

            // Route Canada study aboard
            .state('canadaStudyAboard', {
                url: '/dashboard/canada-study-board',
                templateUrl: 'admin/view/canada-study-aboard/study-aboard.html',
                controller: 'fetchCanadaStudyAboardCtr',
                resolve: {
                    postCanadaStudyAboard: function (CaPost) {
                        return CaPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('canadaStudyAboardCreated', {
                url: '/dashboard/canada-study-board/create',
                templateUrl: 'admin/view/canada-study-aboard/created-study-aboard.html',
                controller: 'canadaStudyAboardCtr'
            })
            .state('canadaStudyAboardUpdate', {
                url: '/dashboard/canada-study-board/update',
                templateUrl: 'admin/view/canada-study-aboard/update-study-aboard.html',
                controller: 'updateCanadaStudyAboardCtr'
            })

            // Route email contact
            .state('emailConfirm', {
                url: '/dashboard/email-confirm',
                templateUrl: 'admin/view/contact/email-confirm.html',
                controller: 'emailConfirmCtr',
                resolve: {
                    emailConfirm: function (Contact) {
                        return Contact.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('emailConfirmReply', {
                url: '/dashboard/email-confirm/reply/:id',
                templateUrl: 'admin/view/contact/email-reply.html',
                controller: 'emailConfirmReplyCtr'
            })
            .state('emailConfirmView', {
                url: '/dashboard/email-confirm/view/:id',
                templateUrl: 'admin/view/contact/email-view.html',
                controller: 'emailConfirmViewCtr'
            })

            // Route Class Korean
            .state('classKorean', {
                url: '/dashboard/class/korean',
                templateUrl: 'admin/view/class/korean/index.html',
                controller: 'fetchClassKoreanCtr',
                resolve: {
                    postClassKorean: function (CkPost) {
                        return CkPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('classKoreanCreate', {
                url: '/dashboard/class/korean/create',
                templateUrl: 'admin/view/class/korean/create.html',
                controller: 'createClassKoreanCtr'
            })
            .state('classKoreanUpdate', {
                url: '/dashboard/class/korean/update',
                templateUrl: 'admin/view/class/korean/update.html',
                controller: 'updateClassKoreanCtr'
            })

            // Route News
            .state('news', {
                url: '/dashboard/news',
                templateUrl: 'admin/view/news/index.html',
                controller: 'fetchNewsCtr',
                resolve: {
                    postNews: function (NewsPost) {
                        return NewsPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('newsCreate', {
                url: '/dashboard/news/create',
                templateUrl: 'admin/view/news/create.html',
                controller: 'createNewsCtr'
            })
            .state('newsUpdate', {
                url: '/dashboard/news/update',
                templateUrl: 'admin/view/news/update.html',
                controller: 'updateNewsCtr'
            })
        ;
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    });
/**
 * Created by phuoclam on 31/12/2016.
 */
angular.module("appRoutes", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            //  Route home
            .state('home', {
                url: '/',
                templateUrl: 'client/views/home/index.html',
                controller: 'homeCtr'
            })

            // Route Japan
            .state('japan', {
                url: '/japan',
                templateUrl: 'client/views/asian/japan/index.html',
                controller: 'japanCtr',
                resolve: {
                    postJapanStudyAboard: function (JpPost) {
                        return JpPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('japanDetail', {
                url: '/japan/detail/:id',
                templateUrl: 'client/views/asian/japan/detail.html',
                controller: 'japanDetailCtr'
            })

            // Route Korean
            .state('korean', {
                url: '/korean',
                templateUrl: 'client/views/asian/korean/index.html',
                controller: 'koreanCtr',
                resolve: {
                    postKoreanStudyAboard: function (KrPost) {
                        return KrPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('koreanDetail', {
                url: '/korean/detail/:id',
                templateUrl: 'client/views/asian/korean/detail.html',
                controller: 'koreanDetailCtr'
            })

            // Route Germany
            .state('germany', {
                url: '/germany',
                templateUrl: 'client/views/euro/germany/index.html',
                controller: 'germanyCtr',
                resolve: {
                    postGermanyStudyAboard: function (GrPost) {
                        return GrPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('germanyDetail', {
                url: '/germany/detail/:id',
                templateUrl: 'client/views/euro/germany/detail.html',
                controller: 'germanyDetailCtr'
            })

            // Route American
            .state('american', {
                url: '/american',
                templateUrl: 'client/views/euro/american/index.html',
                controller: 'americanCtr',
                resolve: {
                    postAmericanStudyAboard: function (ArPost) {
                        return ArPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('americanDetail', {
                url: '/american/detail/:id',
                templateUrl: 'client/views/euro/american/detail.html',
                controller: 'americanDetailCtr'
            })

            // Route Australia
            .state('australia', {
                url: '/australia',
                templateUrl: 'client/views/euro/australia/index.html',
                controller: 'australiaCtr',
                resolve: {
                    postAustraliaStudyAboard: function (AuPost) {
                        return AuPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('australiaDetail', {
                url: '/australia/detail/:id',
                templateUrl: 'client/views/euro/australia/detail.html',
                controller: 'australiaDetailCtr'
            })

            // Route Canada
            .state('canada', {
                url: '/canada',
                templateUrl: 'client/views/euro/canada/index.html',
                controller: 'canadaCtr',
                resolve: {
                    postCanadaStudyAboard: function (CaPost) {
                        return CaPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('canadaDetail', {
                url: '/canada/detail/:id',
                templateUrl: 'client/views/euro/canada/detail.html',
                controller: 'canadaDetailCtr'
            })

            // Route Contact
            .state('contact', {
                url: '/contact',
                templateUrl: 'client/views/contact/index.html',
                controller: 'contactCtr'
            })

            // Route About
            .state('about', {
                url: '/about',
                templateUrl: 'client/views/about/index.html',
                controller: 'aboutCtr'
            })

    });
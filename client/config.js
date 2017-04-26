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
            .state('japanTag', {
                url: '/japan/tag?tag',
                templateUrl: 'client/views/asian/japan/index.html',
                controller: 'japanTagCtr',
                resolve: {
                    postJapanTagStudyAboard: function (JpPost, $stateParams) {
                        return JpPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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
            .state('koreanTag', {
                url: '/korean/tag?tag',
                templateUrl: 'client/views/asian/korean/index.html',
                controller: 'koreanTagCtr',
                resolve: {
                    postKoreanTagStudyAboard: function (KrPost, $stateParams) {
                        return KrPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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
            .state('germanyTag', {
                url: '/germany/tag?tag',
                templateUrl: 'client/views/euro/germany/index.html',
                controller: 'germanyTagCtr',
                resolve: {
                    postGermanyTagStudyAboard: function (GrPost, $stateParams) {
                        return GrPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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
            .state('americanTag', {
                url: '/american/tag?tag',
                templateUrl: 'client/views/euro/american/index.html',
                controller: 'americanTagCtr',
                resolve: {
                    postAmericanTagStudyAboard: function (ArPost, $stateParams) {
                        return ArPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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
            .state('australiaTag', {
                url: '/australia/tag?tag',
                templateUrl: 'client/views/euro/australia/index.html',
                controller: 'australiaTagCtr',
                resolve: {
                    postAustraliaTagStudyAboard: function (AuPost, $stateParams) {
                        return AuPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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
            .state('canadaTag', {
                url: '/canada/tag?tag',
                templateUrl: 'client/views/euro/canada/index.html',
                controller: 'canadaTagCtr',
                resolve: {
                    postCanadaTagStudyAboard: function (CaPost, $stateParams) {
                        return CaPost.fetch(10,1, $stateParams.tag).then(function (response) {
                            return response.data;
                        });
                    }
                }
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

            // Route Class Korean
            .state('classKorean', {
                url: '/class/korean',
                templateUrl: 'client/views/class/korean/index.html',
                controller: 'classKoreanCtr',
                resolve: {
                    postClassKoreanStudyAboard: function (CkPost) {
                        return CkPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('classKoreanDetail', {
                url: '/class/korean/detail/:id',
                templateUrl: 'client/views/class/korean/detail.html',
                controller: 'classKoreanDetailCtr'
            })

            // Route News
            .state('news', {
                url: '/news',
                templateUrl: 'client/views/news/index.html',
                controller: 'newsCtr',
                resolve: {
                    postNews: function (NewsPost) {
                        return NewsPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('newsDetail', {
                url: '/news/detail/:id',
                templateUrl: 'client/views/news/detail.html',
                controller: 'newsDetailCtr'
            })

            // Route Notify
            .state('notify', {
                url: '/notify',
                templateUrl: 'client/views/notify/index.html',
                controller: 'notifyCtr',
                resolve: {
                    postNotify: function (NotifyPost) {
                        return NotifyPost.fetch(10,1).then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('notifyDetail', {
                url: '/notify/detail/:id',
                templateUrl: 'client/views/notify/detail.html',
                controller: 'notifyDetailCtr'
            })
    });
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
                            console.log(response.data);
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
                controller: 'koreanCtr'
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
                controller: 'germanyCtr'
            })
            .state('germanyDetail', {
                url: '/germany/detail/:id',
                templateUrl: 'client/views/euro/germany/detail.html',
                controller: 'germanyDetailCtr'
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
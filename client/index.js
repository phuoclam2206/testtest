/**
 * Created by phuoclam on 03/01/2017.
 */

angular.module('tova', [
    'appRoutes',
    'homeController',
    'japanController',
    'koreanController',
    'germanyController',
    'americanController',
    'australiaController',
    'canadaController',
    'contactController',
    'aboutController',
    'classKoreanController',
    'newsController',
    'notifyController',
    'paginationUtil',
    'paginationDirective',
    'japanServices',
    'koreanServices',
    'germanyServices',
    'americanServices',
    'australiaServices',
    'canadaServices',
    'contactServices',
    'classKoreanServices',
    'newsServices',
    'notifyServices'
    ])
    .constant('_', window._)
    .run([
        '$rootScope', function ($rootScope) {
            $rootScope.facebookAppId = '1297662293648303'; // set your facebook app id here
        }
    ]);
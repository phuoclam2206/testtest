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
    'paginationUtil',
    'paginationDirective',
    'japanServices',
    'koreanServices',
    'germanyServices',
    'americanServices',
    'australiaServices',
    'canadaServices',
    'contactServices',
    'classKoreanServices'
    ])
    .constant('_', window._);
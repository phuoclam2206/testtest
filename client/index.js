/**
 * Created by phuoclam on 03/01/2017.
 */

angular.module('tova', [
    'appRoutes',
    'homeController',
    'japanController',
    'koreanController',
    'germanyController',
    'contactController',
    'aboutController',
    'paginationUtil',
    'paginationDirective',
    'japanServices',
    'koreanServices'])
    .constant('_', window._);
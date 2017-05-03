/**
 * Created by phuoclam on 08/01/2017.
 */

angular.module('paginationUtil', [])
    .factory('Pagination', function () {
        var paginationFactory = {};

        //Pagination.page()
        paginationFactory.page = function (limit, offset, total) {
            var totalPage = (total % limit) != 0 ? (total / limit) + 1 : (total / limit);

            var currentPage = (offset % limit) != 0 ? (offset / limit) + 1 : (offset / limit);

            return {
                totalPage: totalPage,
                currentPage: currentPage
            }
        };

        return paginationFactory;
    })
    .factory('CutString', function () {
        var cutStringFactory = {};
        var length = 180;
        // CutString.string
        cutStringFactory.string = function (s){
            var cut= s.indexOf(' ', length);
            if(cut== -1) return s;
            return s.substring(0, cut)
        };

        return cutStringFactory;
    })
    .factory('MetaService', function () {
        var title = 'Web App';
        var metaDescription = '';
        var metaKeywords = '';
        var metaImage = '';
        var metaLink = '';
        return {
            set: function(newTitle, newMetaDescription, newKeywords, image, link) {
                metaKeywords = newKeywords;
                metaDescription = newMetaDescription;
                title = newTitle;
                metaImage = image;
                metaLink = link;
            },
            metaTitle: function(){ return title; },
            metaDescription: function() { return metaDescription; },
            metaKeywords: function() { return metaKeywords; },
            metaImage: function () { return metaImage; },
            metaLink: function () { return metaLink; }
        }
    });
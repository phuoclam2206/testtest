/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('germanyController',['germanyServices', 'paginationUtil'])
    .controller('germanyCtr', function (Pagination, postGermanyStudyAboard, GrPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postGermanyStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postGermanyStudyAboard.limit, postGermanyStudyAboard.limit, postGermanyStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            GrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('germanyTagCtr', function (Pagination, postGermanyTagStudyAboard, GrPost, $scope, $sce, $stateParams) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postGermanyTagStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postGermanyTagStudyAboard.limit, postGermanyTagStudyAboard.limit, postGermanyTagStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            GrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('germanyDetailCtr', function ($scope, $stateParams, GrPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        GrPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        GrPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);

        });

        GrPost.fetchCorrelative($stateParams.tag).then(function (response) {
            $scope.correlatives = _.map(response.data).map(convertToDate);
        });
    });
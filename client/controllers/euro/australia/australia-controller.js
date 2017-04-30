/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('australiaController',['australiaServices', 'paginationUtil'])
    .controller('australiaCtr', function (Pagination, CutString, postAustraliaStudyAboard, AuPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(CutString.string(data.sort_content))
            });
        };

        $scope.posts = _.map(postAustraliaStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postAustraliaStudyAboard.limit, postAustraliaStudyAboard.limit, postAustraliaStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            AuPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

        AuPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);
        });
    })
    .controller('australiaTagCtr', function (Pagination, postAustraliaTagStudyAboard, AuPost, $scope, $sce, $stateParams) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postAustraliaTagStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postAustraliaTagStudyAboard.limit, postAustraliaTagStudyAboard.limit, postAustraliaTagStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            AuPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('australiaDetailCtr', function ($scope, $stateParams, AuPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        AuPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        AuPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);
        });

        AuPost.fetchCorrelative($stateParams.tag).then(function (response) {
            $scope.correlatives = _.map(response.data).map(convertToDate);
        });
    });
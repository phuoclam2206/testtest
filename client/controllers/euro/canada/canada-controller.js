/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('canadaController',['canadaServices', 'paginationUtil'])
    .controller('canadaCtr', function (Pagination, postCanadaStudyAboard, CaPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postCanadaStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postCanadaStudyAboard.limit, postCanadaStudyAboard.limit, postCanadaStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            CaPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('canadaTagCtr', function (Pagination, postCanadaTagStudyAboard, CaPost, $scope, $sce, $stateParams) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postCanadaTagStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postCanadaTagStudyAboard.limit, postCanadaTagStudyAboard.limit, postCanadaTagStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            CaPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('canadaDetailCtr', function ($scope, $stateParams, CaPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        CaPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        CaPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);

        });

        CaPost.fetchCorrelative($stateParams.tag).then(function (response) {
            $scope.correlatives = _.map(response.data).map(convertToDate);
        });
    });
/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('koreanController',['koreanServices', 'paginationUtil'])
    .controller('koreanCtr', function (Pagination, CutString, postKoreanStudyAboard, KrPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(CutString.string(data.sort_content))
            });
        };

        $scope.posts = _.map(postKoreanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postKoreanStudyAboard.limit, postKoreanStudyAboard.limit, postKoreanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            KrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('koreanTagCtr', function (Pagination, postKoreanTagStudyAboard, KrPost, $scope, $sce, $stateParams) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postKoreanTagStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postKoreanTagStudyAboard.limit, postKoreanTagStudyAboard.limit, postKoreanTagStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            KrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('koreanDetailCtr', function ($scope, $stateParams, KrPost, $sce, $rootScope, MetaService) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        KrPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
            $rootScope.metaservice = MetaService;
            $rootScope.metaservice.set($scope.post.title, "desc","blah blah", $scope.post.image, 'japan/detail/' + $scope.post._id);
        });

        KrPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);

        });

        KrPost.fetchCorrelative($stateParams.tag).then(function (response) {
            $scope.correlatives = _.map(response.data).map(convertToDate);
        });
    });
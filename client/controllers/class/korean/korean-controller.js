/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('classKoreanController',['classKoreanServices', 'paginationUtil'])
    .controller('classKoreanCtr', function (Pagination, CutString, postClassKoreanStudyAboard, KrPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(CutString.string(data.sort_content))
            });
        };

        $scope.posts = _.map(postClassKoreanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postClassKoreanStudyAboard.limit, postClassKoreanStudyAboard.limit, postClassKoreanStudyAboard.total);

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
    .controller('classKoreanDetailCtr', function ($scope, $stateParams, CkPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        CkPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        CkPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);
        });
    });
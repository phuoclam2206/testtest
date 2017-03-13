/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('japanController',['japanServices', 'paginationUtil'])
    .controller('japanCtr', function (Pagination, postJapanStudyAboard, JpPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        $scope.posts = _.map(postJapanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postJapanStudyAboard.limit, postJapanStudyAboard.limit, postJapanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            JpPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('japanDetailCtr', function ($scope, $stateParams, JpPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        JpPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });
    });
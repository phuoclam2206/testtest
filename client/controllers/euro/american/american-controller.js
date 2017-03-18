/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('americanController',['americanServices', 'paginationUtil'])
    .controller('americanCtr', function (Pagination, postAmericanStudyAboard, ArPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postAmericanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postAmericanStudyAboard.limit, postAmericanStudyAboard.limit, postAmericanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            ArPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('americanDetailCtr', function ($scope, $stateParams, ArPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        ArPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });
    });
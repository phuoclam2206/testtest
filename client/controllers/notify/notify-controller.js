/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('notifyController',['notifyServices', 'paginationUtil'])
    .controller('notifyCtr', function (Pagination, postNotify, NotifyPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postNotify.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postNotify.limit, postNotify.limit, postNotify.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.toPage = function (page) {
            NotifyPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };
    })
    .controller('notifyDetailCtr', function ($scope, $stateParams, NotifyPost, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        NotifyPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        NotifyPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);
        });
    });
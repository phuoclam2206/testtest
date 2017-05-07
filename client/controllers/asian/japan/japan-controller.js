/**
 * Created by phuoclam on 21/02/2017.
 */
angular.module('japanController',['japanServices', 'paginationUtil'])
    .controller('japanCtr', function (Pagination, CutString, postJapanStudyAboard, JpPost, $scope, $sce) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(CutString.string(data.sort_content))
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
    .controller('japanTagCtr', function (Pagination, postJapanTagStudyAboard, JpPost, $scope, $sce, $stateParams) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content),
                sort_content: $sce.trustAsHtml(data.sort_content)
            });
        };

        $scope.posts = _.map(postJapanTagStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postJapanTagStudyAboard.limit, postJapanTagStudyAboard.limit, postJapanTagStudyAboard.total);

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
    .controller('japanDetailCtr', function ($scope, $stateParams, JpPost, $sce, $rootScope, MetaService) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        JpPost.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
            $scope.myModel = {
                Url: 'http://duhoctova.com/#!/japan/detail/5901a80039d2b52d6883003f',
                Name: "AngularJS directives for social sharing buttons - Facebook, Google+, Twitter and Pinterest | Jason Watmore's Blog",
                ImageUrl: 'http://duhoctova.com/public/images/1489800718719-a38b4e71_601e_486c_a1b7_e7fb039ded39.jpg'
            };

            $rootScope.metaservice = MetaService;
            $rootScope.metaservice.set($scope.post.title, "desc","blah blah", $scope.post.image, 'japan/detail/5901a80039d2b52d6883003f');
        });

        JpPost.fetchMostView().then(function (response) {
            $scope.mostViews = _.map(response.data).map(convertToDate);

        });

        JpPost.fetchCorrelative($stateParams.tag).then(function (response) {
            $scope.correlatives = _.map(response.data).map(convertToDate);
        });
    });
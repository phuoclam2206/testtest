/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('canadaStudyAboardController', ['canadaServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('canadaStudyAboardCtr', function (CaPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            CaPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/canada-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchCanadaStudyAboardCtr', function (Auth, Pagination, postCanadaStudyAboard, CaPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        $scope.posts = _.map(postCanadaStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postCanadaStudyAboard.limit, postCanadaStudyAboard.limit, postCanadaStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                CaPost.delete(id).then(function (response) {
                    if (response) {
                        CaPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            CaPost.setPost(post);
            $location.path("/dashboard/canada-study-board/update")
        };

        $scope.toPage = function (page) {
            CaPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateCanadaStudyAboardCtr', function (CaPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = CaPost.getPost();
        $scope.updatePost = function (post) {
            CaPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/canada-study-board")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/canada-study-board");
        };

    });
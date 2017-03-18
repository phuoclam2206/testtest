/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('germanyStudyAboardController', ['germanyServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('germanyStudyAboardCtr', function (GrPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            GrPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/germany-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchGermanyStudyAboardCtr', function (Auth, Pagination, postGermanyStudyAboard, GrPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        console.log(Auth.isLoggedId());
        $scope.posts = _.map(postGermanyStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postGermanyStudyAboard.limit, postGermanyStudyAboard.limit, postGermanyStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                GrPost.delete(id).then(function (response) {
                    if (response) {
                        GrPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            GrPost.setPost(post);
            $location.path("/dashboard/germany-study-board/update")
        };

        $scope.toPage = function (page) {
            GrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateGermanyStudyAboardCtr', function (GrPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = GrPost.getPost();
        $scope.updatePost = function (post) {
            GrPost.update(post).then(function (response) {
                if (response) {
                    $location.path("/dashboard/germany-study-board")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/germany-study-board");
        };

    });
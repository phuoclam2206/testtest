/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('americanStudyAboardController', ['americanServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('americanStudyAboardCtr', function (ArPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            ArPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/american-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchAmericanStudyAboardCtr', function (Auth, Pagination, postAmericanStudyAboard, ArPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        $scope.posts = _.map(postAmericanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postAmericanStudyAboard.limit, postAmericanStudyAboard.limit, postAmericanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                ArPost.delete(id).then(function (response) {
                    if (response) {
                        ArPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            ArPost.setPost(post);
            $location.path("/dashboard/american-study-board/update")
        };

        $scope.toPage = function (page) {
            ArPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateAmericanStudyAboardCtr', function (ArPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = ArPost.getPost();
        $scope.updatePost = function (post) {
            ArPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/american-study-board")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/american-study-board");
        };

    });
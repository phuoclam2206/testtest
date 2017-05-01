/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('koreanStudyAboardController', ['koreanServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('koreanStudyAboardCtr', function (KrPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            KrPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/korean-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchKoreanStudyAboardCtr', function (Auth, Pagination, postKoreanStudyAboard, KrPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        console.log(Auth.isLoggedId());
        $scope.posts = _.map(postKoreanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postKoreanStudyAboard.limit, postKoreanStudyAboard.limit, postKoreanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                KrPost.delete(id).then(function (response) {
                    if (response) {
                        KrPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            KrPost.setPost(post);
            $location.path("/dashboard/korean-study-board/update")
        };

        $scope.toPage = function (page) {
            KrPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateKoreanStudyAboardCtr', function (KrPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = KrPost.getPost();
        $scope.updatePost = function (post) {
            KrPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/korean-study-board")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/korean-study-board");
        };
    });
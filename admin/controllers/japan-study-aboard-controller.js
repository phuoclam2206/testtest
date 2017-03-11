/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('japanStudyAboardController', ['japanServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('japanStudyAboardCtr', function (JpPost, Tinymce, $scope, $location) {
        $scope.title = 'Tao bai viet';
        $scope.createPost = function (post) {
            JpPost.create(post).then(function (response) {
                $location.path("/dashboard/japan-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchJapanStudyAboardCtr', function (Auth, Pagination, postJapanStudyAboard, JpPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        console.log(Auth.isLoggedId());
        $scope.posts = _.map(postJapanStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postJapanStudyAboard.limit, postJapanStudyAboard.limit, postJapanStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                JpPost.delete(id).then(function (response) {
                    if (response) {
                        JpPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            JpPost.setPost(post);
            $location.path("/dashboard/japan-study-board/update")
        };

        $scope.toPage = function (page) {
            JpPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateJapanStudyAboardCtr', function (JpPost, Tinymce, $scope, $location) {
        $scope.title = 'Chinh sua bai viet';
        $scope.tinymceOptions = Tinymce;
        $scope.post = JpPost.getPost();
        $scope.createPost = function (post) {
            JpPost.update(post).then(function (response) {
                if (response) {
                    $location.path("/dashboard/japan-study-board")
                }
            });
        };
    });
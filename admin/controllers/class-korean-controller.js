/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('classKoreanController', ['classKoreanServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('createClassKoreanCtr', function (CkPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            CkPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/class/korean")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchClassKoreanCtr', function (Auth, Pagination, postClassKorean, CkPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        $scope.posts = _.map(postClassKorean.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postClassKorean.limit, postClassKorean.limit, postClassKorean.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                CkPost.delete(id).then(function (response) {
                    if (response) {
                        CkPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            CkPost.setPost(post);
            $location.path("/dashboard/class/korean/update")
        };

        $scope.toPage = function (page) {
            CkPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateClassKoreanCtr', function (CkPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = CkPost.getPost();
        $scope.updatePost = function (post) {
            CkPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/class/korean")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/class/korean");
        };

    });
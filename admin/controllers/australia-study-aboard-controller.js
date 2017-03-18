/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('australiaStudyAboardController', ['australiaServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('australiaStudyAboardCtr', function (AuPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            AuPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/australia-study-board")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchAustraliaStudyAboardCtr', function (Auth, Pagination, postAustraliaStudyAboard, AuPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        console.log(Auth.isLoggedId());
        $scope.posts = _.map(postAustraliaStudyAboard.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postAustraliaStudyAboard.limit, postAustraliaStudyAboard.limit, postAustraliaStudyAboard.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                AuPost.delete(id).then(function (response) {
                    if (response) {
                        AuPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            AuPost.setPost(post);
            $location.path("/dashboard/australia-study-board/update")
        };

        $scope.toPage = function (page) {
            AuPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateAustraliaStudyAboardCtr', function (AuPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = AuPost.getPost();
        $scope.updatePost = function (post) {
            AuPost.update(post).then(function (response) {
                if (response) {
                    $location.path("/dashboard/australia-study-board")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/australia-study-board");
        };

    });
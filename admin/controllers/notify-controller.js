/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('notifyController', ['notifyServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('createNotifyCtr', function (NotifyPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            NotifyPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/notify")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchNotifyCtr', function (Auth, Pagination, postNotify, NotifyPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        $scope.posts = _.map(postNotify.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postNotify.limit, postNotify.limit, postNotify.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                NotifyPost.delete(id).then(function (response) {
                    if (response) {
                        NotifyPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            NotifyPost.setPost(post);
            $location.path("/dashboard/notify/update")
        };

        $scope.toPage = function (page) {
            NotifyPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateNotifyCtr', function (NotifyPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = CkPost.getPost();
        $scope.updatePost = function (post) {
            NotifyPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/notify")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/notify");
        };

    });
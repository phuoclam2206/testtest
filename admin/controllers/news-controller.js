/**
 * Created by phuoclam on 05/01/2017.
 */
angular.module('newsController', ['newsServices', 'paginationUtil', 'tinymceOptionService'])
    .controller('createNewsCtr', function (NewsPost, Tinymce, $scope, $location) {
        $scope.createPost = function (post) {
            NewsPost.create(post, $scope.file).then(function (response) {
                $location.path("/dashboard/news")
            });
        };

        $scope.tinymceOptions = Tinymce;
    })
    .controller('fetchNewsCtr', function (Auth, Pagination, postNews, NewsPost, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        $scope.posts = _.map(postNews.docs).map(convertToDate);

        $scope.pagination = Pagination.page(postNews.limit, postNews.limit, postNews.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa bài này")) {
                NewsPost.delete(id).then(function (response) {
                    if (response) {
                        NewsPost.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.updatePost = function (post) {
            NewsPost.setPost(post);
            $location.path("/dashboard/news/update")
        };

        $scope.toPage = function (page) {
            NewsPost.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

    })
    .controller('updateNewsCtr', function (NewsPost, Tinymce, $scope, $location) {
        $scope.tinymceOptions = Tinymce;
        $scope.post = CkPost.getPost();
        $scope.updatePost = function (post) {
            NewsPost.update(post, $scope.file).then(function (response) {
                if (response) {
                    $location.path("/dashboard/news")
                }
            });
        };
        $scope.cancel = function () {
            $location.path("/dashboard/news");
        };

    });
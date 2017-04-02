/**
 * Created by phuoclam on 05/01/2017.
 */

angular.module('emailConfirmController', [])
    .controller('emailConfirmCtr', function (Auth, Pagination, emailConfirm, Contact, $scope, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString()
            });
        };

        console.log(Auth.isLoggedId());
        $scope.posts = _.map(emailConfirm.docs).map(convertToDate);

        $scope.pagination = Pagination.page(emailConfirm.limit, emailConfirm.limit, emailConfirm.total);

        var range = [];
        for(var i=1;i<=$scope.pagination.totalPage;i++) {
            range.push(i);
        }
        $scope.pagination.totalPage = range;

        $scope.deletePost = function (id) {
            if (confirm("Tova có chắc chắn xóa email này")) {
                Contact.delete(id).then(function (response) {
                    if (response) {
                        Contact.fetch().then(function (response) {
                            $scope.posts = _.map(response.data).map(convertToDate);
                        });
                    }
                });
            }
        };

        $scope.toPage = function (page) {
            Contact.fetch(10,page).then(function (response) {
                var data = response.data;
                $scope.posts = _.map(data.docs).map(convertToDate);
                $scope.pagination.currentPage = page;
            });
        };

        $scope.emailConfig = function (email) {
            Contact.updateConfig(email).then(function (response) {
                console.log(response);
            })
        };

        Contact.fetchConfig().then(function (response) {
            $scope.email = response.data;
        })

    })
    .controller('emailConfirmReplyCtr', function ($scope, $stateParams, Contact, $sce, $location) {
        var convertToDate = function (data) {
            return _.assign(data, {
                created_date: new Date(1000 * data.created_date).toDateString(),
                content: $sce.trustAsHtml(data.content)
            });
        };

        Contact.fetchDetail($stateParams.id).then(function (response) {
            $scope.post = convertToDate(response.data);
        });

        $scope.emailReply = function (email) {
            Contact.reply($stateParams.id, email).then(function (response) {
                $location.path("/dashboard/email-confirm");
            })
        }
    })
    .controller('emailConfirmViewCtr', function ($scope, $stateParams, Contact, $sce, $location) {

        Contact.fetchDetail($stateParams.id).then(function (response) {
            console.log(response.data);
            $scope.email = response.data;
        });

        $scope.back = function () {
            $location.path("/dashboard/email-confirm");
        }
    });
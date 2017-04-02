/**
 * Created by phuoclam on 25/03/2017.
 */
angular.module('contactServices', [])
    .factory('Contact', function ($http) {
        var contactFactory = {};

        // Contact.sendMail
        contactFactory.sendMail = function (mail) {
            return $http.post('/api/contact/send_mail', mail).then(function (response) {
                return response;
            });
        };

        return contactFactory;
    });
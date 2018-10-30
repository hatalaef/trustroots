import { react2angular } from 'react2angular';
import ProfileViewBasics from '../components/ProfileViewBasics';

(function () {
  'use strict';

  angular
    .module('users')
    .config(UsersConfig)
    .component('profileViewBasics', react2angular(ProfileViewBasics, ['profile']));

  /* @ngInject */
  function UsersConfig($httpProvider) {

    // Config HTTP Error Handling
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('/signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }

}());

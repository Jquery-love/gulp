// Ionic Starter App

angular.module('rss', ['ionic', 'starter.controllers']).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('rss', {
      url: '/rss',
      templateUrl: 'templates/rss.html',
      controller: 'rssCtrl'
  })
  .state('filter',{
    url:'/filter',
    templateUrl:'templates/filter.html',
    controller : 'filterCtrl'
  })
  .state('set',{
    url: '/set',
    templateUrl:'templates/set.html',
    controller: 'setCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/rss');
});

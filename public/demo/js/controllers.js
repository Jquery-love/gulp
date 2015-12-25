angular.module('starter.controllers', [])
  .controller('rssCtrl', function($scope, $ionicModal,$ionicLoading,$timeout) {

    $scope.greeting = 'hello world!';
    $scope.rssData = [
      {
        url : 'http://www.phonegap100.com/',
        imgUrl:'../img/sd-banner.jpg',
        title:'是打发斯蒂芬',
        time:'15-12-24 12:30:30',
        stampUrl:'http://www.w3cplus.com/',
        shopName:'赵涌在线',
        price:'10.20'
      },
      {
        url : 'http://www.phonegap100.com/',
        imgUrl:'../img/sd-banner.jpg',
        title:'是打发斯蒂芬',
        time:'15-12-24 12:30:30',
        stampUrl:'http://www.w3cplus.com/',
        shopName:'赵涌在线',
        price:'10.20'
      }
    ];
    $scope.doRefresh = function() {
      
      console.log('Refreshing!');
      $timeout( function() {
        //simulate async response
        $scope.rssData.push({
          url : 'http://www.phonegap100.com/',
          imgUrl:'../img/sd-banner.jpg',
          title:'是打发斯蒂芬',
          time:'15-12-24 12:30:30',
          stampUrl:'http://www.w3cplus.com/',
          shopName:'赵涌在线',
          price:'10.20'
        });

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    $scope.type = 1;
    $scope.showList = function(p) {
      $scope.type = p;
      $ionicLoading.show({
        template: '<ion-spinner icon="dots" class="spinner-dark"></ion-spinner>'
      });
      $timeout(function(){
        switch($scope.type){
          case 1 : $scope.rssData.push({
            url : 'http://www.phonegap100.com/',
            imgUrl:'../img/sd-banner.jpg',
            title:'是打发斯蒂芬',
            time:'15-12-24 12:30:30',
            stampUrl:'http://www.w3cplus.com/',
            shopName:'赵涌在线',
            price:'10.20'});$ionicLoading.hide();break;
          case 2 : $scope.rssData = $scope.rssData.slice(1);$ionicLoading.hide();break;
          case 3 : $scope.rssData = $scope.rssData.slice(1,3);$ionicLoading.hide();break;
          case 4 : $scope.rssData.push({
            url : 'http://www.phonegap100.com/',
            imgUrl:'../img/sd-banner.jpg',
            title:'是打发斯蒂芬',
            time:'15-12-24 12:30:30',
            stampUrl:'http://www.w3cplus.com/',
            shopName:'赵涌在线',
            price:'10.20'
          });$ionicLoading.hide();break;
        }
      },500)
    }
  })
  .controller('filterCtrl', function($scope, $ionicModal,$ionicLoading,$timeout) {

  })
  .controller('setCtrl',function($scope, $ionicModal,$ionicLoading,$timeout) {

  });

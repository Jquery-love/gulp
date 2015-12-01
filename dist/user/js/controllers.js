/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/user/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("angular.module('starter.controllers', [])\n\n.controller('AppCtrl', function($scope, $ionicModal, $timeout) {\n\n  // With the new view caching in Ionic, Controllers are only called\n  // when they are recreated or on app start, instead of every page change.\n  // To listen for when this page is active (for example, to refresh data),\n  // listen for the $ionicView.enter event:\n  //$scope.$on('$ionicView.enter', function(e) {\n  //});\n\n  // Form data for the login modal\n  $scope.loginData = {};\n\n  // Create the login modal that we will use later\n  $ionicModal.fromTemplateUrl('templates/login.html', {\n    scope: $scope\n  }).then(function(modal) {\n    $scope.modal = modal;\n  });\n\n  // Triggered in the login modal to close it\n  $scope.closeLogin = function() {\n    $scope.modal.hide();\n  };\n\n  // Open the login modal\n  $scope.login = function() {\n    $scope.modal.show();\n  };\n\n  // Perform the login action when the user submits the login form\n  $scope.doLogin = function() {\n    console.log('Doing login', $scope.loginData);\n\n    // Simulate a login delay. Remove this and replace with your login\n    // code if using a login system\n    $timeout(function() {\n      $scope.closeLogin();\n    }, 1000);\n  };\n})\n\n.controller('PlaylistsCtrl', function($scope) {\n  $scope.playlists = [\n    { title: 'Reggae', id: 1 },\n    { title: 'Chill', id: 2 },\n    { title: 'Dubstep', id: 3 },\n    { title: 'Indie', id: 4 },\n    { title: 'Rap', id: 5 },\n    { title: 'Cowbell', id: 6 }\n  ];\n})\n\n.controller('PlaylistCtrl', function($scope, $stateParams) {\n});\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./public/user/js/controllers.js\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./public/user/js/controllers.js?");

/***/ }
/******/ ]);
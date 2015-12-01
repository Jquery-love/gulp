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
/******/ 	__webpack_require__.p = "/lib/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("// Ionic Starter App\n\n// angular.module is a global place for creating, registering and retrieving Angular modules\n// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)\n// the 2nd parameter is an array of 'requires'\n// 'starter.controllers' is found in controllers.js\nangular.module('starter', ['ionic', 'starter.controllers'])\n\n.run(function($ionicPlatform) {\n  $ionicPlatform.ready(function() {\n    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard\n    // for form inputs)\n    if (window.cordova && window.cordova.plugins.Keyboard) {\n      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);\n      cordova.plugins.Keyboard.disableScroll(true);\n\n    }\n    if (window.StatusBar) {\n      // org.apache.cordova.statusbar required\n      StatusBar.styleDefault();\n    }\n  });\n})\n\n.config(function($stateProvider, $urlRouterProvider) {\n  $stateProvider\n\n    .state('app', {\n    url: '/app',\n    abstract: true,\n    templateUrl: 'templates/menu.html',\n    controller: 'AppCtrl'\n  })\n\n  .state('app.search', {\n    url: '/search',\n    views: {\n      'menuContent': {\n        templateUrl: 'templates/search.html'\n      }\n    }\n  })\n\n  .state('app.browse', {\n      url: '/browse',\n      views: {\n        'menuContent': {\n          templateUrl: 'templates/browse.html'\n        }\n      }\n    })\n    .state('app.playlists', {\n      url: '/playlists',\n      views: {\n        'menuContent': {\n          templateUrl: 'templates/playlists.html',\n          controller: 'PlaylistsCtrl'\n        }\n      }\n    })\n\n  .state('app.single', {\n    url: '/playlists/:playlistId',\n    views: {\n      'menuContent': {\n        templateUrl: 'templates/playlist.html',\n        controller: 'PlaylistCtrl'\n      }\n    }\n  });\n  // if none of the above states are matched, use this as the fallback\n  $urlRouterProvider.otherwise('/app/playlists');\n});\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./public/lib/js/app.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./public/lib/js/app.js?");

/***/ }
/******/ ]);
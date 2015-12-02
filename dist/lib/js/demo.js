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
/***/ function(module, exports, __webpack_require__) {

	eval("var ionic = __webpack_require__(1);\r\nangular.module('ionicApp', ['ionic'])\r\n\r\n.controller('RootCtrl', function($scope) {\r\n  $scope.onControllerChanged = function(oldController, oldIndex, newController, newIndex) {\r\n    console.log('Controller changed', oldController, oldIndex, newController, newIndex);\r\n    console.log(arguments);\r\n  };\r\n})\r\n\r\n\r\n.controller('HomeCtrl', function($scope, $timeout, $ionicModal, $ionicActionSheet) {\r\n  $scope.items = [];\r\n\r\n  $ionicModal.fromTemplateUrl('newTask.html', function(modal) {\r\n    $scope.settingsModal = modal;\r\n  });\r\n\r\n  var removeItem = function(item, button) {\r\n    $ionicActionSheet.show({\r\n      buttons: [],\r\n      destructiveText: 'Delete Task',\r\n      cancelText: 'Cancel',\r\n      cancel: function() {\r\n        return true;\r\n      },\r\n      destructiveButtonClicked: function() {\r\n        $scope.items.splice($scope.items.indexOf(item), 1);\r\n        return true;\r\n      }\r\n    });\r\n  };\r\n\r\n  var completeItem = function(item, button) {\r\n    item.isCompleted = true;\r\n  };\r\n\r\n  $scope.onReorder = function(el, start, end) {\r\n    ionic.Utils.arrayMove($scope.items, start, end);\r\n  };\r\n\r\n  $scope.onRefresh = function() {\r\n    console.log('ON REFRESH');\r\n\r\n    $timeout(function() {\r\n      $scope.$broadcast('scroll.refreshComplete');\r\n    }, 1000);\r\n  }\r\n\r\n\r\n  $scope.removeItem = function(item) {\r\n    removeItem(item);\r\n  };\r\n\r\n  $scope.newTask = function() {\r\n    $scope.settingsModal.show();\r\n  };\r\n\r\n  // Create the items\r\n  for(var i = 0; i < 25; i++) {\r\n    $scope.items.push({\r\n      title: 'Task ' + (i + 1),\r\n      buttons: [{\r\n        text: 'Done',\r\n        type: 'button-success',\r\n        onButtonClicked: completeItem,\r\n      }, {\r\n        text: 'Delete',\r\n        type: 'button-danger',\r\n        onButtonClicked: removeItem,\r\n      }]\r\n    });\r\n  }\r\n\r\n})\r\n\r\n.controller('TaskCtrl', function($scope) {\r\n  $scope.close = function() {\r\n    $scope.modal.hide();\r\n  }\r\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./public/lib/js/demo.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./public/lib/js/demo.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {


/***/ }
/******/ ]);
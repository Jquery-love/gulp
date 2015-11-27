var a = require('./a');
// var b = require('./b');
// var d = require('./d');
// console.log(d());
require(['./d','./b'],function(d,b){
	console.log(d(),b());
	var c = require('./c'); 
});
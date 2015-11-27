var a = require('./a');
var b = require('./b');
var d = require('./d');
console.log(a);
require(["d"],function(d){
	console.log(d);
	var c = require('./c');
});

// module.exports.counter = function(arr){
//     return 'There are ' + arr.length + ' elements in the array';
// };

// module.exports.adder = function(a, b){
//     return `The sum of the two numbers is ${a+b}`;
// };

// module.exports.pi = 3.142;



/** by default, the functions are not available outside the module
 * so we need to export them.
 */
var counter = function(arr){
    return 'There are ' + arr.length + ' elements in the array';
};

var adder = function(a, b){
    return `The sum of the two numbers is ${a+b}`;
};

var pi = 3.142;

// module.exports.counter = counter;
// module.exports.pi = pi;
// module.exports.adder = adder;
 /// or
 
module.exports = {
    counter: counter,
    adder: adder,
    pi: pi
};





/** require, exports */
/** Global Object */

var stuff = require('./stuff');
var events = require('events');
var util = require('util');
var fs = require('fs');

// setTimeout(function(){
//     console.log("Hello world!!!")
// }, 1000);

// var time = 0

// var timer = setInterval(function(){
//     time += 2;
//     console.log(time + ' secons passed!')
//     if(time > 5){
//         clearInterval(timer)
//     }
// }, 2000); 

// /** pwd & file */
// console.log(__filename)
// console.log(__dirname)

// /** you can define a function in 2 ways */
// function sayHi(){
//     console.log("saying Hi...")
// };

// var sayBye = function(){
//     console.log("good bye!!")
// }

// /** passing a function as an argument */
// function callFunction(fun){
//     fun();
// }
// sayHi();
// sayBye();
// callFunction(sayBye);

// var output = stuff.counter(['raj', 'kumar']);
// console.log(output);
// console.log(stuff.adder(1,2));
// console.log('The value of pi is ' + stuff.pi);


// var myEmitter = new events.EventEmitter();
// myEmitter.on('someEvent', function(msg){
//     console.log(msg);
// });

// myEmitter.emit('someEvent', 'the event was emitting...');

// var Person = function(name){
//     this.name = name;
// };

// util.inherits(Person, events.EventEmitter);

// var raj = new Person('Rajkumar');
// var tej = new Person('Tejaswi');
// var himakar = new Person('Hikmar');

// var ppl = [raj, tej, himakar];
// ppl.forEach(function(person){
//     person.on('speak', function(msg){
//         console.log(person.name + ' said: ' + msg);
//     });
// });

// raj.emit('speak', 'hey dudes');


// /** Reading & Writing to Files */
// var input = fs.readFileSync('input.txt', 'utf8');
// fs.readFile('input.txt', 'utf8', function(err, data){
//     console.log(data);
//     fs.writeFile('writeMe2.txt', data);
// });
// console.log('test');
// /**  advantage is it's not blocking i.e. asynchronous */

// fs.writeFileSync('writeMe.txt', input);

// /** deleting file */
// fs.unlink('writeMe.txt');

// /** creating & deleting directories */
// fs.mkdirSync('stuff');
// fs.rmdirSync('stuff');

/** whenever we use async methods, we should use a callback function
 * to do something once this action completes.
*/

var filepath = './stuff/writeMe.txt';
console.log(fs.existsSync(filepath));

if(fs.existsSync(filepath)){
    //console.log(`${filepath} exists, so deleting it`);
    console.log('Hello....');
    fs.unlink('./stuff/writeMe.txt', function(){
        fs.rmdir('./stuff');
    });
}

fs.mkdir('./stuff', function(){
    fs.readFile('input.txt', 'utf8', function(err, data){
        fs.writeFile('./stuff/writeMe.txt', data);
    });
});






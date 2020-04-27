function foo() {
    console.log('this', this); //Gobal object... window
    console.log('arguments: ', arguments); 
    console.log('arguments len: ', arguments.length); 
}
//foo() - 0      
//foo([1,2]) - 1
//foor(1,2) - 2
foo(); //Method #1 stand alone functions

var obj = {};
obj.foo = function(){ 
    console.log('this', this);  //this -> obj
    console.log('arguments: ', arguments);
    console.log('arguments len: ', arguments.length);
}
obj.foo() //Method 2

new foo();//Method 3 this --> newly created object.
//new keyword 
    //-- first line var this = {}; 
    //-- last line return this;

function Bicyle(){ //constructor function
    this.x =x;//refer to the newly created object.
    this.abcd(){//member function
        //this. ...this... refers to an object on which it's called
    }
}

foo.call(x); //it binds this ---> x
foo();
mike.inflateTires.call(bicycle);







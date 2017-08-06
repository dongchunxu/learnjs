/**
 *  对象有自己的属性，也可以从一个称为原型的对象继承属性
 *
 *  对象的方法通常是继承的属性？ 怎么理解？
 *  "原型式继承"是JavaScript的核心特征
 *
 *  属性： 属性名+值+属性特性（可写（是否可以设置），可枚举，可配置（是否可以删除，修改属性））--在e5标准之前，这三点都是可以的。
 *  对象特性: 对象的原型+类+扩展标记（是否可以向该对象添加新属性）
 * */



//1.1 create(对象直接量，new， Object.create())
var obj1 = {};
var obj12 = {x:0, y:0};
var obj13 = {x:obj12.x, y:obj12.y};
var book = {
    "main title" : "Javascript",
    "sub title" : "权威指南",
    author: {
        firstname: "David",
        lastname:"dong"
    }
};




var o = new Object(); //类似于var o = {}
var a = new Array();    //等价于[] //a的原型是Array.
var d = new Date();     //d的原型是Date.prototype
var r = new RegExp("js");


//什么是原型
/**
 * 所有通过直接量创建的对象都有一个共同的原型对象，并可以通过Object.prototype获得对原型对象的引用
 * 通过new和构造函数创建的对象的原型就是构造函数的prototype属性的值
 *
 *  原型对象都是普通对象，普通对象都有原型。Array.prototype的属性继承自Object.prototype
 *  所以Array对象的属性同时继承自Array.prototype，Object.prototype
 *  没有的原型的对象Object.prototype
 *
 * */

var obj3 = Object.create({x:1, y:2});  //第一个参数就是原型
var nonPrototype = Object.create(null); //一个没有原型的对象，这个对象里没有任何基础的方法
var o3 = Object.create(Object.prototype); //等价于new Object()和{}

//通过原型继承创建一个新的对象
//这么做，可以防止修改原对象，现在修改的只是继承的对象
function inherit(p) {
    if (p == null) throw TypeError();

    if (Object.create) {
        return Object.create(p);
    }
    var t = typeof p;
    if (t !== 'object' || t != 'function') {
        throw TypeError();
    }

    function f() {
    }
    f.prototype = p;
    return new f();
}


//1.2 查询
/**
 *  在JavaScript中，只有在查询的时候才会体会到继承的存在，而设置属性则和继承无关
 *
 * */
console.info(book.author);
console.info(book["sub title"]);

for (var p in book) {
    console.info("p: " + p + ",value: " + book[p]);
}

var o = {};
o.x = 1;
var p = inherit(o);
p.y = 2;
var q = inherit(p);
q.z = 3;

console.info(p.x + q.z);

//判空，与java相比要灵活一些
//比如book.subtitle 这个属性不存在
console.info(book.subtitle) //不会报错，结果是undefined、但是对象不存在就会报错


book.subtitle = "子标题";
//1
var len = undefined
if (book) {
    if (book.subtitle)
        len = book.subtitle.length;
}

//2
var len = book && book.subtitle && book.subtitle.length;
console.info(len);



//1.3 删除属性
//delete 只能删除自有属性，不能删除继承属性




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
//delete 删除成功或者没有任何副作用（比如删除不存在的属性）时，会返回true

var o = {x:1}
console.info(delete o.x);
console.info(delete o.x);
console.info(delete o.toString);
console.info(delete 1);


console.info("--------------------检测属性-------------------")
//1.4检测属性
// in 检测自由属性和继承属性, hasOwnProperty() 检测自有属性, propertyIsEnumerable() 检测自有自有属性且这个属性的可枚举性为true时，才会返回true

var pro4Check  = {x:1};
console.info("x" in pro4Check)
console.info("y" in pro4Check)
console.info("toString" in pro4Check)

var proIsEnum = inherit({y:2})
proIsEnum.x = 1

console.info(proIsEnum.propertyIsEnumerable("x"))
console.info(proIsEnum.propertyIsEnumerable("y"))
console.info(Object.prototype.propertyIsEnumerable("toString")) //false, 因为toString是不可枚举的

// in 和 != undefined 效果一样
console.info("-----------   !==undefined 来判断一个属性是否存在    -----------")
var checkPro = {x:1}
console.info(checkPro.x !== undefined)
console.info(checkPro.y !== undefined)
console.info(checkPro.toString !== undefined)


console.info("-------------- !==undefined 不能判断一个属性存在但是值为undefined的情况    --------------")
/**
 * 有一种情况只能使用in，不能使用undefined,就是存在属性，属性的值就是undefined
 *
 * */
var oo = {x:undefined}
console.info(oo.x !== undefined)
console.info(oo.y !== undefined)
console.info("y" in oo)
console.info("x" in oo)
console.info(delete oo.x)
console.info("x" in oo)


// !== 可以区分null 或 undefined
console.info("--------------    !== 和 != 的区别    --------------")
var ooo = {x:111}
if (ooo.x != null ) {
    ooo.x *= 2;
}
console.info(ooo.x)
//如果x是undefined, null, false, " ", 0 或者NaN
if (ooo.x) {
    ooo.x *= 2;
}

console.info("--------------    枚举属性    --------------")
//1.5 枚举属性
//对象继承的内置方法不可枚举，但是在代码里给对象添加的属性都是可枚举的
//除了for in 可枚举的自有属性和继承属性
//还可以Object.keys(); 可枚举的自有属性的名称
//Object.getOwePropertyNames(); 对象所有的自有属性，不仅仅是可枚举

var enums = {x:1, y:2, sum: function () {

}};

console.info(enums.propertyIsEnumerable("toString"));
for (var p in enums) {
console.info(p);
}

//很多实用工具给Object.prototype 里添加方法和属性，那么所有的对象可以继承。而且在e5之前，这些都是必须是可枚举的。

Object.prototype.calculate = function () {
    console.info("calculate.....");
}

console.info("---------    测试从Object.prototype 继承属性  ------------")
var temp = {"x":"x"};
for (var p in temp) {
    console.info(p);
}

console.info("---------    测试从Object.prototype 继承属性，跳过去  ------------")
for (var p in temp) {
    if (!temp.hasOwnProperty(p)) {
        continue;
    }
    console.info(p);
}

for (var p in temp) {
    if ("function" === typeof o[p]) {
        continue;
    }
    console.info(p);
}



var names = Object.keys(temp);  //仅仅是可枚举的属性
console.info(names)
var namesSelf = Object.getOwnPropertyNames(temp);   //自有属性,不仅仅是可枚举
console.info(namesSelf)




//1.5 getter/setter
//getter/setter 可以继承
var p = {
    x: 1.0,
    y: 1.0,

    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newValue) {
        var oldValue = Math.sqrt(this.x * this.x +  this.y * this.y);
        var ratio = newValue / oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() {
        return Math.atan2(this.y, this.x);
    }
};
console.info(p.r);

var sonOfP = inherit(p);
sonOfP.x = 2.0
sonOfP.y = 2.0
console.info(sonOfP.r)


//1.6 属性的特性
/**
 *
 * 数据属性的4个特性：值，可写性，可枚举，可配置性
 * 存储器属性不具备值特性和可写性
 * 存储器属性的4个特性：读取，写入，可枚举性，可配置性
 *
 * 如何查询和设置属性特性?
 * */

var obj4Descriptor = {x:1, get r(){return 1;}}
var propertyDescription = Object.getOwnPropertyDescriptor(obj4Descriptor, "x");
console.info(propertyDescription)   //属性描述符 { value: 1, writable: true, enumerable: true, configurable: true }

propertyDescription = Object.getOwnPropertyDescriptor(obj4Descriptor, "r");
console.info(propertyDescription)
/**
 * { get: [Function: get r],
  set: undefined,
  enumerable: true,
  configurable: true }

 * */

//对于继承属性和不存在的属性，返回undefined
Object.getOwnPropertyDescriptor({}, "x");       //返回undefined
Object.getOwnPropertyDescriptor({}, "toString");    //返回undefined


//为一个对象定义属性描述符
var emptyObj = {};
Object.defineProperty(emptyObj, "name", {configurable: true,
                                            enumerable: false,
                                            writable: true,
                                        value: "dongchunxu"});
console.info(emptyObj.name);
console.info(Object.keys(emptyObj))

//现在对属性name做修改，设置成只读
Object.defineProperty(emptyObj, "name", {writable:false});
emptyObj.name = "chunxu";
console.info(emptyObj.name) //结果还是dongchunxu，修改并不成功

//可以通过这种方式进行修改，因为是可配置的
Object.defineProperty(emptyObj, "name", {value: "chunxu"})
console.info(emptyObj.name)

//还可以将name数据属性修改为存储器属性
Object.defineProperty(emptyObj, "name", {get: function () {
   return "xu";
} })
console.info(emptyObj.name)




//1.7 对象的三个特性
/**
 * 原型: isPrototypeOf()
 *
 * */
console.info("---------------   对象的三个特性   -----------------");
//原型
var prototype = Object.getPrototypeOf(emptyObj);    //e5
console.info(prototype)

console.info(emptyObj.constructor.prototype);   //e3, 但是并总是准确
//

var a = Object.create({x:1});
console.info(a.constructor.prototype)
a = {};
console.info(a.constructor.prototype)

//参考P138. 这里书上说这么判断并不可靠


var pp = {x: 1};
var o = Object.create(pp);
console.info(pp.isPrototypeOf(o));
console.info(Object.prototype.isPrototypeOf(pp));



//类名。e3，e5都没有直接的方法查询
//[object class] 原始的Object.prototype.toString() 没有重写的话可以直接调
console.info("-----------   查看类名    ---------")

function classof(o) {
    if (o == null)  return "Null"
    if (o == undefined) return "Undefined"
    return Object.prototype.toString.call(o).slice(8, -1);
}

console.info(classof(null))
console.info(classof(1))
console.info(classof(""))
console.info(classof(false))
console.info(classof({}))
console.info(classof([]))
console.info(classof(/./))
console.info(classof(new Date()))
//console.info(classof(window))
function f() {
}
console.info(classof(f))


console.info("--------------------- 对象的可扩展性 ------------------")
//对象的可扩展性（是否可以给对象添加新属性） 所有内置对象和自定义对象都是现实可扩展的
//如何设置和查询对象的可扩展性
var extendsObj = {"x":1};
var result = Object.isExtensible(extendsObj);
console.info(result);

//这是不可逆的
Object.preventExtensions(extendsObj);
result = Object.isExtensible(extendsObj);
console.info(result);

//此时如果给extendsObj的对象的原型添加属性， extendsObj依然可以继承


//seal 除了会将对象设置为不可配置的，还可以将对象的所有自由属性，都设置为不可配置的
console.info(Object.getOwnPropertyDescriptor(extendsObj, "x"));
Object.seal(extendsObj);
console.info(Object.getOwnPropertyDescriptor(extendsObj, "x"));

Object.isSealed(extendsObj);    //检测是否封闭

console.info("------------  将对象冻结 -----------") //除了seal的操作，还会把所有数据属性设置为只读，如果有setter则不受影响
Object.freeze(extendsObj);
console.info(Object.getOwnPropertyDescriptor(extendsObj, "x"));




//1.8 序列化对象
//e5 自带方法
var test4JsonObj = {name: "dongchunxu", score: 99.0}
var jsonObj = JSON.stringify(test4JsonObj)
console.info(jsonObj)

var originObj = JSON.parse(jsonObj);
console.info(originObj)


//1.9 对象方法
//Object.prototype 里定义的方法
//1 toString(); 在对象需要转换成字符串的时候都会调用这个方法

var s = {x:1, y:1}.toString();
console.info(s.slice(8, -1))

//2 toLocaleString()
console.info(new Date().toLocaleString())
console.info(new Date())
console.info([12,34].toLocaleString())
console.info([12,34].toString())

















































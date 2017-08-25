/**
 * Created by dongchunxu on 2017/8/14.
 */

"use strict";   //使用严格模式
/**
 * 函数调用的4种方式
 *  1. 作为函数
 *  2. 作为方法
 *  3. 作为构造函数
 *  4. 作为它们的call()和apple()方法调用
 * */
var log = console.info.bind(console);


/*
*  在e3 和非严格模式下的e5, 调用上下文是全局对象（即this的值）然后在严格模式下，调用上下文是undefined
*
* */
function func1() {
    return this;
}

var f = func1()
log(f)

var strict = (function () { return !this }());
log("当前是否是严格模式:" + strict)


//作为方法
var o = {
    name: "dongchunxu",
    age: 12,
    add: function () {
        this.result =  "name=" + this.name + ", age=" + this.age;
    }
};

o.add()
log(o.result)


log("---------------关于this-----------------")
//this
var o2 = {
    m: function () {
        var self = this;
        log(this)
        f()

        function f() {
           log(this );
           log(self === o2);
        }
    }
}

o2.m()
log("---------------构造函数-----------------")
var oo = new o2.m();
log(oo)






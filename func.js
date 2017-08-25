/**
 * Created by dongchunxu on 2017/8/13.
 */

var log = console.log.bind(console);

log("result: " + sum)


//1.1 函数的定义： 函数定义表达式和函数声明表达式
//函数定义表达式
//一般都不要名字，用于那些只会用到一次的场景
var sum = function sumalias() { //这里的名字sumalias可以省略.什么时候用到呢？递归的时候用到
    log("function name 在函数定义表达式中代表什么: " + sumalias);
    log(typeof sumalias)

    var result = 0;
    for (var i = 0; i < 1000; i++) {
        result += i;
    }
    return result;
}

var result = sum();
log("result: " + result)



//函数声明表达式
function calculate() {
    var result = 0;
    for (var i = 0; i < 1000; i++) {
        result += i;
    }
    return result;
}
var result = calculate();
log("result: " + result)

/*
*   函数定义和函数声明有啥区别？
*   函数声明语句通常出现在JavaScript代码的最顶层， 也可以嵌套在其他函数体内
*
*   两种方式都包含相同的函数名。
*   都创建的新的函数对象，但是函数声明语句的函数名是一个变量名，变量指向函数对象
*
*   因为函数声明语句被提前到了外部脚本或外部函数作用于的顶部，所以以这种方式声明的函数，可以在它被定义之前出现的代码调用
*   而以表达式定义的函数，必须赋值给一个变量，变量的声明提前了，但是变量赋值不会提前
*
*
*
* **/


//函数定义后立即执行
var tensquared = function (x) {return x*x;}(10);
log("函数定义后立即执行: "+tensquared);



var arr = [12,34,2,45,23,453,67];
arr.sort(function (a, b) {
    return a - b;
});

log("函数表达式可以作为参数传给其他函数: " + arr);



//log(aaaa);  //这里会报错，以为aaaa没有定义过
log(bbbb);  //这里bbbb为undefined，但是不会报错，因为bbbb的声明被提前了
var bbbb = function() {
}

log(bbbb);




//1.1.2 嵌套函数
log(typeof outterFunc)
function outterFunc() {
    var x = 100;
    function innerFunc() {
        console.info("this is inner function." + x);
    }

    return innerFunc;
}

log(outterFunc()())










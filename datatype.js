//基本类型 只有三种
var num = 100;
var fnum = 100.2;

var str = "字符串";

var b = true;


console.info(typeof  num);
console.info(typeof  fnum);
console.info(typeof  str);
console.info(typeof  b);


console.info("------------ split line ---------")
//两个特殊的原始值
var s1 = null;
var s2 = undefined;
console.info(typeof s1);
console.info(typeof s2);


//数字
//NaN 不与任何值相等，所以判断一个变量的值是不是NaN
var x = NaN;
if (x != x) {
    console.info("x is NaN");
}

var isNa = isNaN(x);
console.info(isNaN);


console.info("------------ split line ---------")
//日期
var startTime = new Date('2016', '12', '22');
var endTime = new Date();

var diff = endTime - startTime;
console.info(diff / 3600000 / 24);


console.info("------------- split line------------")
var str = "hello,world";
var s = str.charAt(0);
console.info(s);

var sub = str.substring(1, 4);
console.info(sub);

var sub2 = str.slice(1, 4);
console.info(sub2)

sub2 = str.slice(-2);
console.info(sub2)


console.info("------------------- 其他值和布尔值转换的问题----------------------")
console.info(undefined ?"undefined is true":"undefined is false");
console.info(NaN ?"NaN is true":"NaN is false");
console.info(null ?"null is true":"null is false");
console.info(0 ?"0 is true":"0 is false");
console.info(-0 ?"-0 is true":"-0 is false");
var bool = new Boolean(false);
console.info(bool ?"Boolean(false) is true":"Boolean(false) is false");



var strstr = new String("initialized");
console.info(strstr.substring(0, 4));


///字符串到数字的转换
var numWrapper = new Number("199223.23");
console.info(numWrapper);
var str2Int = parseInt("1212323.34");
console.info(str2Int);
var str2Float = parseFloat("123213.3434");
console.info(str2Float);


//数字到字符串的转换
var num2Str = 100;
console.info(num2Str.toString(2));
console.info(num2Str.toString());
console.info(num2Str.toString(8));



console.info("------------------- 对象到字符串和对象到数字----------------------")

var arr2Str = [12,34,5];

console.info(arr2Str);
console.info(arr2Str.toString());
console.info(arr2Str.valueOf());
console.info("" + arr2Str)
console.info("------------ split line ---------")


var func2Str = function () {
    return "hello";
}
console.info(func2Str);
console.info(func2Str.toString());
console.info(func2Str.valueOf());
console.info("" + func2Str)
console.info("------------ split line ---------")



var date2Str = new Date();
console.info(date2Str);
console.info(date2Str.toString());
console.info(date2Str.valueOf());
console.info(date2Str + "")
console.info("------------ split line ---------")


var regx2Str = new RegExp("\\d+");
console.info(regx2Str);
console.info(regx2Str.toString());
console.info(regx2Str.valueOf());
console.info(regx2Str + "")

console.info("------------ split line ---------")


var data = [7,8,9];
console.info(7 in data);
console.info("7" in data);
console.info(0 in data);



console.info("------------  遍历数组    ----------");
var arr4Foreach = ["hello", 213, function () {
    return "this is a func";
}]

arr4Foreach.forEach(function (x) {
   console.info(x);
});

console.info(Array.isArray(arr4Foreach));














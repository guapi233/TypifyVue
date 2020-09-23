/**
 * Typescript 基础语法 学习
 *
 * 1. 环境搭建：全局安装 typescript ts-node，使用 tsc 编译ts文件，或使用 ts-node 直接执行ts文件
 */

// -- 基础类型 ------------------------------------------------------------------------------------
let a: number = 123;
let b: string = "123";
let c: null = null;
let d: boolean = true;
let e: undefined = undefined;
// let f: symbol = Symbol(); // ts-node 默认不认symbol

// -- 对象类型 ------------------------------------------------------------------------------------
let student: {
  name: string;
  age: number;
} = {
  name: "崔永杰",
  age: 19,
};

let numbers: number[] = [1, 2, 3];
let stringOrNumberArr: (number | string)[] = [1, "2"];

// 对象数组
let objArr: { name: string; age: number }[] = [
  {
    name: "cyhj",
    age: 152,
  },
];
// 也可以这样写 type alias 类型别名
type demo = { name: string; age: number };
let objArr2: demo[] = [
  {
    name: "cyhj",
    age: 152,
  },
];

// 元组 例：我的数组中就3个元素，第一个一定是string， 第二个一定是boolean， 第三个一定是number
const tupleDemo: [string, boolean, number] = ["崔永杰", true, 19];

// -- 类与函数 ------------------------------------------------------------------------------------
// 支持 public、private、protected、readonly、abstract(抽象类，就是其子类必须实现抽象类中的抽象方法/属性) 关键字
class Student {}
let cyj: Student = new Student();

function sum(num1: number, num2: number): number {
  return num1 + num2;
}

let sum2 = (num1: number, num2: number): number => {
  return num1 + num2;
};

// 无返回值 函数
let voidFn = (): void => {
  // not return anything
};

// 结构语法 必须以以下方式进行注解
let resetFn = ({ name }: { name: string }) => {
  console.log(name);
};

// -- interface ------------------------------------------------------------------------------------
// 与 type alias 的区别是 type可以替代基础类型，interface不能，type比interface更强大，但是能用interface还是用interface
interface Person {
  name: string;
  readonly age: number; // 只读
  tip?: string; // 可有可无
  [propName: string]: any; // 允许添加更多的key为string类型的，value为any类型的属性
  say?(val: string): void; // 可有可无的、参数为string类型的，无返回值的，名为say的方法
}

let interfaceDemo: Person = {
  name: "Sti",
  age: 19,
  say(val: string) {},
};

// 类应用接口
class InterfaceAndClass implements Person {
  name = "aa";
  age = 19;
}

let iAndC = new InterfaceAndClass();
// console.log(iAndC.name);

// interface 继承
interface Stu extends Person {
  stu: string;
}

let stu: Stu = {
  name: "崔永杰",
  age: 19,
  stu: "a",
};

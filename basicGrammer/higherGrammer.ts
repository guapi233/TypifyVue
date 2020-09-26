/**
 * Typescript 进阶语法 学习
 *
 */

// -- 类型保护 / 类型断言 ------------------------------------------------------------------------------------
interface Bird {
  fly: Boolean;
  sing(): void;
}

interface Dog {
  run: Boolean;
  bark(): void;
}

function yell(animal: Bird | Dog) {
  // TS 无法通过判断语句直接鉴定 animal 的类型，所以需要通过断言手动指定
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// -- Enum 枚举类型 ------------------------------------------------------------------------------------
enum States {
  ONE,
  TWO,
  THREE,
}

// 类似于，枚举类型也可以通过值找到键
const States2 = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
};

// -- 函数 泛型 ------------------------------------------------------------------------------------
// 可以指定多个泛型
function join<ABC>(first: ABC, second: ABC) {
  return `${first}${second}`;
}

// 如果指定什么类型，ABC就是什么类型，而且first 和 second 都必须相同，因为他俩都是ABC类型
// 如果调用时不指定，TS会根据传入的参数自动推断
join<string>("1", "1");

// 泛型继承
interface Item {
  name: string;
}

function join2<ABC extends Item>(fist: ABC) {
  return 1;
}

function join3<ABC extends string | number>(fist: ABC) {
  return 1;
}

// 因为 ABC 继承的 Item要求传入的类型中必须包含 name 属性，所以。。。
join2({ name: "cyj" });

// -- namespace ------------------------------------------------------------------------------------
// 略

// -- parcel & TS描述文件 ------------------------------------------------------------------------------------
// 略

// -- keyof ------------------------------------------------------------------------------------
const keyofDemo = {
  name: "cyj",
  age: 48,
};

type keyofT = "name";

function getInfo(key: keyofT) {
  return this.keyofDemo[key];
}

// 只能传 "name",  只能等于 "name"
getInfo("name");
let keofA: keyofT = "name";

interface KeyofDemo {
  name: string;
  age: number;
}

function getInfo2<keyofT2 extends keyof KeyofDemo>(key: keyofT2) {
  return this.keyofDemo[key];
}

// 只能穿 “name" 或 ”age"
getInfo2("name");
getInfo2("age");

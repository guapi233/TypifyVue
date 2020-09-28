/**
 * 使用装饰器时要在 tsconfig.json 中启用这两项
 * emitDecoratorMetadata: true /* Enables experimental support for emitting type metadata for decorators.
 * experimentalDecorators": true /* Enables experimental support for ES7 decorators.
 */

// -- 类的装饰器 ------------------------------------------------------------------------------------
/**
 * 1. 装饰器是一个函数，参数为 类的构造函数
 * 2. 装饰器通过 @[装饰器名] 的方式调用
 * 3. 装饰器的调用顺序是从下往上
 */

function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log("??");
  };
}

@testDecorator
class Test {}

let test = new Test();

// (test as any).getName();

/**
 * 装饰器还可以包裹一层,
 * 外面一层接收一个 布尔值， 决定返回的装饰器
 */

function decWrap(flag: boolean) {
  if (!flag) return function () {};

  return function (constructor: any) {
    constructor.prototype.getName = () => {
      console.log("!!");
    };
  };
}

@decWrap(true)
class Test2 {}

/**
 * 正确的编写方式
 */
function trueDecorator() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      name = "lee";
      getName() {
        return this.name;
      }
    };
  };
}

let Test3 = trueDecorator()(
  class {
    constructor(public name: string) {}
  }
);

let test3 = new Test3("??");
// console.log(test3.getName());

// -- 方法的装饰器 ------------------------------------------------------------------------------------
/**
 * 普通方法 target 为类的 prototype， key 为方法名 ， descriptor 为 配置项（类似于Object.defineproperty中的)
 * 静态方法 target 为类的 构造函数
 */

function methodDecorator(target: any, key: string, decorator: any) {
  // console.log(target, key);

  // 不允许在外面修改该方法
  decorator.writable = false;
  // 更改函数实际功能
  decorator.value = function () {
    return "???";
  };
}

class Test4 {
  @methodDecorator
  getName() {
    return "aaa";
  }
}

let test4 = new Test4();
// test4.getName = function () {
//   return "bb";
// }; 不能改
// console.log(test4.getName());

/**
 * 如果要对类中的 getter 和 setter 使用装饰器，则二者不能同时使用一种装饰器
 */

// -- 属性的装饰器 ------------------------------------------------------------------------------------
/**
 * 普通方法 target 为类的 prototype， key 为属性名 （属性装饰器中没有 描述器，如果要对属性进行配置，可以参考以下方法）
 * 静态方法 target 为类的 构造函数
 */

function propertyDecorator(target: any, key: string): any {
  // 修改得不是实例上的name 而是原型上的 name
  target[key] = "???";
  // 使被修饰的属性无法修改
  // const descriptor: PropertyDescriptor = {
  //   writable: false,
  // };

  // return descriptor;
}

class Test5 {
  @propertyDecorator
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

let test5 = new Test5("??");
// test5.name = "??";
// console.log(test5.name);

// -- 属性的装饰器 ------------------------------------------------------------------------------------
/**
 * 用法没啥变化，放在属性前即可
 * 参数有三个：原型，方法名，参数索引
 */

// -- 装饰器例子 ------------------------------------------------------------------------------------
function catchError(msg: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const fn = desc.value;
    desc.value = function () {
      try {
        fn();
      } catch (err) {
        console.log(msg);
      }
    };
  };
}

class Test6 {
  @catchError("名字错了")
  sayName() {
    throw new Error();
  }

  @catchError("年龄错了")
  sayAge() {
    throw new Error();
  }
}

let test6 = new Test6();
// test6.sayAge();
// test6.sayName();

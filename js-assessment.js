function indexOf(arr, item) {
    return arr.indexOf(item);
  }
  // 查找数组元素位置
  // 找出元素 item 在给定数组 arr 中的位置
  // 如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
  // [ 1, 2, 3, 4 ], 3  --->  2
  
  function remove(arr, item) {
    return arr.filter(function (ele) {
      return ele != item;
    });
  }
  // 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
  // [1, 2, 3, 4, 2], 2 ---> [1, 3, 4]
  
  function removeWithoutCopy(arr, item) {
    var itemIndex = arr.indexOf(item);
    if (itemIndex != -1) {
      arr.splice(itemIndex, 1);
      removeWithoutCopy(arr, item);
    }
    return arr;
  }
  function removeWithoutCopy(arr, item) {
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == item) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  // 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
  
  function append(arr, item) {
    return [...arr, item];
  }
  // 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
  
  function truncate(arr) {
    return arr.slice(0, -1);
  }
  // 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
  
  function prepend(arr, item) {
    return [item].concat(arr);
  }
  // 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
  
  function curtail(arr) {
    return arr.slice(1);
  }
  // 删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
  
  function concat(arr1, arr2) {
    return [...arr1, ...arr2];
  }
  // 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
  
  function insert(arr, item, index) {
    let newArr = arr.slice(); // let newArr = [...arr]
    newArr.splice(index, 0, item);
    return newArr;
  }
  // 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
  
  function count(arr, item) {
    let num = 0;
    arr.forEach((element) => {
      if (element === item) {
        num += 1;
      }
    });
    return num;
  }
  // 统计数组 arr 中值等于 item 的元素出现的次数
  
  function duplicates(arr) {
    var result = [];
    arr.forEach((elem) => {
      if (
        arr.indexOf(elem) !== arr.lastIndexOf(elem) &&
        result.indexOf(elem) === -1
      ) {
        result.push(elem);
      }
    });
    return result;
  }
  // 找出数组 arr 中重复出现过的元素
  // [1, 2, 4, 4, 3, 3, 1, 5, 3] --->  [1, 3, 4]
  
  function square(arr) {
    return arr.map((item) => {
      return item * item;
    });
  }
  // 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
  
  function findAllOccurrences(arr, target) {
    const rlt = [];
    arr.forEach((item, idx) => {
      if (item === target) {
        rlt.push(idx);
      }
    });
    return rlt;
  }
  // 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
  
  function globals() {
    let myObject = {
      name: "Jory",
    };
    return myObject;
  }
  // 给定的 js 代码中存在全局变量，请修复
  // function globals() {
  //   myObject = {
  //     name: "Jory"
  //   };
  //   return myObject;
  // }
  
  // 解析：当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
  // 举例，如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
  function parse2Int(num) {
    return parseInt(num, 10);
  }
  // 修改 js 代码中 parseInt 的调用方式，使之通过全部测试用例
  // function parse2Int(num) {
  //     return parseInt(num);
  // }
  // '12' --> 12
  // '12px' --> 12
  // '0x12' --> 0
  
  function count(start, end) {
    if (start <= end) {
      console.log(start);
      start++;
      timeoutId = setTimeout(() => {
        count(start, end);
      }, 100);
    }
    return {
      cancel: () => {
        clearTimeout(timeoutId);
      },
    };
  }
  // 实现一个打点计时器，要求:
  // 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
  // 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
  // 3、第一个数需要立即输出
  
  function fizzBuzz(num) {
    if (num % 3 == 0 && num % 5 == 0) {
      return "fizzbuzz";
    } else if (num % 3 == 0) {
      return "fizz";
    } else if (num % 5 == 0) {
      return "buzz";
    } else if (num == null || typeof num != "number") {
      return false;
    } else {
      return num;
    }
  }
  // 实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
  // 1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
  // 2、如果 num 能被 3 整除，返回字符串 fizz
  // 3、如果 num 能被 5 整除，返回字符串 buzz
  // 4、如果参数为空或者不是 Number 类型，返回 false
  // 5、其余情况，返回参数 num
  
  // 解析：call需要将传递给函数的参数明确写出来；而apply则将传递给函数的参数放入一个数组中，传入参数数组即可。
  function argsAsArray(fn, arr) {
    return fn.apply(this, arr);
  }
  // 将数组 arr 中的元素作为调用函数 fn 的参数
  
  // apply、call、bind 三者都可以利用后续参数传参；
  // bind 是返回对应函数，便于稍后调用；apply、call则是立即调用。
  function speak(fn, obj) {
    return fn.apply(obj);
  }
  function speak(fn, obj) {
    return fn.call(obj);
  }
  function speak(fn, obj) {
    return fn.bind(obj)();
  }
  //将函数 fn 的执行上下文改为 obj 对象
  
  function functionFunction(str) {
    var f = function (s) {
      return str + ", " + s;
    };
    return f;
  }
  // 实现函数 functionFunction，调用之后满足如下条件：
  // 1、返回值为一个函数 f
  // 2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
  // 3、所有函数的参数数量为 1，且均为 String 类型
  
  function makeClosures(arr, fn) {
    var result = [];
    for (let i = 0; i < arr.length; i++) {
      result[i] = function () {
        return fn(arr[i]); //let声明的变量只在let所在代码块内有效，因此每次循环的i都是一个新的变量
      };
    }
    return result;
  }
  // 闭包
  // 实现函数 makeClosures，调用之后满足如下条件：
  // 1、返回一个函数数组 result，长度与 arr 相同
  // 2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
  
  function partial(fn, str1, str2) {
    function result(str3) {
      return fn.call(this, str1, str2, str3);
    }
    return result;
  }
  function partial(fn, str1, str2) {
    return fn.bind(this, str1, str2);
  }
  // 已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
  // 1、返回一个函数 result，该函数接受一个参数
  // 2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致
  
  // reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
  function useArguments(...args) {
    return args.reduce((a, b) => a + b);
  }
  // 使用arguments
  // 函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。
  
  function callIt(fn, ...args) {
    return fn(...args);
  }
  // 实现函数 callIt，调用之后满足如下条件
  // 1、返回的结果为调用 fn 之后的结果
  // 2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
  
  function partialUsingArguments(fn, ...args1) {
    function result(...args2) {
      return fn(...args1, ...args2);
    }
    return result;
  }
  // 实现函数 partialUsingArguments，调用之后满足如下条件：
  // 1、返回一个函数 result
  // 2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
  // 3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数
  //
  //
  //
  // 函数柯里化是把接受多个参数的函数转变成接受一个单一参数(最初函数的第一个参数),并且返回接受余下的参数而且返回结果的新函数的技术
  function curryIt(fn) {
    return (a) => (b) => (c) => fn(a, b, c);
  }
  // 已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
  // 1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
  // 2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
  // 3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
  // 4、调用 c 之后，返回的结果与调用 fn 的返回值一致
  // 5、fn 的参数依次为函数 a, b, c 的调用参数
  //
  //
  //
  // 在正则表达式中，利用()进行分组，使用斜杠加数字表示引用，\1就是引用第一个分组，\2就是引用第二个分组。将[a-zA-Z]做为一个分组，然后引用，就可以判断是否有连续重复的字母。
  function containsRepeatingLetter(str) {
    return /([a-zA-Z])\1/.test(str);
  }
  // 扩展，替换到这个重复字母
  function containsRepeatingLetter(str) {
    return str.replace(/([a-zA-Z])\1/, "");
  }
  // 检查重复字符
  // 给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false
  // function containsRepeatingLetter(str) {}
  //
  //
  //
  function endsWithVowel(str) {
    return /[a,e,i,o,u]$/i.test(str);
  }
  // 判断是否以元音字母结尾
  // 给定字符串 str，检查其是否以元音字母结尾
  // 1、元音字母包括 a，e，i，o，u，以及对应的大写
  // 2、包含返回 true，否则返回 false
  // function endsWithVowel(str) {}
  //
  //
  //
  // 依题，若存在连续的三个任意数字，则返回最早出现的三个数字，若不存在，则返回false。因此需要用到String的match方法，match()返回的是正则表达式匹配的字符串数组，连续的三个任意数字用正则表达式表示为/\d{3}/。
  function captureThreeNumbers(str) {
    let arr = str.match(/\d{3}/);
    if (arr) {
      return arr[0];
    } else {
      return false;
    }
  }
  // 给定字符串 str，检查其是否包含 连续3个数字
  // 1、如果包含，返回最先出现的3个数字的字符串
  // 2、如果不包含，返回 false
  // 输入：1aaa11666
  // 输出：666
  // function captureThreeNumbers(str) {}
  //
  //
  //
  function matchesPattern(str) {
    return /^\d{3}\-\d{3}\-\d{4}$/.test(str);
  }
  // 给定字符串 str，检查其是否符合如下格式
  // 1、XXX-XXX-XXXX
  // 2、其中 X 为 Number 类型
  // function matchesPattern(str) {}
  //
  //
  //
  function containsNumber(str) {
    return /\d/.test(str);
  }
  // 给定字符串 str，检查其是否包含数字，包含返回 true，否则返回 false
  // function containsNumber(str) {}
  //
  //
  //
  function iterate(obj) {
    const rlt = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        rlt.push(key + ": " + obj[key]);
      }
    }
    return rlt;
  }
  // 找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
  // 1、返回数组，格式为 key: value
  // 2、结果数组不要求顺序
  // function iterate(obj) {}
  
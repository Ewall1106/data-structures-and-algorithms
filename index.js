/*
【目录】
数组、栈
队列、优先队列
链表
集合、字典、散列表
树、二叉树、二叉搜索树
递归、分治
图、DFS、BFS
动态规划、贪心算法
排序、搜索算法
  ....
*/

/* -------------------------- 数组、栈 ---------------------------*/

/*
【缺失数字】
https://leetcode-cn.com/problems/missing-number/
给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。

示例 1:
输入: [3,0,1]
输出: 2

示例 2:
输入: [9,6,4,2,3,5,7,0,1]
输出: 8
说明:
你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?

logs：5
[✔️]2020.05.15
[✔️]2020.05.16
[✔️]2020.05.19
[✔️]2020.05.26
[✔️]2020.06.16
*/

// 解法1：排序。排完序以后与数组下标比较。时间复杂度O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i != nums[i]) return i;
  }
  return nums.length;
};

// 解法2：哈希表。时间复杂度O(n)、空间复杂度O(n)
var missingNumber = function (nums) {
  let set = new Set([...nums]);
  for (let i = 0; i < nums.length; i++) {
    if (!set.has(i)) return i;
  }
  return nums.length;
};

// 位运算。时间复杂度O(n)、空间复杂度O(1)
var missingNumber = function (nums) {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
};

//
// -------divider-------
//

/*
【存在重复元素】
https://leetcode-cn.com/problems/contains-duplicate/
给定一个整数数组，判断是否存在重复元素。
如果任意一值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false 。

示例 1:
输入: [1,2,3,1]
输出: true

示例 2:
输入: [1,2,3,4]
输出: false

示例 3:
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true

logs：5
[✔️]2020.05.15
[✔️]2020.05.16
[✔️]2020.05.19
[✔️]2020.05.26
[✔️]2020.06.16
*/

// 解法1：对数组去重以后在比较length
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  return Array.from(new Set(nums)).length !== nums.length;
};
var containsDuplicate = function (nums) {
  return new Set(nums).size !== nums.length;
};

// 解法2：暴力破解法。把每个元素都排查一遍。
var containsDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) !== nums.lastIndexOf(nums[i])) {
      return true;
    }
  }
  return false;
};

// 解法3：使用排序。排序之后对比相邻元素，看是否重复。时间复杂度取决于排序效率：使用快排O(nlogn)
var containsDuplicate = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] == nums[i + 1]) return true;
  }
  return false;
};

// 解法4：使用hash。空间换时间，时间复杂度O(n)、空间复杂度O(n)
var containsDuplicate = function (nums) {
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }
  return false;
};

//
// -------divider-------
//

/*
【旋转数组】
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
https://leetcode-cn.com/problems/rotate-array/

示例 1:
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]

示例 2:
输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]

说明:
尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为 O(1) 的原地算法。

logs：5
[✔️]2020.05.12
[✔️]2020.05.14
[✔️]2020.05.16
[✔️]2020.06.05
[✔️]2020.06.15
*/

// 解法1：暴力破解法。旋转 k 次，每次将数组旋转 1 个元素。时间复杂度：O(n*k) 。每个元素都被移动n步，移动k轮 。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  let pre, temp;
  for (let i = 0; i < k; i++) {
    pre = nums[nums.length - 1];
    for (let j = 0; j < nums.length; j++) {
      temp = nums[j];
      nums[j] = pre;
      pre = temp;
    }
  }
  return nums;
};

// 解法2：使用额外数组。时间复杂度O(n)、空间复杂度O(n)
var rotate = function (nums, k) {
  let arr = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    arr[(i + k) % nums.length] = nums[i]; // 假设i=5，在你本身的位置i基础上往右移3超过了边界2步，沿着从头再继续移
  }
  // 根据题目要求需要去改变原数组
  for (let i = 0; i < nums.length; i++) {
    nums[i] = arr[i];
  }
  return nums;
};

// 解法3：使用环状替换。时间复杂度O(n)、空间复杂度O(1)
// https://leetcode-cn.com/problems/rotate-array/solution/xuan-zhuan-shu-zu-yuan-di-huan-wei-xiang-xi-tu-jie/
// 为什么需要count来记录？当nums=[1,2,3,4]、k=2这种情况的时候，第二轮的时候3移动两步刚好移到了位置1，座位上没有同学。
var rotate = function (nums, k) {
  let count = 0; // 记录交换位置的次数，num.length个同学一共需要换num.length次
  for (let i = 0; count < nums.length; i++) {
    let currentIdx = i;
    let current = nums[i];
    do {
      let nextIdx = (currentIdx + k) % nums.length;
      let next = nums[nextIdx];
      nums[nextIdx] = current;
      current = next;
      currentIdx = nextIdx;
      count++;
    } while (i != currentIdx);
  }
  return nums;
};

// 解法4：中心反转。在这个方法中，我们首先将所有元素反转。然后反转前 k 个元素，再反转后面 n−k 个元素，就能得到想要的结果。时间复杂度O(n)、空间复杂度O(1)
var rotate = function (nums, k) {
  k %= nums.length;
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);

  function reverse(start, end) {
    while (start < end) {
      let temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  }
};

// 解法5：使用js的splice方法，将后面 k%n 个元素 从原数组删除出来并拼接到数组前面即为所求
var rotate = function (nums, k) {
  k = k % nums.length;
  nums.splice(0, 0, ...nums.splice(nums.length - k));
};

// 解法6：使用push和pop操作
var rotate = function (nums, k) {
  k = k % nums.length;
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
};

//
// -------divider-------
//

/*
【合并两个有序数组】
https://leetcode-cn.com/problems/merge-sorted-array/
给你两个【有序】整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:
初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
输出: [1,2,2,3,5,6]

logs：5
[✔️]2020.05.11
[✔️]2020.05.14
[✔️]2020.06.01
[✔️]2020.06.05
[✔️]2020.06.17
*/
// 解法1：暴力解法、归并。把两个数字合并以后再排序，这个是利用了输入数组已经排好序的特性，时间复杂度时间复杂度 : O((n + m)log(n + m))、空间复杂度 : O(1)。
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2);
  return nums1.sort((a, b) => a - b);
};

// 解法2：双指针。
// 因为 nums1 的空间都集中在后面，所以从后向前处理排序的数据会更好，节省空间，一边遍历一边将值填充进去
// 设置指针 len1 和 len2 分别指向 nums1 和 nums2 的有数字尾部，从尾部值开始比较遍历，同时设置指针 len 指向 nums1 的最末尾，每次遍历比较值大小之后，则进行填充
// 当 len1<0 时遍历结束，此时 nums2 中若还有数据未拷贝完全，则说明都是比num1最小的还要小，因为是已经排好序的，所以就将其直接拷贝到 nums1 的前面，最后得到结果数组
// 时间复杂度：O(m+n)
var merge = function (nums1, m, nums2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;
  while (len1 >= 0 && len2 >= 0) {
    nums1[len--] = nums1[len1] > nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
  return nums1.splice(0, len2 + 1, ...nums2.slice(0, len2 + 1));
};

//
// -------divider-------
//

/*
【加一】
https://leetcode-cn.com/problems/plus-one/
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加1。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。

示例 2:
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。

logs：5
[✔️]2020.05.10
[✔️]2020.05.11
[✔️]2020.06.01
[✔️]2020.06.05
[✔️]2020.06.17
*/

// 解析：
// 1、末位无进位，则末位加一即可，因为末位无进位，前面也不可能产生进位，比如 45 => 46
// 2、末位有进位，在中间位置进位停止，则需要找到进位的典型标志，即为当前位 %10后为 0，则前一位加 1，直到不为 0 为止，比如 499 => 500
// 3、末位有进位，并且一直进位到最前方导致结果多出一位，对于这种情况，需要在第 2 种情况遍历结束的基础上，进行单独处理，比如 999 => 1000
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i]++;
    digits[i] %= 10;
    if (digits[i] != 0) return digits;
  }
  return [1, ...digits];
};

//
// -------divider-------
//

/*
【删除排序数组中的重复项】
https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1:
给定数组 nums = [1,1,2], 
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
【你不需要考虑数组中超出新长度后面的元素。（注意这一句话！！！！）】

示例 2:
给定 nums = [0,0,1,1,1,2,2,3,3,4],
函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
你不需要考虑数组中超出新长度后面的元素。

logs：5
[✔️]2020.05.09
[✔️]2020.05.10
[✔️]2020.05.11
[✔️]2020.06.05
[✔️]2020.06.17
*/

// 解法：使用两个指针，如果相等就跳过。时间复杂度：O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let index = 1; // 这是一个指针，下面的 i 也是一个指针
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[index++] = nums[i + 1];
    }
  }
  return index - 1;
};

//
// -------divider-------
//

/*
【数组去重】

logs：5
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.17
[✔️]2020.06.23
[✔️]2020.07.01
*/

// 解法1：使用set。
var uniqueArray = function (nums) {
  return Array.from(new Set([...nums]));
  // tips：Array.from()方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
};

// 解法2：暴力破解法。时间复杂度O(n)、空间复杂度O(n)
var uniqueArray = function (nums) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (result.indexOf(nums[i]) === -1) result.push(nums[i]);
  }
  return result;
};

// 解法3：使用map，时间换空间。时间复杂度O(n)、空间复杂度O(n)
var uniqueArray = function (nums) {
  let hash = new Map();
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (!hash.has(nums[i])) {
      result.push(nums[i]);
      hash.set(nums[i], 0);
    }
  }
  return result;
};

// 解法4：排序后去重。时间复杂度O(n)、空间复杂度O(1)
var uniqueArray = function (nums) {
  nums.sort((a, b) => a - b);
  let index = 1; // 这是一个指针，下面的 i 也是一个指针
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[index++] = nums[i + 1];
    }
  }
  return nums.slice(0, index - 1);
};

//
// -------divider-------
//

/*
【下一个更大元素 I】
https://leetcode-cn.com/problems/next-greater-element-i/
给定两个没有重复元素的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

示例 1:
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
    对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
    对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
    对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。

示例 2:
输入: nums1 = [2,4], nums2 = [1,2,3,4].
输出: [3,-1]
解释:
    对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
    对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。

提示：
nums1和nums2中所有元素是唯一的。
nums1和nums2 的数组大小都不超过1000。

logs：5
[✔️]2020.05.09
[✔️]2020.05.14
[✔️]2020.06.01
[✔️]2020.06.06
[✔️]2020.06.17
*/

// 解法1：单调栈。我们可以忽略数组 nums1，先对将 nums2 中的每一个元素，求出其下一个更大的元素。随后对于将这些答案放入哈希映射（HashMap）中，再遍历数组 nums1，并直接找出答案。
// 时间复杂度：O(M+N)，其中 M 和 N 分别是数组 nums1 和 nums2 的长度。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let map = new Map();
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && nums2[i] > stack[0]) {
      map.set(stack.shift(), nums2[i]);
    }
    stack.unshift(nums2[i]);
  }
  while (stack.length) {
    map.set(stack.shift(), -1);
  }
  return nums1.map((item) => map.get(item));
};

// 解法2：暴力破解法。
var nextGreaterElement = function (nums1, nums2) {
  let result = nums1.map((item) => {
    let index = nums2.indexOf(item);
    for (let i = index + 1; i < nums2.length; i++) {
      if (nums2[i] > nums2[index]) {
        return nums2[i];
      }
    }
    return -1;
  });
  return result;
};

//
// -------divider-------
//

/*
【进制转换算法】
实现十进制转二进制、任意进制转换

logs：5
[✔️]2020.05.09
[✔️]2020.05.14
[✔️]2020.06.02
[✔️]2020.06.06
[✔️]2020.06.17
*/
// 十进制转二进制。要把十进制转化成二进制，我们可以将该十进制数除以 2（二进制是满二进一）并对商取整，直到结果是 0 为止。
function decimalToBinary(number) {
  const remStack = [];
  while (number > 0) {
    let rem = number % 2;
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  return remStack.join("");
}

// 任意进制转换
function baseConverter(number, base) {
  if (base < 2 || base > 36) return "";

  const remStack = [];
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  while (number > 0) {
    let rem = number % base;
    remStack.push(digits[rem]);
    number = Math.floor(number / base);
  }
  return remStack.join("");
}

//
// -------divider-------
//

/* 
【有效的括号】
https://leetcode-cn.com/problems/valid-parentheses/
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false

示例 5:
输入: "{[]}"
输出: true

logs：5
[✔️]2020.04.20
[✔️]2020.05.08
[✔️]2020.06.02
[✔️]2020.06.06
[✔️]2020.06.17
*/

// 解法1：栈stack。时间复杂度：O(n)、空间复杂度O(n)
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];
  let map = { "(": ")", "[": "]", "{": "}" };

  for (let i = 0; i < s.length; i++) {
    // The [in] operator returns true if the specified property is in the specified object or its prototype chain.
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      if (s[i] != map[stack.pop()]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

// 解法2：消消乐，使用正则，把‘[]’、‘()’、‘{}’用replace两两消掉，循环后如果字符串为空则返回true，反之则为false。
var isValid = function (s) {
  let length;
  do {
    length = s.length;
    s = s.replace("()", "").replace("{}", "").replace("[]", "");
  } while (length != s.length);

  return s.length === 0;
};

//
// -------divider-------
//

/* -------------------------- 队列、优先队列 ---------------------------*/
// priorityQueue：优先队列。实现机制：堆（二叉堆）、二叉搜索树

/*
【实现js的二叉堆】
对于给定位置n。
  它的左侧子节点的位置是 2n + 1（如果位置可用）；
  它的右侧子节点的位置是 2n + 2（如果位置可用）； 
  它的父节点位置是 n / 2（如果位置可用）。

logs：5
[✔️]2020.05.23
[✔️]2020.06.01
[✔️]2020.06.02
[✔️]2020.06.18
[✔️]2020.07.01
*/
// 创建最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 访问特定节点索引
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) return undefined;
    return Math.floor((index - 1) / 2);
  }
  // 长度
  size() {
    return this.heap.length;
  }
  // 判空
  isEmpty() {
    return this.size() <= 0;
  }
  // 清空
  clear() {
    this.heap = [];
  }
  // 返回最小值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  // 插入一个新的值。如果插入成功，它返回 true，否则返回false。时间复杂度 O(logn)
  insert(value) {
    if (value == null) return false;
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
    return true;
  }
  // 堆化（从下往上）
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (index > 0 && this.heap[parent] > this.heap[index]) {
      this.swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  // 移除最小值并返回这个值。时间复杂度 O(logn)
  extract() {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heap.shift();
    // 避免'数组空洞'、交换首尾元素后再向下堆化
    this.swap(this.heap, 0, this.heap.length - 1);
    const removedValue = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }
  // 堆化（从上往下）
  siftDown(index) {
    let tempIndex = index;
    let left = this.getLeftIndex(index);
    let right = this.getRightIndex(index);
    let size = this.size();
    // --- [父节点-左子节点-右子节点]中找出最大值的索引 ---
    if (left < size && this.heap[tempIndex] > this.heap[left]) {
      tempIndex = left;
    }
    if (right < size && this.heap[tempIndex] > this.heap[right]) {
      tempIndex = right;
    }
    // --- /[父节点-左子节点-右子节点]中找出最大值的索引 ---
    if (index !== tempIndex) {
      this.swap(this.heap, index, tempIndex);
      this.siftDown(tempIndex);
    }
  }
  // 返回数组
  getAsArray() {
    return this.heap;
  }
  // 交换
  swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
  }
}

const heap = new MinHeap();
heap.insert(1);
heap.insert(6);
heap.insert(7);
heap.insert(8);
heap.insert(9);

//
// -------divider-------
//

/*
【数据流中的第K大元素】
https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/
设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。
你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。

示例：
int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8

logs：5
[✔️]2020.05.26
[✔️]2020.06.02
[✔️]2020.06.04
[✔️]2020.06.18
[✔️]2020.07.02
*/
// 解法1：使用优先队列，小顶堆min-heap，堆的元素个数都为k个，然后对新进来的值进行判断操作。时间复杂度：log2^k
// 因为js没有内置min-heap这个数据结构，所以需要先自己造一个小顶堆。
var KthLargest = function (k, nums) {
  this.k = k;
  this.minHeap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    this.add(nums[i]);
  }
};
KthLargest.prototype.add = function (val) {
  if (this.minHeap.size() < this.k) {
    this.minHeap.insert(val);
  } else {
    if (val > this.minHeap.findMinimum()) {
      this.minHeap.extract();
      this.minHeap.insert(val);
    }
  }
  return this.minHeap.findMinimum();
};

// 解法2：使用一个数组，对前k项从大到小的排序，并对新add进来的数进行判断是塞进来还是丢弃。时间复杂度：N*(k*logk)
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.nums = nums.sort((a, b) => b - a);
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  for (let i = 0; i < this.nums.length; i++) {
    if (val > this.nums[i]) {
      this.nums.splice(i, 0, val);
      return this.nums[this.k - 1];
    }
  }
  this.nums.push(val);
  return this.nums[this.k - 1];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

//
// -------divider-------
//

/*
【滑动窗口最大值】【hard】
https://leetcode-cn.com/problems/sliding-window-maximum/
https://time.geekbang.org/course/detail/100019701-41559
给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
返回滑动窗口中的最大值。

示例：
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

logs：5
[✔️]2020.05.28
[✔️]2020.05.28
[✔️]2020.06.04
[✔️]2020.06.19
[✔️]2020.07.03
*/
// 解法1：暴力破解法。时间复杂度：O(n*k)、空间复杂度：O(n)
var maxSlidingWindow = function (nums, k) {
  if (!nums.length) return [];
  if (k === 1) return nums;
  let result = [];
  let deque = [];
  for (let i = 0; i < nums.length; i++) {
    deque.push(nums[i]);
    if (i >= k - 1) {
      result.push(Math.max(...deque));
      deque.shift();
    }
  }
  return result;
};

// 解法2：使用双端队列Queue。时间复杂度：O(n)、空间复杂度：O(n)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (!nums.length) return [];
  if (k === 1) return nums;
  let deque = []; // 维护位置index索引
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    // i >= k：保证已经往右移了k位了
    // deque[0] <= i - k：把滑动窗口之外的踢出
    if (i >= k && deque[0] <= i - k) deque.shift();
    // 最大值永远是【左边】的值，对于进来的新值进行判断
    while (deque.length && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(i);
    // 队列左侧是最大值,放入结果
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
};

// 解法3：动态规划

// 解法4：使用优先队列，大顶堆max-heap，时间复杂度O(Nlogk)
// var maxSlidingWindow = function (nums, k) {
//   this.maxHeap = new MaxHeap();
//   for (let i = 0; i < nums.length; i++) {
//     if (i < k) {
//       this.maxHeap.insert(nums[i]);
//     } else {
//     }
//   }
// };

//
// -------divider-------
//

/* -------------------------- 链表 ---------------------------*/
/* 
  【反转链表】
  https://leetcode-cn.com/problems/reverse-linked-list/
  反转一个单链表
  
  示例：
  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL

  logs：6
  [✔️]2020.04.19
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.07
  [✔️]2020.06.02
*/
// 迭代解法：时间复杂度O(n)、空间复杂度：O(1)
var reverseList = function (head) {
  if (head == null || head.next == null) return head;
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};
var reverseList = function (head) {
  if (head == null || head.next == null) return head;
  let prev = null;
  while (head) {
    [head.next, prev, head] = [prev, head, head.next];
  }
  return prev;
};

// 递归解法：时间复杂度：O(n)、空间复杂度：O(1)
var reverseList = function (head) {
  function reverse(curr, prev) {
    if (curr == null) return prev;
    let next = curr.next;
    curr.next = prev;
    return reverse(next, curr);
  }
  return reverse(head, null);
};

//
// -------divider-------
//

/* 
  【两两交换链表中的节点】
  https://leetcode-cn.com/problems/swap-nodes-in-pairs/
  给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
  
  示例：
  给定 1->2->3->4, 你应该返回 2->1->4->3.

  logs：5
  [✔️]2020.04.20
  [✔️]2020.06.08
  [✔️]2020.06.19
  [✔️]2020.06.29
  [✔️]2020.07.10
*/

// 迭代：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(1)。
// 这个图解好：https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/bi-jiao-zhi-jie-gao-xiao-de-zuo-fa-han-tu-jie-by-w/
var swapPairs = function (head) {
  let pre = new ListNode(null);
  pre.next = head;
  let temp = pre;
  while (temp.next && temp.next.next) {
    let start = temp.next;
    let end = temp.next.next;
    temp.next = end;
    start.next = end.next;
    end.next = start;
    temp = start;
  }
  return pre.next;
};

// 递归：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(N)，递归过程使用的堆栈空间。
var swapPairs = function (head) {
  if (!head) return null;
  if (!head.next) return head;
  let temp = head.next;
  head.next = swapPairs(temp.next); // 假设是ABCDEF,递归将A指向C，C指向E
  temp.next = head; // 再把B指向A、D指向C、F指向E
  return temp;
};

//
// -------divider-------
//

/* 
  【合并两个有序链表】
  https://leetcode-cn.com/problems/merge-two-sorted-lists/
  将两个【升序】链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

  示例：
  输入：1->2->4, 1->3->4
  输出：1->1->2->3->4->4

  logs：5
  [✔️]2020.05.25
  [✔️]2020.06.02
  [✔️]2020.06.04
  [✔️]2020.06.08
  [✔️]2020.06.19
*/

// Recursion。时间复杂度O(m+n)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    // 如果 l1 的 val 值更小，则将 l1.next 与排序好的链表头相接
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

// Interation。时间复杂度O(m+n)
var mergeTwoLists = function (l1, l2) {
  const prehead = new ListNode(null);
  let prev = prehead; // 复制的是prehead这个对象，所以两者的next指针是一致的
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }
  // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
  prev.next = l1 == null ? l2 : l1;
  return prehead.next;
};

//
// -------divider-------
//

/* 
  【环形链表】
  https://leetcode-cn.com/problems/linked-list-cycle/
  给定一个链表，判断链表中是否有环。
  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
  
  示例：
  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。
  
  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。
  
  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。

  logs：6
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.06
  [✔️]2020.06.08
  [✔️]2020.06.19
*/

// 解法1：让他一直循环，如果有环的话，那么会一直循环下去，设置一个限制时间。
// 解法2：搞个新的set、判重。时间复杂度：O(n)、空间复杂度：O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const hash = new Set();
  while (head && head.next) {
    if (hash.has(head)) return true;
    hash.add(head);
    head = head.next;
  }
  return false;
};

// 解法3：快慢指针，块指针走2步，慢指针走1步，如果有有环，那么两个指针会相遇。时间复杂度：O(n)、空间复杂度：O(1)
var hasCycle = function (head) {
  let slow = (fast = head);
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

//
// -------divider-------
//

/* 
  【环形链表II】
  https://leetcode-cn.com/problems/linked-list-cycle-ii/
  给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
  
  示例：
  输入：head = [3,2,0,-4], pos = 1
  输出：tail connects to node index 1
  解释：链表中有一个环，其尾部连接到第二个节点。
  
  输入：head = [1,2], pos = 0
  输出：tail connects to node index 0
  解释：链表中有一个环，其尾部连接到第一个节点。
  
  输入：head = [1], pos = -1
  输出：no cycle
  解释：链表中没有环。

  logs：5
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.06.08
  [✔️]2020.06.22
  [✔️]2020.07.10
*/

// 解法1：迭代，给每个经过的元素添加flag标识。时间复杂度：O(n)，空间复杂度O(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  while (head && head.next) {
    if (head.flag) {
      return head;
    } else {
      head.flag = 1;
      head = head.next;
    }
  }
  return null;
};

// 解法2：hash。时间复杂度：O(n)，空间复杂度O(n)
var detectCycle = function (head) {
  let hash = new Set();
  while (head && head.next) {
    if (hash.has(head)) {
      return head;
    }
    hash.add(head);
    head = head.next;
  }
  return null;
};

//
// -------divider-------
//

/* 
【删除链表的倒数第N个节点】
https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
给定一个链表，删除链表的【倒数】第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：
给定的 n 保证是有效的。

进阶：
你能尝试使用一趟扫描实现吗？

logs：4
[✔️]2020.05.25
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.23
*/

// 解法1：两次遍历。时间复杂度O(n)
var removeNthFromEnd = function (head, n) {
  // 设置一个哑节点位于作为辅助。哑结点用来简化某些极端情况，例如列表中只含有一个结点、或需要删除列表的头部
  const preHead = new ListNode(null);
  preHead.next = head;
  let length = 0;
  // 第一次遍历，我们找出列表的长度length
  let temp = head;
  while (temp) {
    temp = temp.next;
    length++;
  }
  // 第二次遍历，找到废弃节点的位置并设置next跳过它
  length = length - n;
  temp = preHead;
  while (length > 0) {
    temp = temp.next;
    length--;
  }
  temp.next = temp.next.next;
  return preHead.next;
};

// 解法2：双指针。时间复杂度O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let preHead = new ListNode(null);
  preHead.next = head;
  let fast = (slow = preHead);
  while (n != 0) {
    fast = fast.next; // 快指针先走n步
    n--;
  }
  // 之后快慢指针共同向前移动，此时二者的距离为n，当 fast 到达尾部时，end 的位置恰好为倒数第n的那个节点
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
};

//
// -------divider-------
//

/* 
【链表的中间结点】
https://leetcode-cn.com/problems/middle-of-the-linked-list/
给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

示例 1：
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例 2：
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。

logs：4
[✔️]2020.05.25
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.24
*/

// 解法1：使用数组。时间复杂度：O(n)、空间复杂度O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let result = [];
  while (head) {
    result.push(head);
    head = head.next;
  }
  return result[Math.floor(result.length / 2)];
};

// 解法2：单指针。时间复杂度：O(n)、空间复杂度O(1)
// 两次遍历，第一次遍历时，我们统计链表中的元素个数 N；第二次遍历时，我们遍历到第 N/2 个元素。
var middleNode = function (head) {
  let temp = head;
  let i = (j = 0);
  while (temp) {
    temp = temp.next;
    i++;
  }
  temp = head;
  while (j < Math.floor(i / 2)) {
    temp = temp.next;
    j++;
  }
  return temp;
};

// 解法3：双指针。时间复杂度O(n)、空间复杂度O(1)
// 用两个指针 slow 与 fast 一起遍历链表。slow 一次走一步，fast 一次走两步。那么当 fast 到达链表的末尾时，slow 必然位于中间。
var middleNode = function (head) {
  let slow = (fast = head);
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

//
// -------divider-------
//

/* 
  【k个一组翻转链表】【hard】
  https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
  给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
  k 是一个正整数，它的值小于或等于链表的长度。
  如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
  
  示例：
  给你这个链表：1->2->3->4->5
  当 k = 2 时，应当返回: 2->1->4->3->5
  当 k = 3 时，应当返回: 3->2->1->4->5

  logs：4
  [✔️]2020.06.03
  [✔️]2020.06.09
  [✔️]2020.06.24
  [✔️]2020.06.30
*/

// 解法1：递归。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head == null || head.next == null) return head; // 递归终止条件

  let prev = null;
  let temp = head;

  // 判断下一组反转是否满足条件
  for (let i = 0; i < k; i++) {
    if (temp == null) return head;
    temp = temp.next;
  }

  // 局部反转
  temp = head;
  for (let i = 0; i < k; i++) {
    let next = temp.next;
    temp.next = prev;
    prev = temp;
    temp = next;
  }

  head.next = reverseKGroup(temp, k);
  return prev;
};

//
// -------divider-------
//

/* -------------------------- 集合、字典、散列表  ---------------------------*/

/* 
【有效的字母异位词】
https://leetcode-cn.com/problems/valid-anagram/
https://time.geekbang.org/course/detail/100019701-42702
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
说明:
你可以假设字符串只包含小写字母。
进阶:
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

示例 1:
输入: s = "anagram", t = "nagaram"
输出: true

示例 2:
输入: s = "rat", t = "car"
输出: false

logs：5
[✔️]2020.05.12
[✔️]2020.06.10
[✔️]2020.06.29
[✔️]2020.06.30
[✔️]2020.07.07
*/

// 解法1：sort排序，对两个单词进行排序，如果排完序以后全等，那么则为true。时间复杂度：用快排O(nlog(n))
// 首先判断两个字符串长度是否相等，不相等则直接返回 false
// 若相等，则初始化 26 个字母哈希表，遍历字符串 s 和 t
// s 负责在对应位置增加，t 负责在对应位置减少
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
};

// 解法2：hash，对单词中的每个字母进行计数看出现了几次。 时间复杂度：O(n)
// new Array(arrayLength)：一个范围在 0 到 232-1 之间的整数，此时将返回一个 length 的值等于 arrayLength 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 arrayLength 个值为 undefined 的元素）。如果传入的参数不是有效值，则会抛出 RangeError 异常。
// fill()方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。例如：
// const array = [1, 2, 3, 4];
// array.fill(6) -> output: [6, 6, 6, 6]
// charCodeAt()方法可返回指定位置的字符的 Unicode 编码，减掉97是因为小写a字母是从97开始编码：'a'.charCodeAt() -> 97
// 如果哈希表的值都为 0，则二者是字母异位词
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let arr = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    arr[s[i].charCodeAt() - 97]++;
    arr[t[i].charCodeAt() - 97]--;
  }
  for (let i = 0; i < 26; i++) {
    if (arr[i] !== 0) return false;
  }
  return true;
};

//
// -------divider-------
//

/* 
【两数之和】
https://leetcode-cn.com/problems/two-sum/
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的【数组下标】。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例：
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

logs：5
[✔️]2020.05.07
[✔️]2020.05.22
[✔️]2020.05.29
[✔️]2020.06.10
[✔️]2020.07.07
*/

// 解法1：暴力破解法。使用两个for循环，如果相加等于target值则return，时间复杂度为O(n^2)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (nums == null || nums.length < 2) return [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

// 解法2：用哈希表，时间复杂度为O(n)
var twoSum = function (nums, target) {
  if (nums == null || nums.length < 2) return [];

  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (!map.has(diff)) {
      map.set(nums[i], i);
    } else {
      return [map.get(diff), i];
    }
  }
};

//
// -------divider-------
//

/* 
【三数之和】
https://leetcode-cn.com/problems/3sum/
https://time.geekbang.org/course/detail/100019701-42705
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

logs：5
[✔️]2020.05.21
[✔️]2020.05.29
[✔️]2020.06.01
[✔️]2020.06.10
[✔️]2020.07.08
*/

// 解法1：暴力求解（会超时），三个for循环。时间复杂度：O(n^3)
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums == null || nums.length < 3) return [];

  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          let value = [nums[i], nums[j], nums[k]].sort();
          let key = value.join(",");
          // 去重
          if (!Object.keys(map).includes(key)) {
            map[key] = value;
          }
        }
      }
    }
  }
  // Object.values()返回一个数组，其元素是在对象上找到的可枚举属性值。
  return Object.values(map);
};

// 解法2：loops+set，由于c = -(a+b)时满足条件，所以将a、b双层循环一下并将其放到set中。时间复杂度O(n^2)、空间复杂度O(n)
var threeSum = function (nums) {
  if (nums == null || nums.length < 3) return [];
  let result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // 因为已经排序好，如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let hash = new Map();
    for (let j = i + 1; j < nums.length; j++) {
      if (hash.has(nums[j])) {
        if (hash.get(nums[j]) == 0) {
          result.push([nums[i], nums[j], -nums[i] - nums[j]]);
          hash.set(nums[j], 1); // 去重 [0,0,0,0]
        }
      } else {
        hash.set(-nums[i] - nums[j], 0);
      }
    }
  }
  return result;
};

// 解法3：排序+双指针。时间复杂度O(n^2)、空间复杂度O(1)
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums == null || nums.length < 3) return [];
  let res = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // 因为已经排序好，如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let l = i + 1;
    let r = nums.length - 1;

    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum == 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] == nums[l + 1]) l++; // 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
        while (l < r && nums[r] == nums[r - 1]) r--; // 当 sum == 0 时，nums[R] == nums[R−1] 则会导致结果重复，应该跳过，R--
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
};

//
// -------divider-------
//

/* 
【四数之和】
https://leetcode-cn.com/problems/4sum/
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：
答案中不可以包含重复的四元组。

示例：
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]

logs：2
[✔️]2020.05.22
[✔️]2020.06.11
*/
// 解法1：暴力求解。时间复杂度O(n^4)
// 解法2：使用set。空间换时间，时间复杂度O(n^3)、空间复杂度O(n)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (!nums || nums.length < 4) return [];
  let result = {};

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let hash = new Map();
      for (let k = j + 1; k < nums.length; k++) {
        if (hash.has(nums[k])) {
          // 剪枝
          if (hash.get(nums[k]) === 0) {
            let value = [
              nums[i],
              nums[j],
              nums[k],
              target - nums[i] - nums[j] - nums[k],
            ].sort();
            let key = value.join(",");
            // 去重（这里去重性能有点低，需要找个更好的方案优化一下）
            if (!Object.keys(result).includes(key)) {
              result[key] = value;
            }
            hash.set(nums[k], 1); // 去重
          }
        } else {
          hash.set(target - nums[i] - nums[j] - nums[k], 0);
        }
      }
    }
  }
  return Object.values(result);
};

// 解法3：排序+双指针。时间复杂度O(n^3)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (!nums || nums.length < 4) return [];
  let result = [];
  let a, b;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // if (nums[i] > 0) break; 这里不加这个剪枝是因为题目并没有跟前面一样说target是0
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      a = nums[i];
      b = nums[j];
      let l = j + 1;
      let r = nums.length - 1;
      while (l < r) {
        let sum = a + b + nums[l] + nums[r];
        if (sum === target) {
          result.push([a, b, nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return result;
};

//
// -------divider-------
//

/* -------------------------- 树、二叉树、二叉搜索树 ---------------------------*/
// 二叉树遍历
// 前序遍历（pre-order）：根-左-右
// 中序遍历（in-order）：左-根-右
// 后序遍历（post-order）：左-右-根

/*
【构建一颗二叉搜索树】
时间复杂度：
  insert O(logn)
  search O(logn)
  delete O(logn)

const tree = new BinarySearchTree();
tree.insert(new Node(5));
tree.insert(new Node(3));

logs：5
[✔️]2020.05.13
[✔️]2020.05.14
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.13
*/
class Node {
  constructor(key) {
    this.key = key; // 节点值
    this.left = null; // 左侧子节点引用
    this.right = null; // 右侧子节点引用
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null; // Node 类型的根节点
  }

  // insert：向树中插入一个新的键。
  insert(newNode) {
    this.root == null ? (this.root = newNode) : helper(this.root, newNode);

    function helper(node, newNode) {
      if (node.key > newNode.key) {
        node.left == null ? (node.left = newNode) : helper(node.left, newNode);
      } else {
        node.right == null
          ? (node.right = newNode)
          : helper(node.right, newNode);
      }
    }
  }

  // 中序遍历
  inOrderTraverse(cb) {
    helper(this.root, cb);

    function helper(node, cb) {
      if (node == null) return node; // recurision end
      helper(node.left, cb);
      cb(node.key);
      helper(node.right, cb);
    }
  }

  // 前序遍历
  preOrderTraverse(cb) {
    helper(this.root, cb);

    function helper(node, cb) {
      if (node == null) return node;
      cb(node.key);
      helper(node.left, cb);
      helper(node.right, cb);
    }
  }

  // 后序遍历
  postOrderTraverse(cb) {
    helper(this.root, cb);

    function helper(node, cb) {
      if (node != null) return node;
      helper(node.left, cb);
      helper(node.right, cb);
      cb(node.key);
    }
  }

  // min：返回树中最小的值/键。
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  // max：返回树中最大的值/键。
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  // search：在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回false。
  search(key) {
    function helper(node, key) {
      if (node == null) return false;
      if (node.key > key) {
        return helper(node.left, key);
      } else if (node.key < key) {
        return helper(node.right, key);
      } else {
        return true;
      }
    }
    return helper(this.root, key);
  }

  // remove(key)：从树中移除某个键。
  remove(key) {
    this.root = removeNode(this.root, key);

    function removeNode(node, key) {
      if (node == null) return node;
      if (node.key > key) {
        node.left = removeNode(node.left, key);
        return node;
      } else if (node.key < key) {
        node.right = removeNode(node.right, key);
        return node;
      } else {
        // 第一种情况：移除一个叶节点
        if (node.left == null && node.right == null) {
          node = null;
          return node;
        }
        // 第二种情况：移除一个有左侧或右侧子节点的节点，我们需要跳过这个节点，直接将父节点指向它的指针指向子节点。
        if (node.left == null) {
          node = node.right;
          return node;
        } else if (node.right == null) {
          node = node.left;
          return node;
        }
        // 第三种情况：有两个子节点的节点
        const temp = this.minNode(node.right); // 找到它右边子树中最小的节点
        node.key = temp.key; // 用它右侧子树中最小节点的键去更新这个节点的值
        node.right = removeNode(node.right, temp.key); // 这样在树中就有两个拥有相同键的节点了，移除这个值
        return node;
      }
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(new Node(11));
tree.insert(new Node(7));
tree.insert(new Node(2));
tree.insert(new Node(4));
tree.insert(new Node(2));
tree.insert(new Node(20));
console.log(tree.min());
console.log(tree.max());
tree.remove(20);
console.log(tree.max());
console.log(tree.search(11));
tree.inOrderTraverse((value) => console.log(value));

//
// -------divider-------
//

/* 
【验证二叉搜索树】BinarySearchTree
https://leetcode-cn.com/problems/validate-binary-search-tree/
给定一个二叉树，判断其是否是一个有效的二叉搜索树。
假设一个二叉搜索树具有如下特征：
节点的【左子树】只包含小于当前节点的数。
节点的【右子树】只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例 1:
输入:
    2
   / \
  1   3
输出: true

示例 2:
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。

logs：5
[✔️]2020.05.24
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.13
*/

// 解法1：使用一个中序遍历，判断中序遍历后的数组是否为升序。时间复杂度：O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = -Infinity;

  function helper(root) {
    if (root == null) return true;
    // left
    let left = helper(root.left);
    // current：如果当前节点小于等于中序遍历的前一个节点，说明不满足BST，返回false
    let mid = root.val > prev ? true : false;
    prev = root.val;
    // right
    let right = helper(root.right);
    return left && mid && right;
  }

  return helper(root);
};

// 解法2：使用递归。因为是二叉搜索树，左子树都要比root小，右子树都要比root大。所以递归左子树，找到它的最小值与root判断；同理递归右子树找到它的最大值并与root判断。时间复杂度：O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  function helper(root, min, max) {
    if (root == null) return true;
    // 左子树：当前值比最大值要小
    // 右子树：当前值比最小值要大
    // 不满足上述条件则为false
    if (root.val >= max || root.val <= min) return false;
    let left = helper(root.left, min, root.val);
    let right = helper(root.right, root.val, max);
    return left && right;
  }

  return helper(root, -Infinity, Infinity);
};

//
// -------divider-------
//

/*
【二叉搜索树的最近公共祖先】
https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
https://time.geekbang.org/course/detail/100019701-42708
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
【图略】

示例 1:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。

示例 2:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

logs：5
[✔️]2020.05.24
[✔️]2020.05.25
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.07.14
*/

// 解法1：递归。时间复杂度O(n)
// 从根节点开始遍历树
// 如果节点 p 和节点 q 都在右子树上，那么以右孩子为根节点继续操作
// 如果节点 p 和节点 q 都在左子树上，那么以左孩子为根节点继续操作
// 如果上述条件都不成立，这就意味着我们已经找到节 p 和节点 q 的 LCA 了
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else {
    return root;
  }
};

// 解法2：迭代。跟使用递归的思路是一样的，写法不同而已。时间复杂度O(n)
var lowestCommonAncestor = function (root, p, q) {
  while (root != null) {
    if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else {
      return root;
    }
  }
  return null;
};

//
// -------divider-------
//

/*
【二叉树的最近公共祖先】
https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
【图略】

示例 1:
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

示例 2:
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

logs：5
[✔️]2020.05.25
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.06.29
[✔️]2020.07.14
*/
// 解法1：递归。在当前节点的左子树和右子树中分别递归找p和q，如果存在那么就是【公共祖先】了；继续重复递归就可以找到【最近公共祖先】。时间复杂度O(n)。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  //如果当前结点root等于null，则直接返回null；如果 root等于p或者q，那返回p或者q
  if (root == null || root == p || root == q) return root;
  let left = lowestCommonAncestor(root.left, p, q); // 遍历左子树
  let right = lowestCommonAncestor(root.right, p, q); // 遍历右子树
  if (left == null) return right; // 若left为空，那最终结果只要看right
  if (right == null) return left; // 若right为空，那最终结果只要看left
  if (right && left) return root; // 如果left和right都非空，root是他们的最近公共祖先
};

//
// -------divider-------
//

/* -------------------------- 递归、分治 ---------------------------*/

/* 
  Tips：
  （1）对于递归代码，这种试图想清楚整个递和归过程的做法，实际上是进入了一个思维误区。很多时候，我们理解起来比较吃力，主要原因就是自己给自己制造了这种理解障碍。那正确的思维方式应该是怎样的呢？
  （2）如果一个问题 A 可以分解为若干子问题 B、C、D，你可以假设子问题 B、C、D 已经解决，在此基础上思考如何解决问题 A。而且，你只需要思考问题 A 与子问题 B、C、D 两层之间的关系即可，不需要一层一层往下思考子问题与子子问题，子子问题与子子子问题之间的关系。屏蔽掉递归细节，这样子理解起来就简单多了。
  （3）因此，编写递归代码的关键是，只要遇到递归，我们就把它抽象成一个递推公式，不用想一层层的调用关系，不要试图用人脑去分解递归的每个步骤。
  （4）分治算法一般都是用递归来实现的。分治是一种解决问题的处理思想，递归是一种编程技巧。
*/

/*
【斐波那契数列】

logs：2
[✔️]2020.06.22
[✔️]2020.07.14
*/
// 1、求1，1，2，3，5，8，....第n个数是多少？
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 2、计算阶乘n! = 1 x 2 x 3 x ... x n
function fact(n) {
  if (n === 1) return 1;
  return n * fact(n - 1);
}

//
// -------divider-------
//

/*
【Pow(x, n)】
https://leetcode-cn.com/problems/powx-n/
https://time.geekbang.org/course/detail/130-42711
实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:
输入: 2.00000, 10
输出: 1024.00000

示例 2:
输入: 2.10000, 3
输出: 9.26100

示例 3:
输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25

说明:
-100.0 < x < 100.0
n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。

logs：3
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.14
*/

// 解法1：暴力破解法，傻乘，如求2的10次方，就循环10次。时间复杂度O(n)
// 解法2：分治+递归，时间复杂度O(logn)
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n < 0) {
    return 1 / myPow(x, -n); // 负数
  } else if (n % 2) {
    return x * myPow(x, n - 1); // 奇数
  } else {
    return myPow(x * x, n / 2); // 偶数
  }
};

// 解法3：迭代、位运算
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;
  if (x === 0) return 0;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let pow = 1;
  while (n) {
    if (n & 1) pow *= x;
    x *= x;
    n >>>= 1;
  }
  return pow;
};

//
// -------divider-------
//

/*
【多数元素、求众数】
https://leetcode-cn.com/problems/majority-element/
https://time.geekbang.org/course/detail/100019701-42713
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于【n/2】的元素。
你可以假设数组是非空的，并且给定的数组【总是存在】多数元素。

示例 1:
输入: [3,2,3]
输出: 3

示例 2:
输入: [2,2,1,1,1,2,2]
输出: 2

logs：2
[✔️]2020.05.29
[✔️]2020.06.12
*/

// 解法1：暴力破解。即枚举数组中的每个元素，再遍历一遍数组统计其出现次数。时间复杂度为O(N^2)
// 解法2：哈希表。我们使用哈希来存储每个元素以及出现的次数。对于哈希映射中的每个键值对，键表示一个元素，值表示该元素出现的次数。时间复杂度O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    let temp = nums[i];
    map[temp] = map[temp] == null ? 1 : map[temp] + 1;
    if (map[temp] > nums.length / 2) {
      return temp;
    }
  }
};

// 解法3：排序。如果将数组 nums 中的所有元素按照单调递增或单调递减的顺序排序，那么下标为[n/2]的元素（下标从 0 开始）一定是众数。时间复杂度���O(nlogn)。
// Math.floor向下舍入。如Math.floor(5.9)—>5，floor地板
// Math.ceil向上舍入。ceil天花板
// Math.round四舍五入。
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

// 解法4：Boyer-Moore投票算法。时间复杂度O(n)
// 根据题目要求，众数一定多于总数的一半，所以我们通过不断用众数抵消掉其他的非众数剩下来的那个数一定是众数。
var majorityElement = function (nums) {
  let count = 0;
  let temp = null;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) temp = nums[i];
    temp === nums[i] ? (count += 1) : (count -= 1);
  }
  return temp;
};

// 解法5：分治。将数组递归层层一分为二，把左边众数的和右边众数依次作比较。时间复杂度：O(nlogn)。

//
// -------divider-------
//

/* -------------------------- 图、DFS、BFS ---------------------------*/
// 使用邻接表的形式表示图
class Graph {
  constructor() {
    this.vertices = []; // 记录顶点
    this.adjList = new Map(); // 记录边
  }
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }
  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }
    this.adjList.get(a).push(b);
    this.adjList.get(b).push(a);
  }
  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }
}

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E"];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
console.log(graph.adjList);

// DFS写法
// https://time.geekbang.org/course/detail/100019701-42717
visited = new Set();
function dfs(node, visited) {
  visited.add(node);
  // process current node here
  for (next_node in node.children()) {
    if (!visited.has(next_node)) dfs(next_node, visited);
  }
}

// BFS写法
function BFS(graph, start, end) {
  visited = new Set();
  queue = [];
  queue.push(start);
  visited.add(start);

  while (queue) {
    node = queue.pop();
    visited.add(node);

    process(node);

    nodes = generate_related_nodes(node); // node的相邻节点
    queue.push(nodes);
  }
}

//
// -------divider-------
//

/*
【二叉树的层序遍历】
https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
https://time.geekbang.org/course/detail/100019701-67634
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。（即逐层地，从左到右访问所有节点）。

示例：
二叉树：[3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]

logs：4
[✔️]2020.06.15
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
*/
// 解法1：BFS。时间复杂度O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let queue = [];
  let result = [];
  queue.push(root);

  // let visited = new Set() visited.add(root) 图的遍历之类的需要将已遍历过的节点记录下来

  while (queue.length) {
    let temp = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(temp);
  }
  return result;
};

// 解法2：DFS。时间复杂度O(n)
var levelOrder = function (root) {
  if (!root) return [];
  let result = [];
  dfs(root, 0);
  return result;

  function dfs(node, level) {
    if (!node) return;
    if (result.length < level + 1) result.push([]);
    result[level].push(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
};

//
// -------divider-------
//

/*
【二叉树的最大深度】
https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
给定一个二叉树，找出其最大深度。
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。

logs：4
[✔️]2020.06.15
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
*/

// 解法1：DFS、递归。时间复杂度O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  if (!root.left) return maxDepth(root.right) + 1;
  if (!root.right) return maxDepth(root.left) + 1;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

//
// -------divider-------
//

/*
【二叉树的最小深度】
https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明: 叶子节点是指没有子节点的节点。

示例:
给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度  2.

logs：4
[✔️]2020.06.16
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
*/

// 解法1：DFS。时间复杂度O(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0;
  if (!root.left) return minDepth(root.right) + 1;
  if (!root.right) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

//
// -------divider-------
//

/*
【括号生成】
https://leetcode-cn.com/problems/generate-parentheses/
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。
示例：

输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]

logs：4
[✔️]2020.06.16
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
*/

// 解法1：DFS。时间复杂度O(2^n)
// https://time.geekbang.org/course/detail/130-67636
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  function dfs(s, left, right) {
    if (left == n && right == n) return res.push(s);
    if (left < n) dfs(`${s}(`, left + 1, right);
    if (left > right && right < n) dfs(`${s})`, left, right + 1);
  }
  dfs("", 0, 0);
  return res;
};

//
// -------divider-------
//

/* -------------------------- 排序、搜索算法 ---------------------------*/

/*
【冒泡排序】
冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。
元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。
时间复杂度O(n^2)

logs：6
[✔️]2020.05.22
[✔️]2020.05.25
[✔️]2020.06.06
[✔️]2020.06.15
[✔️]2020.06.30
[✔️]2020.07.07
*/
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
const test = bubbleSort([4, 4, 52, 13, 5, 8, 91, 1]);

//
// -------divider-------
//

/*
【选择排序】
选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
时间复杂度O(n^2)

logs：6
[✔️]2020.05.22
[✔️]2020.05.25
[✔️]2020.06.06
[✔️]2020.06.15
[✔️]2020.06.30
*/
function selectionSort(array) {
  let tempMin;
  for (let i = 0; i < array.length - 1; i++) {
    tempMin = i;
    for (let j = i; j < array.length; j++) {
      if (array[tempMin] > array[j]) {
        tempMin = j;
      }
    }
    if (i !== tempMin) {
      [array[i], array[tempMin]] = [array[tempMin], array[i]];
    }
  }
  return array;
}
const test = selectionSort([4, 4, 52, 13, 5, 8, 91, 1]);

//
// -------divider-------
//

/*
【插入排序】
就像是打扑克摸牌插牌一样。时间复杂度O(n^2)
首先，我们将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。
插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束。
[1,2,3,【0,8,4,1】]
        --------
        一个个的抽出来插牌到已排好序的前面项中

logs：6
[✔️]2020.05.22
[✔️]2020.05.28
[✔️]2020.06.15
[✔️]2020.06.19
[✔️]2020.07.06
[✔️]2020.07.07
*/
function insertionSort(array) {
  let temp;
  for (let i = 1; i < array.length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && temp < array[j - 1]) {
      array[j] = array[j - 1];
      j--;
    }
    if (i != j) array[j] = temp;
  }
  return array;
}
const test = insertionSort([4, 4, 52, 13, 5, 8, 91, 1]);

//
// -------divider-------
//

/*
【归并排序】
先将原始数组分割直至只有一个元素的子数组，然后开始归并。归并过程也会完成排序，直至原始数组完全合并并完成排序。
时间复杂度：O(nlogn)、空间复杂度O(n)
正因为需要开辟新的内存空间，不是原地排序算法，所以应用并没有快排那么应用广泛。

递推公式：从左至右的排好序 = 开始到中间的排好序 + 中间到末尾的排好序
mergeSort(left...right) = merge(mergeSort(left...middle), mergeSort(middle+1...right))

终止条件：
数组length<=1

logs：6
[✔️]2020.05.22
[✔️]2020.05.26
[✔️]2020.06.15
[✔️]2020.06.22
[✔️]2020.06.23
[✔️]2020.07.06
*/

function mergeSort(array) {
  if (array.length <= 1) return array;
  let middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length > 0 && right.length > 0) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
  }
  // 因为left、right都是排好序的，所以如果一个length为0了就只需要合并就行，不需要遍历shift()了
  return result.concat(left, right);
}

const test = mergeSort([4, 4, 52, 13, 5, 8, 91, 1]);

//
// -------divider-------
//

/*
【快速排序】
（1）首先，从数组中选择一个值作为主元（pivot），也就是数组中间的那个值。
（2）创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值。
    移动左指针直到我们找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后交换它们，重复这个过程，直到左指针超过了右指针。
    这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分（partition）操作。
（3）接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已完全排序。

时间复杂度O(nlogn)

归并排序的处理过程是由下到上的，先处理子问题，然后再合并。而快排正好相反，它的处理过程是由上到下的，先分区，然后再处理子问题。
归并排序虽然是稳定的、时间复杂度为O(nlogn)的排序算法，但是它是非原地排序算法。

logs：6
[✔️]2020.05.26
[✔️]2020.06.01
[✔️]2020.06.15
[✔️]2020.06.23
[✔️]2020.07.06
[✔️]2020.07.07
*/
function quickSort(array) {
  return quick(array, 0, array.length - 1);
}

function quick(array, left, right) {
  if (array.length <= 1) return array;
  let index = partition(array, left, right);
  // 较主元小的值组成的子数组重复划分排序操作
  if (left < index - 1) quick(array, left, index - 1);
  // 较主元大的值组成的子数组重复划分排序操作
  if (index < right) quick(array, index, right);
  return array;
}

function partition(array, left, right) {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  // 这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后
  while (i <= j) {
    // 移动左指针直到我们找到一个比主元大的值
    while (array[i] < pivot) i++;
    // 移动右指针直到找到一个比主元小的值
    while (array[j] > pivot) j--;
    // 交换它们
    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }
  return i;
}

console.log(quick([4, 4, 52, 13, 5, 8, 91, 1]));

//
// -------divider-------
//

/*
【二分搜索】
* 先排序，然后选择数组的中间值。  
* 如果选中值是待搜索值，那么算法执行完毕（值找到了）。 
* 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）。 
* 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。

* 时间复杂度：O(logn)

logs：4
[✔️]2020.05.28
[✔️]2020.06.15
[✔️]2020.06.21
[✔️]2020.06.30
*/
function binarySearch(array, value) {
  array.sort((a, b) => a - b);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value > array[mid]) {
      low = mid + 1;
    } else if (value < array[mid]) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

//
// -------divider-------
//

/*
【二分搜索的变形①】
查找【第一个】值等于给定值的元素
https://time.geekbang.org/column/article/42733

logs：2
[✔️]2020.06.21
[✔️]2020.06.23
*/
function binarySearch1(array, value) {
  array.sort((a, b) => a - b);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value > array[mid]) {
      low = mid + 1;
    } else if (value < array[mid]) {
      high = mid - 1;
    } else {
      // 如果 mid 等于 0，那这个元素已经是数组的第一个元素，那它肯定是我们要找的；
      // 如果 mid 不等于 0，但 array[mid]的前一个元素 array[mid-1]不等于 value，那也说明 array[mid]就是我们要找的第一个值等于给定值的元素。(因为是排好序的，所以会相连)
      if (mid == 0 || array[mid - 1] != value) return mid;
      else high = mid - 1;
    }
  }
  return -1;
}
const test = binarySearch1([1, 2, 4, 5, 6, 8, 8, 8, 11, 18], 8); // 5

//
// -------divider-------
//

/*
【二分搜索的变形②】
查找【最后一个】值等于给定值的元素
https://time.geekbang.org/column/article/42733

logs：2
[✔️]2020.06.22
[✔️]2020.06.28
*/

function binarySearch2(array, value) {
  array.sort((a, b) => a - b);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value > array[mid]) {
      low = mid + 1;
    } else if (value < array[mid]) {
      high = mid - 1;
    } else {
      // 如果 array[mid]这个元素已经是数组中的最后一个元素了，那它肯定是我们要找的；
      // 如果 array[mid]的后一个元素 array[mid+1]不等于 value，那也说明 array[mid]就是我们要找的最后一个值等于给定值的元素。
      if (mid == array.length - 1 || array[mid + 1] != value) return mid;
      else low = mid + 1;
    }
  }
  return -1;
}
const test = binarySearch2([1, 2, 4, 5, 6, 8, 8, 8, 11, 18], 8); // 7

//
// -------divider-------
//

/*
【二分搜索的变形③】
查找第一个大于等于给定值的元素
https://time.geekbang.org/column/article/42733

logs：2
[✔️]2020.06.22
[✔️]2020.07.01
*/

function binarySearch3(array, value) {
  array.sort((a, b) => a - b);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value > array[mid]) {
      low = mid + 1;
    } else {
      // 如果array[mid]前面已经没有元素，或者前面一个元素小于要查找的值 value，那a[mid]就是我们要找的元素
      if (mid == 0 || array[mid - 1] < value) return mid;
      else high = mid - 1;
    }
  }
  return -1;
}
const test = binarySearch3([1, 3, 5, 7, 9], 4); // 2

//
// -------divider-------
//

/*
【二分搜索的变形④】
查找最后一个小于等于给定值的元素
https://time.geekbang.org/column/article/42733

logs：1
[✔️]2020.06.22
*/

function binarySearch4(array, value) {
  array.sort((a, b) => a - b);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value >= array[mid]) {
      if (mid == array.length - 1 || array[mid + 1] > value) return mid;
      else low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
const test = binarySearch4([1, 3, 5, 7, 9], 4); // 1

//
// -------divider-------
//

/*
【x的平方根】
https://leetcode-cn.com/problems/sqrtx/
https://time.geekbang.org/course/detail/130-67641
实现 int sqrt(int x) 函数。
计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:
输入: 4
输出: 2

示例 2:
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。

logs：0
*/
// 解法1：二分查找。

//
// -------divider-------
//

/* -------------------------- 字典树 ---------------------------*/

/*
【实现 Trie (字典树)】
https://leetcode-cn.com/problems/implement-trie-prefix-tree/
https://time.geekbang.org/course/detail/130-67644
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

示例:
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");   
trie.search("app");     // 返回 true

说明:
你可以假设所有的输入都是由小写字母 a-z 构成的。
保证所有输入均为非空字符串。
*/

//
// -------divider-------
//

/*
【单词搜索】
https://leetcode-cn.com/problems/word-search/
https://time.geekbang.org/course/detail/130-67643
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
给定一个二维网格和一个单词，找出该单词是否存在于网格中。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

示例:
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false
 
提示：
board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3


logs：0
*/

// 解法1：DFS
// 解法2：Trie

//
// -------divider-------
//

/*
【位的个数】
https://leetcode-cn.com/problems/number-of-1-bits/
https://time.geekbang.org/course/detail/130-67646
编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。

示例 1：
输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

示例 2：
输入：00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

示例 3：
输入：11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
*/

//
// -------divider-------
//

/* -------------------------- 动态规划、贪心算法 ---------------------------*/
/*
【杨辉三角】
https://leetcode-cn.com/problems/pascals-triangle/
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:
输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]

logs：0
*/
// 解法1：动态规划

//
// -------divider-------
//

/*
【N皇后】困难
https://leetcode-cn.com/problems/n-queens/
https://time.geekbang.org/course/detail/130-67638
n皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

logs：0
*/

//
// -------divider-------
//

/*
【N皇后②】困难
https://leetcode-cn.com/problems/n-queens-ii/
n皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

logs：0
*/

//
// -------divider-------
//

/*
【最大子序和】
https://leetcode-cn.com/problems/maximum-subarray/
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

进阶:
如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

logs：0
*/
// 解法1：动态规划

//
// -------divider-------
//

/*
【买卖股票的最佳时机】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
注意：你不能在买入股票前卖出股票。

示例 1:
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

示例 2:
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

logs：0
*/
// 动态规划。O(n)
// DFS。时间复杂度O(2^n)
// 贪心算法。时间复杂度O(n)

//
// -------divider-------
//

/*
【买卖股票的最佳时机 II】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

示例 2:
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

示例 3:
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

logs：0
*/
// 解法1：暴力法。列举所有可以的交易组合及对于的利润。时间复杂度：时间复杂度：O(n^n)，调用递归函数 n^n次。
// 解法2：贪心算法。时间复杂度：O(n)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var j = 0;
  for (var i = 0; i < prices.length - 1; i++) {
    if (prices[i] < prices[i + 1]) {
      j = j + prices[i + 1] - prices[i];
    }
  }
  return j;
};
// 解法3：动态规划。时间复杂度：O(n)

//
// -------divider-------
//

/*
【最大子序和】
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

logs：0
*/

// 解法1：动态规划
// 解法2：贪心算法

//
// -------divider-------
//

/*
【棋牌问题】
https://time.geekbang.org/course/detail/130-69764
迷宫从左上角走到右下角共有多少种走法
*/
// 动态规划
// dp(i, j) = dp(i+1, j) + dp(i, j+1)
let countPath = (mat) => {
  let rows = mat.length,
    cols = mat[0].length;
  let opt = new Array(rows).fill(0).map(() => {
    return new Array(cols).fill(0);
  });

  for (let i = rows - 1; i >= 0; --i) {
    for (let j = cols - 1; j >= 0; --j) {
      if (mat[i][j] === 1) {
        // 障碍物
        opt[i][j] = 0;
      } else if (i === rows - 1 && j === cols - 1) {
        // 终点
        opt[i][j] = 0;
      } else if (i === rows - 1 || j === cols - 1) {
        // 下边缘 & 右边缘
        opt[i][j] = 1;
      } else {
        // 递推
        opt[i][j] = opt[i + 1][j] + opt[i][j + 1];
      }
    }
  }
  return opt[0][0];
};

let mat = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
console.log(countPath(mat)); // 27

//
// -------divider-------
//

/*
【爬楼梯】
https://leetcode-cn.com/problems/climbing-stairs/
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
注意：给定 n 是一个正整数。

示例 1：
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

示例 2：
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

logs：0
*/
// 解法1：回溯
// 解法2：动态规划

//
// -------divider-------
//

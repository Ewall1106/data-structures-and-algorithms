/* -------------------------- 数组、栈 ---------------------------*/
// stack：先入后出
// queue：先入先出

/*
【下一个更大元素 I】
https://leetcode-cn.com/problems/next-greater-element-i/
给定两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
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

logs：0
*/

// 解法1：单调栈。我们可以忽略数组 nums1，先对将 nums2 中的每一个元素，求出其下一个更大的元素。随后对于将这些答案放入哈希映射（HashMap）中，再遍历数组 nums1，并直接找出答案。对于 nums2，我们可以使用单调栈来解决这个问题。
// 时间复杂度：O(M+N)，其中 MM 和 NN 分别是数组 nums1 和 nums2 的长度。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let map = new Map();
  for (let num of nums2) {
    while (stack.length && num > stack[0]) {
      map.set(stack.shift(), num);
    }
    stack.unshift(num);
  }
  while (stack.length) {
    map.set(stack.shift(), -1);
  }
  return nums1.map((item) => map.get(item));
};

// 解法2：暴力破解法。
var nextGreaterElement = function (nums1, nums2) {
  return nums1.map((item) => {
    let index = nums2.indexOf(item);
    for (let i = index + 1; i < nums2.length; i++) {
      if (nums2[i] > nums2[index]) {
        return nums2[i];
      }
    }
    return -1;
  });
};

//
// -------divider-------
//

/*
【十进制转二进制】

logs：0
*/
function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = "";
  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
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

logs：2
[✔️]2020.04.20
[✔️]2020.05.08
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

/*
【用栈实现队列】
https://leetcode-cn.com/problems/implement-queue-using-stacks
使用栈实现队列的下列操作：
  push(x) -- 将一个元素放入队列的尾部。
  pop() -- 从队列首部移除元素。
  peek() -- 返回队列首部的元素。
  empty() -- 返回队列是否为空。

示例:
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);  
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

logs：1
[✔️]2020.04.21
*/

// 解法1：使用两个stack，一个是输入栈、一个是输出栈
// 解法2：js本身数据就有这些方法实现stack，只是思想上太符合

/**
 * Initialize your data structure here.
 */
let MyQueue = function () {
  this.queue = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (element) {
  this.queue.push(element);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  return (flag = this.queue.shift());
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return (done = this.queue[0]);
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.queue.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

//
// -------divider-------
//

/*
【用队列实现栈】
https://leetcode-cn.com/problems/implement-stack-using-queues
使用队列实现栈的下列操作：
  push(x) -- 元素 x 入栈
  pop() -- 移除栈顶元素
  top() -- 获取栈顶元素
  empty() -- 返回栈是否为空

logs：1
[✔️]2020.04.21
*/

// 解法1：使用两个[]
// 解法2：使用js语言array特性
/**
 * Initialize your data structure here.
 */
let MyStack = function () {
  this.stack = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  return this.stack.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  if (!this.empty()) {
    return this.stack.pop();
  }
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.stack.length == 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

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
*/
// 解法1：使用优先队列，小顶堆min-heap，堆的元素个数都为k个，然后对新进来的值进行判断操作。时间复杂度：log2^k
// 这题也太难了吧。。。。。。因为js没有内置min-heap这个类型，所以需要先自己造一个小顶堆，小顶堆本质是棵树，所以我们树弄完了以后再回过头看这个问题。
// 解法2：使用一个数组，对前k项从大到小的排序，并对新add进来的数进行判断是塞进来还是丢弃。时间复杂度：k*logk

//
// -------divider-------
//

/*
【滑动窗口最大值】
https://leetcode-cn.com/problems/sliding-window-maximum/
给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
返回滑动窗口中的最大值。

示例：
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
*/
// 解法1：使用优先队列，大顶堆max-heap，时间复杂度：N*O(logk)
// 解法2：使用队列Queue。时间复杂度：O(n)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  let deque = [],
    ans = [];
  for (let i = 0; i < nums.length; i++) {
    if (i >= k && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[i] >= nums[deque[deque.length - 1]])
      deque.pop();
    deque.push(i);
    if (i >= k - 1) ans.push(nums[deque[0]]);
  }
  return ans;
};

//
// -------divider-------
//

/* -------------------------- 队列、优先队列 ---------------------------*/
// priorityQueue：优先队列。实现机制：堆（二叉堆）、二叉搜索树

/* -------------------------- 链表 ---------------------------*/
/* 
  【反转链表】
  https://leetcode-cn.com/problems/reverse-linked-list/
  反转一个单链表
  
  示例：
  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL

  logs：5
  [✔️]2020.04.19
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.07
*/
// 迭代解法：时间复杂度O(n)、空间复杂度：O(1)
var reverseList = function (head) {
  let pre = null;
  while (head) {
    let next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
};
var reverseList = function (head) {
  let pre = null;
  while (head) {
    [head.next, pre, head] = [pre, head, head.next];
  }
  return pre;
};

// 递归解法：时间复杂度：O(n)、空间复杂度：O(n)
var reverseList = function (head) {
  // 递归
  function reverse(curr, prev) {
    if (curr === null) return prev;
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

  logs：1
  [✔️]2020.04.20
*/
// 迭代：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(1)。
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
  head.next = swapPairs(temp.next);
  temp.next = head;
  return temp;
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

  logs：4
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.06
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
  let slow = head,
    fast = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
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

  logs：2
  [✔️]2020.04.20
  [✔️]2020.04.29
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
  【k个一组翻转链表】【hard】
  https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
  给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
  k 是一个正整数，它的值小于或等于链表的长度。
  如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
  
  示例：
  给你这个链表：1->2->3->4->5
  当 k = 2 时，应当返回: 2->1->4->3->5
  当 k = 3 时，应当返回: 3->2->1->4->5

  logs：0
*/

// 解法1：递归
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
  let pre = null,
    cur = head;
  let p = head;
  for (let i = 0; i < k; i++) {
    if (p == null) return head;
    p = p.next;
  }
  for (let i = 0; i < k; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  head.next = reverseKGroup(cur, k);
  return pre;
};

// 解法2：迭代
var reverseKGroup = function (head, k) {
  let pre = new ListNode(-1);
  pre.next = head;
  let cur = pre;
  function hasNode(head) {
    for (let i = 0; i < k; i++) {
      if (!head) return false;
      head = head.next;
    }
    return true;
  }
  while (hasNode(cur.next)) {
    let head = cur.next;
    let end = cur.next.next;
    let temp = cur.next;
    for (let i = 0; i < k - 1; i++) {
      let next = end.next;
      end.next = temp;
      temp = end;
      end = next;
    }
    head.next = end;
    cur.next = temp;
    cur = head;
  }
  return pre.next;
};

//
// -------divider-------
//

/* -------------------------- Map、Set  ---------------------------*/

/* 
【有效的字母异位词】
https://leetcode-cn.com/problems/valid-anagram/
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
*/

// 解法1：sort排序，对两个单词进行排序，如果排完序以后全等，那么则为true。时间复杂度：用快排O(nlog(n))

// new Array(arrayLength)：一个范围在 0 到 232-1 之间的整数，此时将返回一个 length 的值等于 arrayLength 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 arrayLength 个值为 undefined 的元素）。如果传入的参数不是有效值，则会抛出 RangeError 异常。

// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。例如：
// const array1 = [1, 2, 3, 4];
// console.log(array1.fill(6)); output: [6, 6, 6, 6]

// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
/**
 * 通过桶排序方式
 */
var isAnagram = function (s, t) {
  var arr1 = new Array(26).fill(0);
  var arr2 = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    var key = s[i].charCodeAt() - 97;
    arr1[key] += 1;
  }
  for (let i = 0; i < t.length; i++) {
    var key = t[i].charCodeAt() - 97;
    arr2[key] += 1;
  }

  return arr1.join("") === arr2.join("");
};

// 解法2：map，对单词中的每个字母进行计数看出现了几次。 时间复杂度：O(n)
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  let visit = {};
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (visit[c] === undefined) visit[c] = 1;
    else visit[c]++;
  }
  for (let i = 0; i < t.length; i++) {
    let c = t[i];
    if (visit[c] === undefined) return false;
    else visit[c]--;
  }
  for (let key in visit) {
    if (visit[key] != 0) {
      return false;
    }
  }
  return true;
};

//
// -------divider-------
//

/* 
【两数之和】
https://leetcode-cn.com/problems/two-sum/
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例：
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

logs：1
[✔️]2020.05.07
*/

// 解析：
// 解法1：暴力破解法
//   使用两个for循环，如果相加等于target值则return，
//   时间复杂度为O(n^2)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
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
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    } else {
      map.set(nums[i], i);
    }
  }
};

//
// -------divider-------
//

/* 
【三数之和】
https://leetcode-cn.com/problems/3sum/
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/

// 解法1：暴力求解，三个for循环。时间复杂度：O(n^3)
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          let value = [nums[i], nums[j], nums[k]].sort();
          let key = value.join(",");

          if (!Object.keys(map).includes(key)) {
            map[key] = value;
          }
        }
      }
    }
  }

  return Object.values(map);
};

// 解法2：使用set。排序+双指针。时间复杂度O(n^2)
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let res = [];
  let len = nums.length;
  if (!nums || len < 3) return res;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let l = i + 1,
      r = len - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum == 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] == nums[l + 1]) l++;
        while (l < r && nums[r] == nums[r - 1]) r--;
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

/* -------------------------- 树、二叉树、二叉搜索树 ---------------------------*/
// 二叉树遍历
// 前序遍历（pre-order）：根-左-右
// 中序遍历（in-order）：左-根-右
// 后序遍历（post-order）：左-右-根

/* 
【验证二叉搜索树】BinarySearchTree
https://leetcode-cn.com/problems/validate-binary-search-tree/
给定一个二叉树，判断其是否是一个有效的二叉搜索树。
假设一个二叉搜索树具有如下特征：
节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
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
  return helper(root, null, null);
};

function helper(root, low, high) {
  if (root === null) return true;
  if (low !== null && root.val <= low) return false;
  if (high !== null && root.val >= high) return false;
  if (!helper(root.left, low, root.val)) return false;
  if (!helper(root.right, root.val, high)) return false;
  return true;
}

// 解法2：使用递归。时间复杂度：O(n)
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
  let preVal = null;
  function isValid(root) {
    if (root == null) return true;
    if (isValid(root.left)) {
      if (preVal != null && preVal >= root.val) {
        return false;
      }
      preVal = root.val;
      return isValid(root.right);
    }
    return false;
  }
  return isValid(root);
};

//
// -------divider-------
//

/*
【二叉搜索树的最近公共祖先】
https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
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
*/

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
*/

//
// -------divider-------
//

/* -------------------------- 递归、分治 ---------------------------*/

/*
【斐波那契数列】
1、求1，1，2，3，5，8，....第n个数是多少？
2、计算阶乘n! = 1 x 2 x 3 x ... x n
*/
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

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
*/

// 解法1：暴力破解法，傻乘，如求2的10次方，就循环10次。时间复杂度O(n)
// 解法2：分治+递归，时间复杂度O(logn)
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n == 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  if (n % 2) return x * myPow(x, n - 1);
  return myPow(x * x, n / 2);
};

// 解法3：非递归、位运算 https://time.geekbang.org/course/detail/130-42711

//
// -------divider-------
//

/*
多数元素、求众数
https://leetcode-cn.com/problems/majority-element/
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1:

输入: [3,2,3]
输出: 3
示例 2:

输入: [2,2,1,1,1,2,2]
输出: 2
*/

// 解法1：暴力破解。即枚举数组中的每个元素，再遍历一遍数组统计其出现次数，时间复杂度为O(N^2)
// 解法2：哈希表。我们使用哈希来存储每个元素以及出现的次数。对于哈希映射中的每个键值对，键表示一个元素，值表示该元素出现的次数。时间复杂度O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    map[curr] = map[curr] == null ? 1 : map[curr] + 1;
    if (map[curr] > nums.length / 2) {
      return curr;
    }
  }
};

// 解法3：排序。如果将数组 nums 中的所有元素按照单调递增或单调递减的顺序排序，那么下标为[n/2]的元素（下标从 0 开始）一定是众数。时间复杂度：O(nlogn)。
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

// 解法4：分治。将数组递归层层一分为二，把左边众数的和右边众数依次作比较。时间复杂度：O(nlogn)。

//
// -------divider-------
//

/* -------------------------- 贪心算法 ---------------------------*/

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

/* -------------------------- 广度优先搜索、深度优先搜索 ---------------------------*/

/*
【二叉树的层序遍历】
https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

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
  if (root == null) return [];
  let queue = [],
    result = [];
  queue.push(root);

  // let visited = new Set() visited.add(root) 图的遍历之类的需要将已遍历过的节点记录下来

  while (queue.length !== 0) {
    let tmp = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(tmp);
  }
  return result;
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
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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
*/
// 解法1：DFS、分治。时间复杂度O(n)
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
  if (root == null) return 0;
  if (root.left == null) return minDepth(root.right) + 1;
  if (root.right == null) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

//
// -------divider-------
//

/*
【括号生成】
https://leetcode-cn.com/problems/generate-parentheses/
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
示例：

输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
*/
// 解法1：递归、DFS。时间复杂度O(2^n)
// https://time.geekbang.org/course/detail/130-67636
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  let dfs = (s, left, right) => {
    if (left == n && right == n) return res.push(s);
    if (left < n) dfs(`${s}(`, left + 1, right);
    if (left > right && right < n) dfs(`${s})`, left, right + 1);
  };
  dfs("", 0, 0);
  return res;
};

//
// -------divider-------
//

/*
【N皇后】困难
https://leetcode-cn.com/problems/n-queens/
https://time.geekbang.org/course/detail/130-67638
n皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
*/

//
// -------divider-------
//

/* -------------------------- 二分搜索 ---------------------------*/

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
*/
// 解法1：二分查找。

//
// -------divider-------
//

/* -------------------------- 字典树 ---------------------------*/

/*
【实现 Trie (前缀树)】
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

/* -------------------------- 动态规划 ---------------------------*/

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

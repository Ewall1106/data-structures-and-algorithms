/* -------------------------- 数组、链表 ---------------------------*/
/* 
  【反转链表】
  https://leetcode-cn.com/problems/reverse-linked-list/
  反转一个单链表
  
  示例：
  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL

  logs：
  ✔️2020.04.19
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
  let [prev, curr] = [null, head];
  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  return prev;
};
// 递归解法：时间复杂度：O(n)、空间复杂度：O(n)
var reverseList = function (head) {
  // 递归
  function reverse(curr, prev) {
    if (curr === null) return prev;
    const tmp = curr.next;
    curr.next = prev;
    return reverse(tmp, curr);
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
  */
// 递归：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(N)，递归过程使用的堆栈空间。
var swapPairs = function (head) {
  if (!head) return null;
  if (!head.next) return head;
  let temp = head.next;
  head.next = swapPairs(temp.next);
  temp.next = head;
  return temp;
};
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
  */

// 解法1：让他一直循环，如果有环的话，那么会一直循环下去，设置一个限制时间。
// 解法2：搞个新的set、判重。时间复杂度：O(n*1)
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
  while (head !== null) {
    if (hash.has(head)) return true;
    hash.add(head);
    head = head.next;
  }
  return false;
};
// 解法3：快慢指针，块指针走2步，慢指针走1步，如果有有环，那么两个指针会相遇。时间复杂度：O(n )
var hasCycle = function (head) {
  let slow = (fast = head);
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
  */

// 解法1：迭代
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
// 解法2：hash
var detectCycle = function (head) {
  let hash = new Set();
  while (head) {
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
  【k个一组翻转链表】
  https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
  给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
  k 是一个正整数，它的值小于或等于链表的长度。
  如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
  
  示例：
  给你这个链表：1->2->3->4->5
  当 k = 2 时，应当返回: 2->1->4->3->5
  当 k = 3 时，应当返回: 3->2->1->4->5
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

/* -------------------------- 堆栈、队列、优先队列 ---------------------------*/
// stack：先入后出
// queue：先入先出
// priorityQueue：优先队列。实现机制：堆（二叉堆）、二叉搜索树

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
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      if (s[i] != map[stack.pop()]) {
        return false;
      }
    }
  }
  return !stack.length;
};
// 解法2：使用正则，把‘[]’、‘()’、‘{}’用replace两两消掉，循环后如果字符串为空则返回true，反之则为false。
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
*/

// 解法1：使用两个stack，一个是输入栈、一个是输出栈
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stackIn = [];
  this.stackOut = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stackIn.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (!this.stackIn.length && !this.stackOut.length) return undefined;
  if (this.stackOut.length) return this.stackOut.pop();
  while (this.stackIn.length) {
    this.stackOut.push(this.stackIn.pop());
  }
  return this.stackOut.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.stackOut.length) {
    return this.stackOut[this.stackOut.length - 1];
  } else if (this.stackIn.length) {
    return this.stackIn[0];
  } else {
    return undefined;
  }
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stackOut.length || this.stackIn.length ? false : true;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// 解法2：js本身数据就有这些方法实现stack，只是思想上太符合
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
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
*/

// 解法1：使用js语言array特性
/**
 * Initialize your data structure here.
 */
var MyStack = function () {
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

// 解法2：
/**
 * Initialize your data structure here.
 */
var MyStack = function () {
  this.queuekIn = [];
  this.queueOut = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  if (!this.queuekIn.length && !this.queuekOut.length) {
    this.queuekIn.push(x);
  } else if (this.queuekIn.length) {
    this.queuekIn.push(x);
  } else {
    this.queueOut.push(x);
  }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  if (this.empty()) return null;
  if (this.queuekIn.length) {
    while (this.queuekIn.length > 1) {
      this.queueOut.push(this.queuekIn.shift());
    }
    return this.queuekIn.shift();
  } else if (this.queueOut.length) {
    while (this.queueOut.length > 1) {
      this.queuekIn.push(this.queueOut.shift());
    }
    return this.queueOut.shift();
  }
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  if (this.empty()) return null;
  if (this.queuekIn.length) {
    return this.queuekIn[this.queuekIn.length - 1];
  } else {
    return this.queueOut[this.queueOut.length - 1];
  }
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.queuekIn.length && !this.queueOut.length;
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
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例：
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
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
    for (let k = i + 1; k < nums.length; k++) {
      if (nums[i] + nums[k] == target) {
        return [i, k];
      }
    }
  }
};

// 解法2：set，用哈希表，时间复杂度为O(n)
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
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
// 以下是中序遍历的写法吗？未知。
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

// 解法1：暴力破解法
// 解法2：分治+递归
// 解法3：非递归、位运算 https://time.geekbang.org/course/detail/130-42711
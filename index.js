/* -------------------------- 数组、链表 ---------------------------*/
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
// 1、暴力破解法
//   使用两个for循环，如果相加等于target值则return，
//   时间复杂度为O(n^2)
// 2、用哈希表，时间复杂度为O(n)
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
  【反转链表】
  https://leetcode-cn.com/problems/reverse-linked-list/
  反转一个单链表
  
  示例：
  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL
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
// 递归解法，时间复杂度：O(n)、空间复杂度：O(n)
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

/* -------------------------- 堆栈、队列 ---------------------------*/
// stack：先入后出
// queue：先入先出

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
  this.items = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (element) {
  this.items.push(element);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  return (flag = this.items.shift());
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return (done = this.items[0]);
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.items.length === 0;
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
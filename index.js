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
  /* 
  解析：
  1、暴力破解法
    使用两个for循环，如果相加等于target值则return，
    时间复杂度为O(n^2)
  2、用哈希表，时间复杂度为O(n)
  */
  
  //
  //
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
  //
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
  //
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
  //
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
  // 解法1：
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
  //
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
  
  //
  //
  //
  
  /* -------------------------- 堆栈、队列 ---------------------------*/
  // stack：先入后出
  // queue：先入先出
  
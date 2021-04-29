/*
【目录】
数组、栈
链表、队列
集合、字典、散列表
树、二叉树、二叉搜索树
递归、分治、回溯
图、DFS、BFS
动态规划、贪心算法
排序、搜索算法
LRU Cache
*/

/* -------------------------- 数组、栈 ---------------------------*/

/*
【柱状图中最大的矩形】
https://leetcode-cn.com/problems/largest-rectangle-in-histogram/

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。

logs：9
2021.01.19
2021.01.22
2021.02.01
2021.02.24
2021.03.03
2021.03.08
2021.03.17
2021.04.06
2021.04.26
*/

// 暴力破解法 for-loop列出所有的面积可能 时间复杂度O(n^2)
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let area = 0;
  // 枚举左边界
  for (let i = 0; i < heights.length; i++) {
    // 需保存[i, j]区间之中的最小值，而非nums[i]与nums[j]的最小值
    let minHeight = Infinity;
    // 枚举右边界（从自己开始算，所以不用i+1）
    for (let j = i; j < heights.length; j++) {
      // 确定高度
      minHeight = Math.min(minHeight, heights[j]);
      // 计算面积
      area = Math.max(area, (j - i + 1) * minHeight);
    }
  }
  return area;
};

// 双指针法 时间复杂度O(n^2)
// 使用一重循环枚举某一根柱子高度为h，随后我们从这跟柱子开始向两侧延伸，直到遇到高度小于h的柱子，就确定了矩形的左右边界。
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let area = 0;
  for (let i = 0; i < heights.length; i++) {
    // 枚举高
    let h = heights[i]; // 最高点
    let left = (right = i);
    // 确定左边界
    while (left - 1 >= 0 && heights[left - 1] >= h) {
      left--;
    }
    // 确定右边界（注意一下：heights.length-1才是数组最后一项）
    while (right + 1 <= heights.length - 1 && heights[right + 1] >= h) {
      right++;
    }
    // 计算面积
    area = Math.max(area, (right - left + 1) * h);
  }
  return area;
};

// 单调栈 时间复杂度O(n) 空间复杂度O(n)
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  if (!heights || !heights.length) return 0;

  heights.push(0);
  heights.unshift(0);

  let maxArea = 0;
  let stack = [];
  for (let i = 0; i < heights.length; i++) {
    // 通过与当前柱高做比较，可以确定栈中柱的右边界
    // 而栈中维护的都是从小到大排序的元素的索引，所以左边界就是前一个值
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      maxArea = Math.max(
        maxArea,
        heights[stack.pop()] * (i - stack[stack.length - 1] - 1)
      );
    }
    stack.push(i);
  }
  return maxArea;
};

//
// -------divider-------
//

/*
【最小栈】
https://leetcode-cn.com/problems/min-stack/

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。

logs：9
[✔️]2020.12.02
[✔️]2021.01.04
[✔️]2021.01.15
[✔️]2021.01.18
[✔️]2021.01.28
[✔️]2021.02.01
[✔️]2021.02.24
[✔️]2021.03.09
[✔️]2021.04.07
[✔️]2021.04.26
*/

// 辅助栈法
var MinStack = function () {
  this.stack = [];
  this.min_stack = [Infinity];
};

MinStack.prototype.push = function (x) {
  this.stack.push(x);
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};

//
// -------divider-------
//

/*
【盛最多水的容器】
https://leetcode-cn.com/problems/container-with-most-water/

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

logs：10
[✔️]2020.11.29
[✔️]2020.11.30
[✔️]2020.12.01
[✔️]2020.12.03
[✔️]2020.12.24
[✔️]2021.01.18
[✔️]2021.01.28
[✔️]2021.02.01
[✔️]2021.03.08
[✔️]2021.04.07
*/

// 暴力破解法 时间复杂度O(n*2)
var maxArea = function (height) {
  let max = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let area = (j - i) * Math.min(height[i], height[j]);
      max = Math.max(max, area);
    }
  }
  return max;
};

// 左右双指针（左右夹逼），一头一尾两个指针往中间收敛，找到最大面积 时间复杂度O(n)
var maxArea = function (height) {
  let max = 0;
  let i = 0;
  let j = height.length - 1;
  while (i < j) {
    let area = (j - i) * Math.min(height[i], height[j]);
    height[i] < height[j] ? i++ : j--;
    max = Math.max(max, area);
  }
  return max;
};

//
// -------divider-------
//

/*
【移动零】
https://leetcode-cn.com/problems/move-zeroes/
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

logs：12
[✔️]2020.11.27
[✔️]2020.11.28
[✔️]2020.12.03
[✔️]2021.01.04
[✔️]2021.01.06
[✔️]2021.01.19
[✔️]2021.01.22
[✔️]2021.01.28
[✔️]2021.02.01
[✔️]2021.03.12
[✔️]2021.04.07
[✔️]2021.04.26
*/
// 使用一个额外数组。时间复杂度O(n)、空间复杂度O(n)
// 双指针。时间复杂度O(n)
var moveZeroes = function (nums) {
  let j = 0; // j指向位置为0的索引
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (i !== j) {
        nums[j] = nums[i];
        nums[i] = 0;
      }
      j++;
    }
  }
};

// 交换
var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
};

// 暴力破解法 loop 时间复杂度O(n^2)
var moveZeroes = function (nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] != 0) continue;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] != 0) {
        nums[i] = nums[j];
        nums[j] = 0;
        break;
      }
    }
  }
};

//
// -------divider-------
//

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

logs：10
[✔️]2020.05.15
[✔️]2020.05.16
[✔️]2020.05.19
[✔️]2020.05.26
[✔️]2020.06.16
[✔️]2020.07.17
[✔️]2020.08.04
[✔️]2020.08.20
[✔️]2020.11.02
[✔️]2021.01.12
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

logs：10
[✔️]2020.05.15
[✔️]2020.05.16
[✔️]2020.05.19
[✔️]2020.05.26
[✔️]2020.06.16
[✔️]2020.07.17
[✔️]2020.08.04
[✔️]2020.08.20
[✔️]2020.11.17
[✔️]2021.01.19
*/

// 去重。对数组去重以后在比较length
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

// 暴力破解法。把每个元素都排查一遍。
var containsDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) !== nums.lastIndexOf(nums[i])) {
      return true;
    }
  }
  return false;
};

// 使用排序。时间复杂度O(n)
// 排序之后对比相邻元素，看是否重复。
var containsDuplicate = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] == nums[i + 1]) return true;
  }
  return false;
};

// 使用hash。空间换时间，时间复杂度O(n)、空间复杂度O(n)
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

logs：10
[✔️]2020.05.12
[✔️]2020.05.14
[✔️]2020.05.16
[✔️]2020.06.05
[✔️]2020.06.15
[✔️]2020.07.20
[✔️]2020.08.05
[✔️]2020.08.28
[✔️]2020.12.16
[✔️]2021.04.07
*/

// 解法1：暴力破解法。旋转 k 次，每次将数组旋转 1 个元素。时间复杂度：O(n*k) 。每个元素都被移动n步，移动k轮 。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  let prev, temp;
  for (let i = 0; i < k; i++) {
    prev = nums[nums.length - 1];
    for (let j = 0; j < nums.length; j++) {
      temp = nums[j];
      nums[j] = prev;
      prev = temp;
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

logs：11
[✔️]2020.05.11
[✔️]2020.05.14
[✔️]2020.06.01
[✔️]2020.06.05
[✔️]2020.06.17
[✔️]2020.07.20
[✔️]2020.08.06
[✔️]2020.10.28
[✔️]2020.12.07
[✔️]2021.01.22
[✔️]2021.04.07
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
【合并区间】
https://leetcode-cn.com/problems/merge-intervals/
给出一个区间的集合，请合并所有重叠的区间。

示例 1:
输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2:
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

logs：10
[✔️]2020.08.28
[✔️]2020.08.31
[✔️]2020.09.16
[✔️]2020.10.12
[✔️]2020.10.28
[✔️]2020.11.02
[✔️]2020.11.27
[✔️]2020.11.30
[✔️]2020.12.16
[✔️]2021.01.23
*/

// 排序。时间复杂度 O(nlogn)
var merge = function (intervals) {
  if (!intervals || !intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    if (merged[merged.length - 1][1] >= intervals[i][0]) {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        intervals[i][1]
      );
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
};

/*
【汇总区间】
https://leetcode-cn.com/problems/summary-ranges/

给定一个无重复元素的有序整数数组 nums 。
返回【恰好覆盖数组中所有数字】的【最小有序】区间范围列表。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。

列表中的每个区间范围 [a,b] 应该按如下格式输出：

"a->b" ，如果 a != b
"a" ，如果 a == b
 
示例 1：
输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"

示例 2：
输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]
解释：区间范围是：
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"

示例 3：
输入：nums = []
输出：[]

示例 4：
输入：nums = [-1]
输出：["-1"]

示例 5：
输入：nums = [0]
输出：["0"]

logs：09
[✔️]2021.01.27
[✔️]2021.02.02
[✔️]2021.02.17
[✔️]2021.02.20
[✔️]2021.03.12
[✔️]2021.03.09
[✔️]2021.04.07
[✔️]2021.04.09
[✔️]2021.04.26
*/

// 双指针。时间复杂度O(n)、空间复杂度O(n)
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  let result = [];
  let j = 0;
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] - nums[i - 1] !== 1) {
      result.push(
        i - j === 1 ? `${nums[i - 1]}` : `${nums[j]}->${nums[i - 1]}`
      );
      j = i;
    }
  }
  return result;
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

logs：11
[✔️]2020.05.10
[✔️]2020.05.11
[✔️]2020.06.01
[✔️]2020.06.05
[✔️]2020.06.17
[✔️]2020.07.20
[✔️]2020.08.06
[✔️]2020.10.28
[✔️]2020.11.17
[✔️]2021.01.23
[✔️]2021.04.09
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
    digits[i] = (digits[i] + 1) % 10;
    if (digits[i] != 0) {
      return digits;
    }
  }
  return [1, ...digits];
};

//
// -------divider-------
//

/*
【删除排序数组中的重复项】
https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
给定一个【排序数组】，你需要在【原地】删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1:
给定数组 nums = [1,1,2], 
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
【你不需要考虑数组中超出新长度后面的元素。（注意这一句话！！！！）】

示例 2:
给定 nums = [0,0,1,1,1,2,2,3,3,4],
函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
你不需要考虑数组中超出新长度后面的元素。

logs：10
[✔️]2020.05.09
[✔️]2020.05.10
[✔️]2020.05.11
[✔️]2020.06.05
[✔️]2020.06.17
[✔️]2020.07.20
[✔️]2020.08.12
[✔️]2020.10.27
[✔️]2020.11.17
[✔️]2021.03.09
*/

// 解法：使用两个指针，如果相等就跳过。时间复杂度：O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let index = 1; // 这是一个指针，下面的 i 也是一个指针
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[index] = nums[i];
      index++;
    }
  }
  return index;
};

//
// -------divider-------
//

/*
【数组去重】

logs：10
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.17
[✔️]2020.06.23
[✔️]2020.07.01
[✔️]2020.07.21
[✔️]2020.08.12
[✔️]2020.10.26
[✔️]2020.11.18
[✔️]2021.01.23
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
  let has = {};
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (!has[nums[i]]) {
      result.push(nums[i]);
      has[nums[i]] = true;
    }
  }
  return result;
};

// 解法4：排序后去重。时间复杂度O(n)、空间复杂度O(1)
var uniqueArray = function (nums) {
  nums.sort((a, b) => a - b);
  let index = 1; // 这是一个指针，下面的 i 也是一个指针
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[index] = nums[i];
      index++;
    }
  }
  return nums.slice(0, index);
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

logs：11
[✔️]2020.05.09
[✔️]2020.05.14
[✔️]2020.06.01
[✔️]2020.06.06
[✔️]2020.06.17
[✔️]2020.07.22
[✔️]2020.08.13
[✔️]2020.10.28
[✔️]2020.11.18
[✔️]2021.01.23
[✔️]2021.03.10
*/

// 单调栈。我们可以忽略数组 nums1，先对将 nums2 中的每一个元素，求出其下一个更大的元素。随后对于将这些答案放入哈希映射（HashMap）中，再遍历数组 nums1，并直接找出答案。
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
  return nums1.map(item => map.get(item));
};

// 解法2：暴力破解法。
var nextGreaterElement = function (nums1, nums2) {
  let result = nums1.map(item => {
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

logs：9
[✔️]2020.05.09
[✔️]2020.05.14
[✔️]2020.06.02
[✔️]2020.06.06
[✔️]2020.06.17
[✔️]2020.06.21
[✔️]2020.08.13
[✔️]2020.10.28
[✔️]2020.11.18
*/
// 十进制转二进制。要把十进制转化成二进制，我们可以将该十进制数除以 2（二进制是满二进一）并对商取整，直到结果是 0 为止。
function decimalToBinary(number) {
  const remStack = [];
  while (number > 0) {
    let rem = number % 2;
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  return remStack.join('');
}

// 十进制转其它任意进制
function baseConverter(number, base) {
  if (base < 2 || base > 36) return '';

  const stack = [];
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  while (number > 0) {
    let rem = number % base;
    stack.push(digits[rem]);
    number = Math.floor(number / base);
  }
  return stack.join('');
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

logs：10
[✔️]2020.04.20
[✔️]2020.05.08
[✔️]2020.06.02
[✔️]2020.06.06
[✔️]2020.06.17
[✔️]2020.06.21
[✔️]2020.08.20
[✔️]2020.10.28
[✔️]2020.11.18
[✔️]2021.04.07
*/

// 解法1：栈stack。时间复杂度：O(n)、空间复杂度O(n)
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];
  let map = { '(': ')', '[': ']', '{': '}' };

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

// 解法2：消消乐，使用正则，把'[]'、'()'、'{}'用replace两两消掉，循环后如果字符串为空则返回true，反之则为false。
// 时间复杂度 O(n^2)
var isValid = function (s) {
  let length;
  do {
    length = s.length;
    s = s.replace('()', '').replace('{}', '').replace('[]', '');
  } while (length != s.length);

  return s.length === 0;
};

//
// -------divider-------
//

/* -------------------------- 链表、队列 ---------------------------*/
// priorityQueue：优先队列。实现机制：堆（二叉堆）、二叉搜索树

/*
【实现js的二叉堆】
对于给定位置n。
  它的左侧子节点的位置是 2n + 1（如果位置可用）；
  它的右侧子节点的位置是 2n + 2（如果位置可用）； 
  它的父节点位置是 n / 2（如果位置可用）。

logs：9
[✔️]2020.05.23
[✔️]2020.06.01
[✔️]2020.06.02
[✔️]2020.06.18
[✔️]2020.07.01
[✔️]2020.07.21
[✔️]2020.08.21
[✔️]2020.11.04
[✔️]2020.11.19
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

logs：11
[✔️]2020.05.26
[✔️]2020.06.02
[✔️]2020.06.04
[✔️]2020.06.18
[✔️]2020.07.02
[✔️]2020.07.22
[✔️]2020.09.24
[✔️]2020.11.05
[✔️]2020.11.19
[✔️]2021.04.13
[✔️]2021.04.26
*/
// 解法1：使用优先队列，小顶堆min-heap，堆的元素个数都为k个，然后对新进来的值进行判断操作。时间复杂度：O(log2^k)
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

// 解法2：使用一个数组，对前k项从大到小的排序，并对新add进来的数进行判断是塞进来还是丢弃。时间复杂度：O(N*(k*logk))
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

logs：10
[✔️]2020.05.28
[✔️]2020.05.28
[✔️]2020.06.04
[✔️]2020.06.19
[✔️]2020.07.03
[✔️]2020.07.23
[✔️]2020.09.26
[✔️]2020.11.09
[✔️]2020.12.25
[✔️]2021.04.13
*/
// 暴力破解法 时间复杂度：O(n*k) 空间复杂度：O(n)
var maxSlidingWindow = function (nums, k) {
  if (!nums.length) return [];
  if (k === 1) return nums;
  let result = [];
  let deque = [];
  for (let i = 0; i < nums.length; i++) {
    deque.push(nums[i]);
    if (i + 1 >= k) {
      result.push(Math.max(...deque));
      deque.shift();
    }
  }
  return result;
};

// 使用双端队列 时间复杂度：O(n) 空间复杂度：O(n)
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
    // i+1 > k：保证已经往右移了k+1位了（如果只是等于k的话就不用移除了，刚刚好）
    // deque[deque.length - 1] <= i - k：因为右边维护的最大值，如果最大值出界了就踢掉
    if (i + 1 > k && deque[deque.length - 1] <= i - k) deque.pop();
    // 最大值永远是【右边】的值，对于进来的新值进行判断
    while (deque.length && nums[i] >= nums[deque[0]]) {
      deque.shift();
    }
    deque.unshift(i);
    // 保证往右移动了k位，将队列右侧最大值放入结果
    if (i + 1 >= k) {
      result.push(nums[deque[deque.length - 1]]);
    }
  }

  return result;
};

// 动态规划

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

  logs：15
  [✔️]2020.04.19
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.07
  [✔️]2020.06.02
  [✔️]2020.09.22
  [✔️]2020.09.26
  [✔️]2020.12.22
  [✔️]2020.12.28
  [✔️]2021.01.09
  [✔️]2021.01.23
  [✔️]2021.03.02
  [✔️]2021.04.10
  [✔️]2021.04.13
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
  return reverse(head, null);
  function reverse(curr, prev) {
    if (curr == null) return prev;
    let next = curr.next;
    curr.next = prev;
    return reverse(next, curr);
  }
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

  logs：8
  [✔️]2020.04.20
  [✔️]2020.06.08
  [✔️]2020.06.19
  [✔️]2020.06.29
  [✔️]2020.07.10
  [✔️]2020.07.23
  [✔️]2020.10.09
  [✔️]2020.11.16
*/

// 迭代：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(1)。
// 这个图解好：https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/bi-jiao-zhi-jie-gao-xiao-de-zuo-fa-han-tu-jie-by-w/
var swapPairs = function (head) {
  let prev = new ListNode(null);
  prev.next = head;
  let temp = prev;
  while (temp.next && temp.next.next) {
    let start = temp.next;
    let end = temp.next.next;
    temp.next = end;
    start.next = end.next;
    end.next = start;
    temp = start;
  }
  return prev.next;
};

// 递归：时间复杂度：O(N)，其中 N 指的是链表的节点数量。空间复杂度：O(N)，递归过程使用的堆栈空间。
var swapPairs = function (head) {
  if (!head || !head.next) return head;
  let temp = head.next;
  head.next = swapPairs(head.next.next); // 假设是ABCDEF,递归将A指向C，C指向E
  temp.next = head; // 再把B指向A、D指向C、F指向E
  return temp;
};

// 使用k个一组翻转链表的解题思路
var swapPairs = function (head, k = 2) {
  let temp = head;
  // 判断下一组反转是否满足条件
  for (let i = 0; i < k; i++) {
    if (temp == null) return head;
    temp = temp.next;
  }
  // 局部反转
  let prev = swapPairs(temp, k);
  for (let i = 0; i < k; i++) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
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

  logs：10
  [✔️]2020.05.25
  [✔️]2020.06.02
  [✔️]2020.06.04
  [✔️]2020.06.08
  [✔️]2020.06.19
  [✔️]2020.06.27
  [✔️]2020.10.26
  [✔️]2020.11.27
  [✔️]2020.12.18
  [✔️]2021.04.13
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
  const prev = new ListNode(null);
  let temp = prev; // 复制的是prev这个对象，所以两者的next指针是一致的
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      temp.next = l1;
      l1 = l1.next;
    } else {
      temp.next = l2;
      l2 = l2.next;
    }
    temp = temp.next;
  }
  // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
  temp.next = l1 == null ? l2 : l1;
  return prev.next;
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

  logs：11
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.04.30
  [✔️]2020.05.06
  [✔️]2020.06.08
  [✔️]2020.06.19
  [✔️]2020.09.18
  [✔️]2020.09.24
  [✔️]2020.12.18
  [✔️]2021.01.11
  [✔️]2021.04.10
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

  logs：12
  [✔️]2020.04.20
  [✔️]2020.04.29
  [✔️]2020.06.08
  [✔️]2020.06.22
  [✔️]2020.07.10
  [✔️]2020.07.24
  [✔️]2020.09.17
  [✔️]2020.10.09
  [✔️]2020.12.22
  [✔️]2021.01.12
  [✔️]2021.04.10
  [✔️]2021.04.13
*/
// 快慢指针。时间复杂度O(n) 空间复杂度O(1)
var detectCycle = function (head) {
  let isCycle = false;
  let slow = (fast = head);
  // 是否存在环
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      isCycle = true;
      break;
    }
  }
  if (!isCycle) return null;
  // 存在环，把一个节点重置到首节点，然后只走一步，相等节点即所求
  slow = head;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};

// 迭代。给每个经过的元素添加flag标识。时间复杂度：O(n)，空间复杂度O(1)
// （改变了链表结构，不符合题目要求）
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

// Set。时间复杂度：O(n)，空间复杂度O(n)
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

logs：11
[✔️]2020.05.25
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.23
[✔️]2020.07.15
[✔️]2020.07.24
[✔️]2020.09.28
[✔️]2020.11.23
[✔️]2020.12.28
[✔️]2021.04.13
*/
// 快慢指针 不需要额外的哑结点 时间复杂度O(n)
var removeNthFromEnd = function (head, n) {
  let slow = (fast = head);
  while (n != 0) {
    fast = fast.next;
    n--;
  }
  if (fast == null) return head.next; // The head need to be removed, do it.
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};

// 快慢指针 使用哑结点 时间复杂度O(n)
var removeNthFromEnd = function (head, n) {
  let prev = new ListNode(null);
  prev.next = head;
  let slow = (fast = prev);
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
  return prev.next;
};

// 两次遍历 时间复杂度O(n)
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

logs：10
[✔️]2020.05.25
[✔️]2020.06.08
[✔️]2020.06.09
[✔️]2020.06.24
[✔️]2020.07.15
[✔️]2020.07.24
[✔️]2020.10.12
[✔️]2020.11.12
[✔️]2020.12.22
[✔️]2021.04.13
*/
// 双指针。时间复杂度O(n)、空间复杂度O(1)
// 用两个指针 slow 与 fast 一起遍历链表。slow 一次走一步，fast 一次走两步。那么当 fast 到达链表的末尾时，slow 必然位于中间。
var middleNode = function (head) {
  let slow = (fast = head);
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

// 使用数组。时间复杂度：O(n)、空间复杂度O(n)
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

// 单指针。时间复杂度：O(n)、空间复杂度O(1)
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

logs：10
[✔️]2020.06.03
[✔️]2020.06.09
[✔️]2020.06.24
[✔️]2020.06.30
[✔️]2020.07.16
[✔️]2020.07.28
[✔️]2020.11.02
[✔️]2020.12.10
[✔️]2021.04.14
[✔️]2021.04.16
*/
// 递归 不使用额外节点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head [1,2,3,4,5]
 * @param {number} k 2
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let temp = head;
  // 判断下一组反转是否满足条件
  for (let i = 0; i < k; i++) {
    if (temp == null) return head;
    temp = temp.next;
  }
  // 局部反转
  let prev = reverseKGroup(temp, k);
  for (let i = 0; i < k; i++) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};

// 递归 使用额外节点
var reverseKGroup = function (head, k) {
  // 判断下一组反转是否满足条件
  let temp = head;
  for (let i = 0; i < k; i++) {
    if (temp == null) return head;
    temp = temp.next;
  }

  // 局部反转
  let prev = new ListNode(null);
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

logs：10
[✔️]2020.05.12
[✔️]2020.06.10
[✔️]2020.06.29
[✔️]2020.06.30
[✔️]2020.07.07
[✔️]2020.07.27
[✔️]2020.10.24
[✔️]2020.11.02
[✔️]2021.01.08
[✔️]2021.04.14
*/

// 解法1：sort排序，对两个单词进行排序，如果排完序以后全等，那么则为true。时间复杂度：用快排O(n*log(n))
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
  return s.split('').sort().join('') === t.split('').sort().join('');
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
你可以假设每种输入只会对应【一个答案】。但是，数组中同一个元素不能使用两遍。

示例：
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

logs：10
[✔️]2020.05.07
[✔️]2020.05.22
[✔️]2020.05.29
[✔️]2020.06.10
[✔️]2020.07.07
[✔️]2020.07.28
[✔️]2020.10.14
[✔️]2020.11.30
[✔️]2020.12.29
[✔️]2021.04.14
*/

// 解法1：暴力破解法。使用两个for循环，如果相加等于target值则return，时间复杂度为O(n^2)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (nums == null || nums.length < 2) return [];

  for (let i = 0; i < nums.length - 1; i++) {
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
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

logs：11
[✔️]2020.05.21
[✔️]2020.05.29
[✔️]2020.06.01
[✔️]2020.06.10
[✔️]2020.07.08
[✔️]2020.07.29
[✔️]2020.10.24
[✔️]2020.12.05
[✔️]2020.12.29
[✔️]2021.04.09
[✔️]2021.04.14
*/
// 排序+双指针。时间复杂度O(n^2)、空间复杂度O(n)
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

// 暴力求解（会超时），三个for循环。时间复杂度：O(n^3)
var threeSum = function (nums) {
  if (nums == null || nums.length < 3) return [];

  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          let value = [nums[i], nums[j], nums[k]].sort();
          let key = value.join(',');
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

// loops+set，由于c = -(a+b)时满足条件，所以将a、b双层循环一下并将其放到set中。时间复杂度O(n^2)、空间复杂度O(n)
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

logs：10
[✔️]2020.05.22
[✔️]2020.06.11
[✔️]2020.08.05
[✔️]2020.08.25
[✔️]2020.09.09
[✔️]2020.09.16
[✔️]2020.11.09
[✔️]2020.12.05
[✔️]2020.12.30
[✔️]2021.04.14
*/
// 暴力求解。时间复杂度O(n^4)
// 排序+双指针。时间复杂度O(n^3)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (!nums || nums.length < 4) return [];
  let result = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i++) {
    // if (nums[i] > 0) break 这里不加这个剪枝是因为题目并没有跟前面一样说target是0
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1;
      let r = nums.length - 1;
      while (l < r) {
        let sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[l], nums[r]]);
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

// 使用set。空间换时间，时间复杂度O(n^3)、空间复杂度O(n)
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
              target - nums[i] - nums[j] - nums[k]
            ].sort();
            let key = value.join(',');
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

logs：8
[✔️]2020.05.13
[✔️]2020.05.14
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.13
[✔️]2020.07.30
[✔️]2020.10.23
[✔️]2021.01.04
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
      if (node == null) return node;
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
    let temp = node;
    while (temp && temp.left) {
      temp = temp.left;
    }
    return temp;
  }

  // max：返回树中最大的值/键。
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let temp = node;
    while (temp && temp.right) {
      temp = temp.right;
    }
    return temp;
  }

  // search：在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回false。
  search(key) {
    return helper(this.root, key);

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
tree.inOrderTraverse(value => console.log(value));

//
// -------divider-------
//

/*
【二叉树的中序遍历】
https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
给定一个二叉树的根节点 root ，返回它的 中序 遍历。

输入：root = [1,null,2,3]
输出：[1,3,2]

输入：root = []
输出：[]

logs：05
[✔️]2021.01.18
[✔️]2021.02.02
[✔️]2021.02.20
[✔️]2021.03.17
[✔️]2021.04.16
*/

// 递归 时间复杂度O(n) 空间复杂度O(n)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let result = [];
  helper(root);
  return result;
  function helper(node) {
    if (node === null) return;
    helper(node.left);
    result.push(node.val);
    helper(node.right);
  }
};

// 迭代 时间复杂度O(n) 空间复杂度O(n)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    let node = stack.pop();
    result.push(node.val);
    root = node.right;
  }
  return result;
};

//
// -------divider-------
//

/*
【N叉树的后序遍历】
https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/
给定一个 N 叉树，返回其节点值的后序遍历。

logs：03
[✔️]2021.01.18
[✔️]2021.02.03
[✔️]2021.04.16
*/

// 递归
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  let result = [];
  helper(root);
  return result;
  function helper(root) {
    if (!root) return null;
    for (let i = 0; i < root.children.length; i++) {
      helper(root.children[i]);
    }
    result.push(root.val);
  }
};

// 迭代 BFS 时间复杂度 O(n)
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  if (!root || root.length === 0) return [];
  const result = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val);
    for (let i = 0; i < node.children.length; i++) {
      stack.push(node.children[i]);
    }
  }
  return result;
};

//
// -------divider-------
//

/*
【N叉树的层序遍历】
https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/
给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。

输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]

logs：03
[✔️]2021.01.19
[✔️]2021.02.04
[✔️]2021.04.16
*/

// 迭代 BFS 时间复杂度O(n) 空间复杂度O(n)
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root == null || root.length == 0) return [];
  let result = [];
  let stack = [root];
  while (stack.length) {
    let temp = [];
    for (let i = 0, len = stack.length; i < len; i++) {
      let node = stack.shift();
      temp.push(node.val);
      for (let j = 0; j < node.children.length; j++) {
        stack.push(node.children[j]);
      }
    }
    result.push(temp);
  }
  return result;
};

// 递归 DFS 时间复杂度O(n) 空间复杂度O(n)
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root == null || root.length == 0) return [];
  let result = [];
  dfs(root, 0);
  return result;
  function dfs(node, level) {
    if (node == null) return;
    if (result.length < level + 1) result.push([]);
    result[level].push(node.val);
    for (let i = 0; i < node.children.length; i++) {
      dfs(node.children[i], level + 1);
    }
  }
};

//
// -------divider-------
//

/* 
【验证二叉搜索树】BinarySearchTree
https://leetcode-cn.com/problems/validate-binary-search-tree/
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

一个二叉搜索树具有如下特征：
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

logs：9
[✔️]2020.05.24
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.13
[✔️]2020.08.03
[✔️]2020.10.22
[✔️]2020.12.15
[✔️]2020.12.30
*/

// 使用一个中序遍历，判断中序遍历后的数组是否为升序。时间复杂度：O(n)
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
  return helper(root);

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
};

// 使用递归。时间复杂度：O(n)
// 因为是二叉搜索树，左子树都要比root小，右子树都要比root大。
// 所以递归左子树，找到它的最小值与root判断；同理递归右子树找到它的最大值并与root判断。
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
  return helper(root, -Infinity, Infinity);

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

logs：8
[✔️]2020.05.24
[✔️]2020.05.25
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.07.14
[✔️]2020.07.31
[✔️]2020.10.22
[✔️]2020.12.10
*/

// 递归。时间复杂度O(n)
// 从根节点开始遍历树
// 如果节点 p 和节点 q 都在右子树上，那么以右孩子为根节点继续操作
// 如果节点 p 和节点 q 都在左子树上，那么以左孩子为根节点继续操作
// 如果上述条件都不成立，这就意味着我们已经找到节点 p 和节点 q 的 LCA 了
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

// 迭代。跟使用递归的思路是一样的，写法不同而已。时间复杂度O(n)
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

logs：9
[✔️]2020.05.25
[✔️]2020.05.27
[✔️]2020.06.12
[✔️]2020.06.29
[✔️]2020.07.14
[✔️]2020.08.01
[✔️]2020.10.23
[✔️]2021.01.08
[✔️]2021.04.16
*/
// 递归 时间复杂度O(n)。
// 在当前节点的左子树和右子树中递归找p和q，如果存在那么就是【公共祖先】了；继续重复递归就可以找到【最近公共祖先】。
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

/*
【对称二叉树】
https://leetcode-cn.com/problems/symmetric-tree/
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
    1
   / \
  2   2
 / \ / \
3  4 4  3

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
    1
   / \
  2   2
   \   \
   3    3

logs：10
[✔️]2020.08.28
[✔️]2020.09.08
[✔️]2020.09.10
[✔️]2020.09.14
[✔️]2020.09.15
[✔️]2020.09.24
[✔️]2020.10.23
[✔️]2020.11.19
[✔️]2021.04.16
[✔️]2021.04.19
*/

// dfs。时间复杂度O(n)、空间复杂度O(n)
var isSymmetric = function (root) {
  return dfs(root, root);

  function dfs(p, q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    return p.val === q.val && dfs(p.left, q.right) && dfs(p.right, q.left);
  }
};

//
// -------divider-------
//

/*
【翻转二叉树】
https://leetcode-cn.com/problems/invert-binary-tree/
翻转一棵二叉树。示例：

输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9

输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1

logs：04
[✔️]2021.01.24
[✔️]2021.02.04
[✔️]2021.04.09
[✔️]2021.04.19
*/

// 递归 时间复杂度O(n)
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

//
// -------divider-------
//

/* -------------------------- 递归、分治、回溯 ---------------------------*/

/* 
Tips：
  （1）对于递归代码，这种试图想清楚整个递和归过程的做法，实际上是进入了一个思维误区。很多时候，我们理解起来比较吃力，主要原因就是自己给自己制造了这种理解障碍。那正确的思维方式应该是怎样的呢？
  （2）如果一个问题 A 可以分解为若干子问题 B、C、D，你可以假设子问题 B、C、D 已经解决，在此基础上思考如何解决问题 A。而且，你只需要思考问题 A 与子问题 B、C、D 两层之间的关系即可，不需要一层一层往下思考子问题与子子问题，子子问题与子子子问题之间的关系。屏蔽掉递归细节，这样子理解起来就简单多了。
  （3）因此，编写递归代码的关键是，只要遇到递归，我们就把它抽象成一个递推公式，不用想一层层的调用关系，不要试图用人脑去分解递归的每个步骤。
  （4）分治算法一般都是用递归来实现的。分治是一种解决问题的处理思想，递归是一种编程技巧。
  （5）分治是将大问题拆解为子问题后处理，然后将子结果合并为结果。回溯是列举所有的可能，错了就回退上一步或上几步，最后将正确的结果返回。

// 递归模板
function recursion(level, param) {
  // terminator
  if (level > MAX_LEVEL) {
    // process result
    return;
  }

  // process current logic
  process(level, param);

  // drill down
  recursion(level + 1, newParam);

  // restore current status
}

// 分治模板
function divideConquer(problem, param1, param2) {
  // terminator
  if (problem === null) {
    // print_result
    return;
  }

  // prepare data
  data = prepareData(problem);
  subProblems = split_problem(problem, data);

  // conquer subProblems
  subResult1 = self.divideConquer(subProblems[0],p1,...)
  subResult2 = self.divideConquer(subProblems[1],p1,...)
  subResult3 = self.divideConquer(subProblems[2],p1,...)

  // process and generate the final result
  result = process_result(subResult1,subResult2,subResult3)

  // revert the current level states
}
*/

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

logs：6
[✔️]2020.06.12
[✔️]2020.06.28
[✔️]2020.07.14
[✔️]2020.10.14
[✔️]2020.12.14
[✔️]2021.01.06
*/

// 暴力破解法，傻乘，如求2的10次方，就循环10次。时间复杂度O(n)
// 分治+递归，时间复杂度O(logn)
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
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于【n/2】的元素。
你可以假设数组是非空的，并且给定的数组【总是存在】多数元素。

示例 1:
输入: [3,2,3]
输出: 3

示例 2:
输入: [2,2,1,1,1,2,2]
输出: 2

logs：10
[✔️]2020.05.29
[✔️]2020.06.12
[✔️]2020.07.14
[✔️]2020.07.15
[✔️]2020.07.16
[✔️]2020.08.01
[✔️]2020.11.26
[✔️]2020.12.09
[✔️]2020.12.23
[✔️]2020.04.17
*/

// 解法1：暴力破解。即枚举数组中的每个元素，再遍历一遍数组统计其出现次数。时间复杂度为O(N^2)
// 解法2：哈希表。我们使用哈希来存储每个元素以及出现的次数。对于哈希映射中的每个键值对，键表示一个元素，值表示该元素出现的次数。时间复杂度O(n)、空间复杂度O(n)
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

// 解法3：排序。如果将数组 nums 中的所有元素按照单调递增或单调递减的顺序排序，那么下标为[n/2]的元素（下标从 0 开始）一定是众数。时间复杂度O(nlogn)。
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

/*
【括号生成】
https://leetcode-cn.com/problems/generate-parentheses/
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。
示例：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

logs：10
[✔️]2020.06.16
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
[✔️]2020.07.17
[✔️]2020.08.04
[✔️]2021.01.07
[✔️]2021.01.24
[✔️]2021.01.28
[✔️]2021.04.17
*/

// 递归、DFS 时间复杂度 O(2^n)
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  dfs('', 0, 0);
  return res;

  function dfs(s, left, right) {
    if (left == n && right == n) return res.push(s);
    // 左括号只要保证小于n就行
    if (left < n) dfs(`${s}(`, left + 1, right);
    // 右括号必须比左括号个数小
    // "(())()" -- 这种情况就是需要保证right<left
    if (right < left) dfs(`${s})`, left, right + 1);
  }
};

//
// -------divider-------
//

/*
【子集】
https://leetcode-cn.com/problems/subsets/
给你一个整数数组 nums，数组中的元素【互不相同】。返回该数组所有可能的子集（幂集）。
解集【不能】包含重复的子集。你可以按【任意顺序】返回解集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：
输入：nums = [0]
输出：[[],[0]]

logs：04
[✔️]2021.01.25
[✔️]2021.03.04
[✔️]2021.03.19
[✔️]2021.04.17
*/
// 全排列+DFS+回溯。
// input: [1,2,3]
// output: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
var subsets = function (nums) {
  if (!nums || !nums.length) return [];
  let result = [];
  dfs([], 0);
  return result;

  function dfs(list, index) {
    result.push(list.slice());
    for (let i = index; i < nums.length; i++) {
      list.push(nums[i]);
      dfs(list, i + 1);
      list.pop();
    }
  }
};

// DFS+回溯。时间复杂度O(2^n)、空间复杂度O(n)
// 每个值有可选和可不选两种可能，类似于一棵树。
// https://leetcode-cn.com/problems/subsets/solution/shou-hua-tu-jie-zi-ji-hui-su-fa-xiang-jie-wei-yun-/
// 输入：[1,2,3]
// 输出：[[],[3],[2],[2,3],[1],[1,3],[1,2],[1,2,3]]
var subsets = function (nums) {
  if (!nums || !nums.length) return [];
  let result = [];
  dfs([], 0);
  return result;

  function dfs(list, index) {
    if (index === nums.length) {
      result.push(list.slice());
      return;
    }
    // 不选择这个数
    dfs(list, index + 1);
    // 选择并保存这个数
    list.push(nums[index]);
    // 继续考察下一个数
    dfs(list, index + 1);
    // 因为list是个堆变量，所以本层递归结束后要去掉最后一个值
    list.pop();
  }
};

// 迭代。时间复杂度O(n)、 空间复杂度O(n)
// 重复将新的元素加入到上一个结果集中的每个子集当中去，形成n个新的子集，再全部加入到结果集中去。
// nums：[1,2,3]
// i = 0
// sub = [1]
// res = [ [],[1] ]
// ---
// i = 1
// sub = [2],[1,2]
// res = [ [],[1],[2],[1,2] ]
// ---
// i = 2
// sub = [3],[1,3],[2,3],[1,2,3]
// res = [ [],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3] ]
var subsets = function (nums) {
  let res = [[]];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0, len = res.length; j < len; j++) {
      let sub = res[j].slice();
      sub.push(nums[i]);
      res.push(sub);
    }
  }
  return res;
};

//
// -------divider-------
//

/*
【子集 II】
https://leetcode-cn.com/problems/subsets-ii/
给定一个可能包含【重复元素】的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。
示例:
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]

logs：03
[✔️]2021.02.05
[✔️]2021.03.04
[✔️]2021.04.17
*/
// 全排列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  if (!nums || !nums.length) return [];
  nums.sort((a, b) => a - b);
  let result = [];
  dfs([], 0);
  return result;

  function dfs(list, index) {
    result.push(list.slice());
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue;
      list.push(nums[i]);
      dfs(list, i + 1);
      list.pop();
    }
  }
};

//
// -------divider-------
//

/*
【全排列】
https://leetcode-cn.com/problems/permutations/
给定一个【没有重复】数字的序列，返回其所有可能的全排列。示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

logs：03
[✔️]2021.02.04
[✔️]2021.03.05
[✔️]2021.03.19
*/
// DFS+回溯+全排列。时间复杂度O(2^n)、空间复杂度O(n)
var permute = function (nums) {
  if (!nums || !nums.length) return [];
  let result = [];
  dfs([]);
  return result;

  function dfs(list) {
    if (list.length === nums.length) {
      result.push(list.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (list.includes(nums[i])) continue;
      list.push(nums[i]);
      dfs(list);
      list.pop();
    }
  }
};

//
// -------divider-------
//

/*
【全排列 II】
https://leetcode-cn.com/problems/permutations-ii/
给定一个可包含重复数字的序列nums，按任意顺序返回所有不重复的全排列。

示例 1：
输入：nums = [1,1,2]
输出：[[1,1,2], [1,2,1], [2,1,1]]

示例 2：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

logs：02
[✔️]2021.02.04
[✔️]2021.04.17
*/
// DFS+回溯。时间复杂度O(2^n)、空间复杂度O(n)
var permuteUnique = function (nums) {
  if (!nums || !nums.length) return [];
  nums.sort((a, b) => a - b);
  let result = [];
  dfs([], []);
  return result;

  function dfs(list, used) {
    if (list.length === nums.length) {
      result.push(list.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 当前数在所在重复数集合中是「从左往右第一个未被填过的数字」
      if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
        continue;
      }
      used[i] = true;
      list.push(nums[i]);
      dfs(list, used);
      used[i] = false;
      list.pop();
    }
  }
};

//
// -------divider-------
//

/*
【组合】
https://leetcode-cn.com/problems/combinations/

给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
示例:

输入: n = 4, k = 2
输出:
[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

logs：04
[✔️]2021.01.25
[✔️]2021.02.18
[✔️]2021.03.05
[✔️]2021.04.17
*/
// DFS+回溯。时间复杂度O(2^n)、空间复杂度O(n)
var combine = function (n, k) {
  const result = [];
  dfs([], 1); // 从1开始算
  return result;

  function dfs(list, index) {
    // 记录合法的答案
    if (list.length === k) {
      result.push(list.slice());
      return;
    }
    for (let i = index; i <= n; i++) {
      list.push(i);
      dfs(list, i + 1);
      list.pop();
    }
  }
};

// DFS+回溯。时间复杂度O(2^n)、空间复杂度O(n)
// 输入：4 2
// 输出：[[3,4],[2,4],[2,3],[1,4],[1,3],[1,2]]
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  dfs(1, []);
  return result;

  function dfs(index, list) {
    // list长度加上剩余区间[index, n]的长度小于k
    if (list.length + (n - index + 1) < k) {
      return;
    }
    // 记录合法的答案
    if (list.length == k) {
      result.push(list.slice());
      return;
    }
    list.push(index); // 选择这个数
    dfs(index + 1, list); // 基于该选择，继续往下递归，考察下一个数
    list.pop(); // 上面的递归结束，撤销该选择，不选这个数
    dfs(index + 1, list); // 不选这个数，继续往下递归，考察下一个数
  }
};

//
// -------divider-------
//

/*
【组合总和】
https://leetcode-cn.com/problems/combination-sum/
给定一个【无重复元素】的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
【candidates 中的数字可以无限制重复被选取。】

说明：
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 

示例 1：
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]

示例 2：
输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]

logs：02
[✔️]2021.02.05
[✔️]2021.04.17
*/
// 递归、全排列
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  if (!candidates || !candidates.length) return [];
  let result = [];
  dfs([], target, 0);
  return result;

  function dfs(list, remain, index) {
    if (remain < 0) return;
    if (remain === 0) {
      result.push(list.slice());
      return;
    }
    for (let i = index; i < candidates.length; i++) {
      list.push(candidates[i]);
      dfs(list, remain - candidates[i], i); // 这里传给下层的索引index没有+1：因为candidates中的数字可以无限制重复被选取。
      list.pop();
    }
  }
};

//
// -------divider-------
//

/*
【组合总和 II】
https://leetcode-cn.com/problems/combination-sum-ii/
给定一个【有重复元素】数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
【candidates 中的每个数字在每个组合中只能使用一次。】

说明：
所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 

示例 1:
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]

示例 2:
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]

logs：02
[✔️]2021.02.18
[✔️]2021.04.17
*/
// DFS+回溯。时间复杂度O(2^n)、空间复杂度O(n)
var combinationSum2 = function (candidates, target) {
  if (!candidates || !candidates.length) return [];
  candidates.sort((a, b) => a - b); // 考虑重复元素一定要优先排序，将重复的都放在一起，便于找到重复元素和剪枝。
  let result = [];
  dfs([], target, 0);
  return result;

  function dfs(list, remain, index) {
    if (remain < 0) return;
    if (remain === 0) {
      result.push(list.slice());
      return;
    }
    for (let i = index; i < candidates.length; i++) {
      if (i > index && candidates[i] === candidates[i - 1]) continue; // 对重复元素进行过滤，保证解集不能包含重复的组合
      list.push(candidates[i]);
      dfs(list, remain - candidates[i], i + 1); // i+1：因为candidates中的每个数字在每个组合中只能使用一次
      list.pop();
    }
  }
};

/*
【电话号码的字母组合】
https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按【任意顺序】返回。
给出数字到字母的映射如下（与电话按键相同）。

注意 1 不对应任何字母。

示例 1：
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

示例 2：
输入：digits = ""
输出：[]

示例 3：
输入：digits = "2"
输出：["a","b","c"]

logs：01
[✔️]2021.02.18
*/
// DFS+回溯。
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  const result = [];
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  };
  dfs('', 0);
  return result;

  function dfs(s, index) {
    if (index === digits.length) {
      result.push(s);
      return;
    }
    const letters = map[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      dfs(s + letters[i], index + 1);
    }
  }
};

// 排列组合

//
// -------divider-------
//

/* -------------------------- 图、DFS、BFS ---------------------------*/
/*
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
const myVertices = ['A', 'B', 'C', 'D', 'E'];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
console.log(graph.adjList);

// DFS写法模板
visited = new Set();
function dfs(node, visited) {
  visited.add(node);
  // process current node here
  for (next_node in node.children()) {
    if (!visited.has(next_node)) dfs(next_node, visited);
  }
}

// BFS写法模板
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
*/

//
// -------divider-------
//

/*
【二叉树的层序遍历】
https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
给你一个二叉树，请你返回其按层序遍历得到的节点值。（即逐层地，从左到右访问所有节点）。

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

logs：10
[✔️]2020.06.15
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
[✔️]2020.07.16
[✔️]2020.08.01
[✔️]2020.11.26
[✔️]2020.12.10
[✔️]2020.12.25
[✔️]2021.03.12
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

logs：10
[✔️]2020.06.15
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
[✔️]2020.07.16
[✔️]2020.08.03
[✔️]2020.12.05
[✔️]2020.12.10
[✔️]2020.12.25
[✔️]2021.03.12
*/

// DFS、递归。时间复杂度O(n)
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

logs：10
[✔️]2020.06.16
[✔️]2020.06.20
[✔️]2020.06.22
[✔️]2020.06.29
[✔️]2020.07.16
[✔️]2020.08.03
[✔️]2020.12.05
[✔️]2020.12.10
[✔️]2020.12.25
[✔️]2020.03.12
*/

// DFS。时间复杂度O(n)
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
【二叉树的序列化与反序列化】
https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/

图略

示例 1：
输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

logs：02
[✔️]2021.01.25
[✔️]2021.03.17
*/

// DFS(深度优先搜索)。时间复杂度O(n)、空间复杂度O(n)
// 先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const result = [];
  dfs(root);
  return result.join(',');

  function dfs(root) {
    // join方法会直接忽略null，所以用x来做替身
    if (root == null) return result.push('x');
    result.push(root.val);
    dfs(root.left);
    dfs(root.right);
  }
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  data = data.split(',');
  return buildTree(data);

  function buildTree() {
    const value = data.shift();
    if (value == 'x') return null;
    const root = new TreeNode(value);
    root.left = buildTree();
    root.right = buildTree();
    return root;
  }
};

//
// -------divider-------
//

/*
【在每个树行中找最大值】
https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
您需要在二叉树的每一行中找到最大的值。示例：

输入: 
          1
         / \
        3   2
       / \   \  
      5   3   9 

输出: [1, 3, 9]

logs：06
[✔️]2021.02.01
[✔️]2021.02.02
[✔️]2021.02.17
[✔️]2021.02.20
[✔️]2021.03.17
[✔️]2021.04.19
*/
// BFS 时间复杂度O(n)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
  if (!root) return [];
  let queue = [];
  let result = [];
  queue.push(root);

  while (queue.length) {
    let temp = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(Math.max(...temp));
  }
  return result;
};

//
// -------divider-------
//

/*
【岛屿数量】
https://leetcode-cn.com/problems/number-of-islands/
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。

示例 1：
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1

示例 2：
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3

----------------- 岛屿问题核心DFS代码 -----------------
function dfs(grid, r, c) {
  // 判断坐标(r, c)是否在网格中
  if (!(r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)) {
    return;
  }

  // 如果这个格子不是岛屿，直接返回
  if (grid[r][c] != '1') {
    return;
  }

  // 将格子标记为「已遍历过」
  grid[r][c] = '2';

  // 访问上、下、左、右四个相邻结点
  dfs(grid, r - 1, c);
  dfs(grid, r + 1, c);
  dfs(grid, r, c - 1);
  dfs(grid, r, c + 1);
}
------------------------------------------------------

logs：03
[✔️]2021.02.23
[✔️]2021.02.24
[✔️]2021.04.19
*/
// DFS+递归。时间复杂度：O(MN)、空间复杂度：O(MN)
// https://leetcode-cn.com/problems/number-of-islands/solution/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == '1') {
        count++;
        dfs(grid, i, j);
      }
    }
  }
  return count;

  function dfs(grid, r, c) {
    // 判断坐标(r, c)是否在网格中
    if (!(r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)) {
      return;
    }
    // 如果这个格子不是岛屿，直接返回
    if (grid[r][c] != '1') {
      return;
    }
    // 将格子标记为「已遍历过」
    grid[r][c] = '2';
    // 访问上、下、左、右四个相邻结点
    dfs(grid, r - 1, c);
    dfs(grid, r + 1, c);
    dfs(grid, r, c - 1);
    dfs(grid, r, c + 1);
  }
};

//
// -------divider-------
//

/*
【岛屿的最大面积】
https://leetcode-cn.com/problems/max-area-of-island/

给定一个包含了一些 0 和 1 的非空二维数组 grid 。
一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

示例 1:
[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。

示例 2:
[[0,0,0,0,0,0,0,0]]
对于上面这个给定的矩阵, 返回 0。

logs：03
[✔️]2021.02.23
[✔️]2021.02.24
[✔️]2021.04.19
*/
// DFS。时间复杂度：O(MN)、空间复杂度：O(MN)
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        let area = dfs(grid, i, j);
        result = Math.max(result, area);
      }
    }
  }
  return result;

  function dfs(grid, r, c) {
    // 判断坐标(r, c)是否在网格中
    if (!(r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)) {
      return 0;
    }
    // 如果这个格子不是岛屿，直接返回
    if (grid[r][c] !== 1) {
      return 0;
    }
    // 将格子标记为「已遍历过」
    grid[r][c] = 2;
    // 访问上、下、左、右四个相邻结点
    return (
      1 +
      dfs(grid, r - 1, c) +
      dfs(grid, r + 1, c) +
      dfs(grid, r, c - 1) +
      dfs(grid, r, c + 1)
    );
  }
};

//
// -------divider-------
//

/*
【最大人工岛】
https://leetcode-cn.com/problems/making-a-large-island/

在二维地图上， 0代表海洋， 1代表陆地，我们最多只能将一格 0 海洋变成 1变成陆地。
进行填海之后，地图上最大的岛屿面积是多少？（上、下、左、右四个方向相连的 1 可形成岛屿）

示例 1:
输入: [[1, 0], [0, 1]]
输出: 3
解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。

示例 2:
输入: [[1, 1], [1, 0]]
输出: 4
解释: 将一格0变成1，岛屿的面积扩大为 4。

示例 3:
输入: [[1, 1], [1, 1]]
输出: 4
解释: 没有0可以让我们变成1，面积依然为 4。

*/
// 第一遍 DFS 遍历陆地格子，计算每个岛屿的面积并标记岛屿；第二遍 DFS 遍历海洋格子，观察每个海洋格子相邻的陆地格子。

//
// -------divider-------
//

/*
【扫雷游戏】
https://leetcode-cn.com/problems/minesweeper/description/
让我们一起来玩扫雷游戏！

给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，'X' 则表示一个已挖出的地雷。
现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：

如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
如果在此次点击中，若无更多方块可被揭露，则返回面板。
 
示例 1：
输入: 
[['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'M', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E']]

Click : [3,0]

输出: 
[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]
*/

//
// -------divider-------
//

/*
【单词接龙】
https://leetcode-cn.com/problems/word-ladder/

字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：

序列中第一个单词是 beginWord 。
序列中最后一个单词是 endWord 。
每次转换只能改变一个字母。
转换过程中的中间单词必须是字典 wordList 中的单词。
给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的【最短转换序列】中的单词数目。如果不存在这样的转换序列，返回 0。

示例 1：
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。

示例 2：
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：0
解释：endWord "cog" 不在字典中，所以无法进行转换。

logs：3
[✔️]2021.02.22
[✔️]2021.02.23
[✔️]2021.03.01
*/
// BFS。时间复杂度：O(n*c)
// https://leetcode-cn.com/problems/word-ladder/solution/shou-hua-tu-jie-127-dan-ci-jie-long-bfsde-dian-x-2/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  let wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  let queue = [];
  queue.push([beginWord, 1]);

  while (queue.length) {
    for (let i = 0, len = queue.length; i < len; i++) {
      let [word, level] = queue.shift();
      if (word == endWord) return level;

      for (let j = 0; j < word.length; j++) {
        // 26个字母
        for (let k = 97; k <= 122; k++) {
          // 组合新词
          let s = word.slice(0, j) + String.fromCharCode(k) + word.slice(j + 1);
          // wordSet里有
          if (wordSet.has(s)) {
            queue.push([s, level + 1]); // 作为下一层的词入列
            wordSet.delete(s); // 避免该词重复入列
          }
        }
      }
    }
  }
  return 0;
};

//
// -------divider-------
//

/*
【单词接龙II】
https://leetcode-cn.com/problems/word-ladder-ii/description/
给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出【所有】从 beginWord 到 endWord 的最短转换序列。转换需遵循如下规则：
每次转换只能改变一个字母。
转换后得到的单词必须是字典中的单词。

说明:
如果不存在这样的转换序列，返回一个空列表。
所有单词具有相同的长度。
所有单词只由小写字母组成。
字典中不存在重复的单词。
你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

示例 1:
输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]
输出:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]

示例 2:
输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
输出: []

解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。
*/

//
// -------divider-------
//

/*
【最小基因变化】
https://leetcode-cn.com/problems/minimum-genetic-mutation/
一条基因序列由一个带有8个字符的字符串表示，其中每个字符都属于 "A", "C", "G", "T"中的任意一个。
假设我们要调查一个基因序列的变化。一次基因变化意味着这个基因序列中的一个字符发生了变化。
例如，基因序列由"AACCGGTT" 变化至 "AACCGGTA" 即发生了一次基因变化。
与此同时，每一次基因变化的结果，都需要是一个合法的基因串，即该结果属于一个基因库。
现在给定3个参数 — start, end, bank，分别代表起始基因序列，目标基因序列及基因库，请找出能够使起始基因序列变化为目标基因序列所需的最少变化次数。如果无法实现目标变化，请返回 -1。

注意：
起始基因序列默认是合法的，但是它并不一定会出现在基因库中。
如果一个起始基因序列需要多次变化，那么它每一次变化之后的基因序列都必须是合法的。
假定起始基因序列与目标基因序列是不一样的。

示例 1：
start: "AACCGGTT"
end:   "AACCGGTA"
bank: ["AACCGGTA"]
返回值: 1

示例 2：
start: "AACCGGTT"
end:   "AAACGGTA"
bank: ["AACCGGTA", "AACCGCTA", "AAACGGTA"]
返回值: 2

示例 3：
start: "AAAAACCC"
end:   "AACCCCCC"
bank: ["AAAACCCC", "AAACCCCC", "AACCCCCC"]
返回值: 3

logs：02
[✔️]2021.02.22
[✔️]2021.02.23
*/
// BFS
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
  let bankSet = new Set(bank);
  if (!bankSet.has(end)) return -1;

  let queue = [[start, 0]];
  let dna = ['A', 'C', 'G', 'T'];

  while (queue.length) {
    for (let i = 0, length = queue.length; i < length; i++) {
      let [node, count] = queue.shift();
      if (node === end) return count;
      for (let j = 0; j < node.length; j++) {
        for (let k = 0; k < dna.length; k++) {
          let s = node.slice(0, j) + dna[k] + node.slice(j + 1);
          if (bankSet.has(s)) {
            queue.push([s, count + 1]);
            bankSet.delete(s);
          }
        }
      }
    }
  }
  return -1;
};

//
// -------divider-------
//

/* -------------------------- 排序、搜索算法 ---------------------------*/

/*
【冒泡排序】
冒泡排序只会操作相邻的两个数据。
每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求，如果不满足就让它俩互换。
元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。
时间复杂度O(n^2)

logs：10
[✔️]2020.05.22
[✔️]2020.05.25
[✔️]2020.06.06
[✔️]2020.06.15
[✔️]2020.06.30
[✔️]2020.07.07
[✔️]2020.08.06
[✔️]2020.08.21
[✔️]2020.08.28
[✔️]2020.10.12
*/
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 1; j < nums.length; j++) {
      if (nums[j - 1] > nums[j]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
      }
    }
  }
  return nums;
}
const test = bubbleSort([4, 4, 52, 13, 5, 8, 91, 1]);

//
// -------divider-------
//

/*
【选择排序】
选择排序算法是一种原址比较排序算法。
选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
时间复杂度O(n^2)

logs：10
[✔️]2020.05.22
[✔️]2020.05.25
[✔️]2020.06.06
[✔️]2020.06.15
[✔️]2020.06.30
[✔️]2020.08.04
[✔️]2020.08.07
[✔️]2020.09.04
[✔️]2020.09.24
[✔️]2020.11.19
*/
function selectionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let tempMin = i;
    for (let j = i; j < nums.length; j++) {
      if (nums[tempMin] > nums[j]) {
        tempMin = j;
      }
    }
    if (i !== tempMin) {
      [nums[i], nums[tempMin]] = [nums[tempMin], nums[i]];
    }
  }
  return nums;
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

logs：10
[✔️]2020.05.22
[✔️]2020.05.28
[✔️]2020.06.15
[✔️]2020.06.19
[✔️]2020.07.06
[✔️]2020.07.07
[✔️]2020.08.12
[✔️]2020.09.04
[✔️]2020.10.12
[✔️]2020.11.13
*/
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let temp = nums[i];
    let j = i;
    while (j > 0 && temp < nums[j - 1]) {
      nums[j] = nums[j - 1];
      j--;
    }
    if (i != j) nums[j] = temp;
  }
  return nums;
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

logs：9
[✔️]2020.05.22
[✔️]2020.05.26
[✔️]2020.06.15
[✔️]2020.06.22
[✔️]2020.06.23
[✔️]2020.07.06
[✔️]2020.09.14
[✔️]2020.11.10
[✔️]2020.12.25
*/

function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  let middle = Math.floor(nums.length / 2);
  let left = nums.slice(0, middle);
  let right = nums.slice(middle);
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

logs：9
[✔️]2020.05.26
[✔️]2020.06.01
[✔️]2020.06.15
[✔️]2020.06.23
[✔️]2020.07.06
[✔️]2020.07.07
[✔️]2020.09.15
[✔️]2020.09.16
[✔️]2020.11.13
*/
function quickSort(nums) {
  return quick(nums, 0, nums.length - 1);
}

function quick(nums, left, right) {
  if (nums.length <= 1) return nums;
  let index = partition(nums, left, right);
  // 较主元小的值组成的子数组重复划分排序操作
  if (left < index - 1) quick(nums, left, index - 1);
  // 较主元大的值组成的子数组重复划分排序操作
  if (index < right) quick(nums, index, right);
  return nums;
}

function partition(nums, left, right) {
  const pivot = nums[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  // 这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后
  while (i <= j) {
    // 移动左指针直到我们找到一个比主元大的值
    while (nums[i] < pivot) i++;
    // 移动右指针直到找到一个比主元小的值
    while (nums[j] > pivot) j--;
    // 交换它们
    if (i <= j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }
  return i;
}

console.log(quickSort([4, 4, 52, 13, 5, 8, 91, 1]));

//
// -------divider-------
//

/*
【二分搜索】
先排序，然后选择数组的中间值。  
如果选中值是待搜索值，那么算法执行完毕（值找到了）。 
如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）。 
如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。

时间复杂度：O(logn)

二分查找的特点：
  Sorted（单调递增或者递减）
  Bounded（存在上下界）
  Accessible by index（能够通过索引访问）

logs：6
[✔️]2020.05.28
[✔️]2020.06.15
[✔️]2020.06.21
[✔️]2020.06.30
[✔️]2020.07.17
[✔️]2020.08.04
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
查找【第一个】值等于给定值的元素，返回索引

logs：5
[✔️]2020.06.21
[✔️]2020.06.23
[✔️]2020.08.21
[✔️]2020.09.24
[✔️]2020.10.14
*/
function binarySearch1(nums, value) {
  nums.sort((a, b) => a - b);
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (value > nums[mid]) {
      low = mid + 1;
    } else if (value < nums[mid]) {
      high = mid - 1;
    } else {
      // 如果 mid 等于 0，那这个元素已经是数组的第一个元素，那它肯定是我们要找的；
      // 如果 mid 不等于 0，但 nums[mid]的前一个元素 nums[mid-1]不等于 value，那也说明 nums[mid]就是我们要找的第一个值等于给定值的元素。(因为是排好序的，所以会相连)
      if (mid == 0 || nums[mid - 1] != value) return mid;
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
查找【最后一个】值等于给定值的元素，返回索引

logs：5
[✔️]2020.06.22
[✔️]2020.06.28
[✔️]2020.08.24
[✔️]2020.09.28
[✔️]2020.12.14
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
查找第一个大于等于给定值的元素，返回索引

logs：5
[✔️]2020.06.22
[✔️]2020.07.01
[✔️]2020.09.08
[✔️]2020.09.25
[✔️]2021.01.05
*/

function binarySearch3(nums, value) {
  nums.sort((a, b) => a - b);
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value > nums[mid]) {
      low = mid + 1;
    } else {
      // 如果nums[mid]前面已经没有元素，或者前面一个元素小于要查找的值 value，那a[mid]就是我们要找的元素
      if (mid == 0 || nums[mid - 1] < value) return mid;
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
查找最后一个小于等于给定值的元素，返回索引

logs：5
[✔️]2020.06.22
[✔️]2020.06.04
[✔️]2020.09.09
[✔️]2020.12.01
[✔️]2021.01.05
*/

function binarySearch4(nums, value) {
  nums.sort((a, b) => a - b);
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (value >= nums[mid]) {
      if (mid == nums.length - 1 || nums[mid + 1] > value) return mid;
      else low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
const test = binarySearch4([1, 3, 5, 7, 9], 4); // 1
console.log(test);

//
// -------divider-------
//

/*
【x的平方根】
https://leetcode-cn.com/problems/sqrtx/
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

logs：5
[✔️]2020.11.10
[✔️]2020.11.16
[✔️]2020.11.27
[✔️]2020.12.03
[✔️]2021.04.18
*/
// 二分查找
var mySqrt = function (x) {
  if (x == 0 || x == 1) return x;
  let low = 1;
  let high = x;
  let res;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (mid == x / mid) {
      return mid;
    } else if (mid > x / mid) {
      high = mid - 1;
    } else {
      low = mid + 1;
      res = mid;
    }
  }
  return res;
};

//
// -------divider-------
//

/* -------------------------- 字典树 ---------------------------*/
// 运用场景：模糊搜索等
// 核心思想：空间换时间。利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。

/*
【实现 Trie (字典树)】
https://leetcode-cn.com/problems/implement-trie-prefix-tree/
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

logs：0
*/

//
// -------divider-------
//

/*
【单词搜索】
https://leetcode-cn.com/problems/word-search/
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

logs：0
*/

//
// -------divider-------
//

/* -------------------------- 动态规划、贪心算法 ---------------------------*/
/*
贪心算法是一种在每一步选择中都采取当前状态下最好或最优（最有利）的选择，从而希望导致的结果是全局最好或最优的算法。
贪心算法与动态规划的不同在于它对每个子问题的解决方案都做出选择，不能回退。
动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。 

贪心：当下最优选择
动态规划：最优选择+回退
*/

/*
【分发饼干】
https://leetcode-cn.com/problems/assign-cookies/description/
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

 
示例 1:
输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。

示例 2:
输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.

logs：03
[✔️]2021.03.03
[✔️]2021.03.12
[✔️]2021.04.20
*/
// 贪心算法+排序。时间复杂度O(n)
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let count = 0;
  let i = (j = 0);
  while (i < g.length && j < s.length) {
    if (g[i] <= s[j]) {
      // 可以满足胃口，喂给小朋友
      count++;
      i++;
      j++;
    } else {
      // 不满足胃口，查看下一块饼干
      j++;
    }
  }
  return count;
};

//
// -------divider-------
//

/*
【跳跃游戏】
https://leetcode-cn.com/problems/jump-game/
给定一个非负整数数组nums，你最初位于数组的第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。

示例 1：
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

示例 2：
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ，所以永远不可能到达最后一个下标。

logs：02
[✔️]2021.03.03
[✔️]2021.04.20
*/

// 贪心算法。
// 如果某一个作为【起跳点】的格子可以跳跃的距离是 3，那么表示后面 3 个格子都可以作为【起跳点】。
// 可以对每一个能作为【起跳点】的格子都尝试跳一次，把【能跳到最远的距离】不断更新。
// 如果可以一直跳到最后，就成功了。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxRange = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxRange) return false; // 当前位置能不能跳到，不用管nums[i]这个表示能跳多远的值
    maxRange = Math.max(maxRange, i + nums[i]);
  }
  return true;
};

// BFS+回溯
// 暴力破解法

//
// -------divider-------
//

/*
【跳跃游戏 II】
https://leetcode-cn.com/problems/jump-game-ii/
给定一个非负整数数组，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:
输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

logs：0
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let res = 0;
  let end = 0;
  let max = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    max = Math.max(nums[i] + i, max);
    if (i === end) {
      end = max;
      res++;
    }
  }
  return res;
};

//
// -------divider-------
//

/*
【柠檬水找零】
https://leetcode-cn.com/problems/lemonade-change/

在柠檬水摊上，每一杯柠檬水的售价为 5 美元。
顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
注意，一开始你手头没有任何零钱。
如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

示例 1：
输入：[5,5,5,10,20]
输出：true
解释：
前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
由于所有客户都得到了正确的找零，所以我们输出 true。

示例 2：
输入：[5,5,10]
输出：true

示例 3：
输入：[10,10]
输出：false

示例 4：
输入：[5,5,10,10,20]
输出：false
解释：
前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
由于不是每位顾客都得到了正确的找零，所以答案是 false。

logs：02
[✔️]2021.03.03
[✔️]2021.04.20
*/
// 贪心算法。
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let five = 0,
    ten = 0;
  for (let i = 0; i < bills.length; i++) {
    let bill = bills[i];
    if (bill === 5) five++;
    if (bill === 10) {
      five--;
      ten++;
    }
    if (bill === 20) {
      if (ten > 0) {
        ten--;
        five--;
      } else {
        five -= 3;
      }
    }
    if (five < 0) return false;
  }
  return true;
};

//
// -------divider-------
//

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
n皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法。

logs：02
[✔️]2021.02.21
[✔️]2021.02.23
*/

// 递归+DFS+回溯。
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  if (n < 1) return [];
  // 定义棋盘
  let board = new Array(n);
  for (let i = 0; i < n; i++) {
    board[i] = new Array(n).fill('.');
  }
  let cols = new Set(); // 列
  let pie = new Set(); // 撇
  let na = new Set(); // 捺
  let result = [];
  dfs(board, 0);
  return result;

  function dfs(board, row) {
    // 到达最后一层
    // --- recursion terminator ---
    if (row === n) {
      let stringsBoard = board.slice();
      for (let i = 0; i < n; i++) {
        stringsBoard[i] = stringsBoard[i].join('');
      }
      result.push(stringsBoard);
      return;
    }
    for (let col = 0; col < n; col++) {
      // ---- process current ---
      // 如果当前点的所在的列、所在的对角线都有皇后，即跳过
      if (cols.has(col) || pie.has(row + col) || na.has(row - col)) {
        continue;
      }
      board[row][col] = 'Q'; // 放置皇后
      cols.add(col); // 记录放了皇后的列
      pie.add(row + col); // 记录放了皇后的正对角线
      na.add(row - col); // 记录放了皇后的负对角线
      // --- drill down ---
      dfs(board, row + 1);
      // --- reverse state ---
      board[row][col] = '.'; // 撤销该点的皇后
      cols.delete(col); // 对应的记录也删一下
      pie.delete(row + col);
      na.delete(row - col);
    }
    // return undefined
  }
};

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
【买卖股票的最佳时机】
【差异点：只能买卖1次】
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

logs：02
[✔️]2021.03.30
[✔️]2021.04.20
*/
// 动态规划。O(n*2)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length;
  if (len <= 1) return 0;

  let dp = Array.from(new Array(len), () => []);
  // 初始化：因为第1天的时候，前一天i-1是负数，这个边界条件要处理
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  // 从2天开始算
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]); // 无须dp[i-1][0] - prices[i]，因为是一锤子买卖，不需要累计前面所获得的利润。
  }
  return dp[len - 1][0];
};

// DFS。时间复杂度O(2^n)
// 贪心算法。时间复杂度O(n)

//
// -------divider-------
//

/*
【买卖股票的最佳时机 II】
【差异点：可以买卖无数次】
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

logs：02
[✔️]2021.03.30
[✔️]2021.04.20
*/
// 暴力法。列举所有可以的交易组合及对于的利润。时间复杂度：时间复杂度：O(n^n)，调用递归函数 n^n次。
// 动态规划。时间复杂度：O(n*2)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length;
  if (len <= 1) return 0;

  let dp = Array.from(new Array(len), () => []);
  // 初始化：因为第1天的时候，前一天i-1是负数，这个边界条件要处理
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  // 从2天开始算
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[len - 1][0];
};

// 贪心算法。时间复杂度：O(n)
// 只要后一天比前一天大，就买卖赚取利润
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var max = 0;
  for (var i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      max += prices[i] - prices[i - 1];
    }
  }
  return max;
};

//
// -------divider-------
//

/*
【买卖股票的最佳时机 III】
【差异点：只能买卖2次】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/

示例 1:
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。

logs：01
[✔️]2021.04.01
*/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length,
    max_k = 2;
  if (len <= 1) return 0;

  // dp数组定义
  let dp = [];
  for (let i = 0; i < prices.length; i++) {
    dp.push([]);
    for (let j = 0; j < 2; j++) {
      dp[i].push([]);
      for (let k = 0; k <= max_k; k++) {
        dp[i][j].push(0);
      }
    }
  }

  // 初始化第一天的值
  for (let k = 0; k <= max_k; k++) {
    dp[0][0][k] = 0;
    dp[0][1][k] = -prices[0];
  }

  // 状态方程
  for (let i = 1; i < prices.length; i++) {
    for (let k = 1; k <= max_k; k++) {
      dp[i][0][k] = Math.max(dp[i - 1][0][k], dp[i - 1][1][k] + prices[i]);
      dp[i][1][k] = Math.max(dp[i - 1][1][k], dp[i - 1][0][k - 1] - prices[i]);
    }
  }

  return dp[len - 1][0][2];
};

/*
【买卖股票的最佳时机 IV】
【差异点：可以买卖K次】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。

PS：买和卖算1次交易

logs：01
[✔️]2021.03.25
*/
// 动态规划。时间复杂度O(n*2*k) 空间复杂度O(n*2*k)
// https://labuladong.github.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%9B%A2%E7%81%AD%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98.html
// 第i天的的状态可能是：dp[第i天][手上有没有股][与买卖条件k次的关系]
//
//                           |- dp[i-1][0] 前一天我手上没有股的状态的利润值、不动，不做任何操作        |
// 这天我手上没有股：dp[i][0] = |                                                                 - 两个状态之间的max值
//                           |- dp[i-1][1] + pries[i] 前一天手上有股的状态的值+今天我卖掉这一股的值和 |
//
//                           |- dp[i-1][1] 前一天我手上有股的状态的利润值，今天不动，不做任何操作。     |
// 这一天我手上有股：dp[i][1] = |                                                                 - 两个状态之间的max值
//                           |- dp[i-1][0] - pries[i] 前一天没股的利润值 - 今天我买入一股后所剩的利润 |
//                              —————————————————————
//                              在买的时候还需要一维来记录与买卖条件k次的关系（小于k才可以买）
//
// dp方程：dp[i][0][k] = MAX{ dp[i-1][0][k], dp[i - 1][1][k] + prices[i]}
//        dp[i][1][k] = MAX{ dp[i-1][1][k], dp[i - 1][0][k - 1] - prices[i]}
//        结果result = Max{ dp[n-1], 0, {0...k} } 最后一天手上没有股且交易了k次后的最大值
//
// 状态方程：
//  for 状态1 in 状态1的所有取值：
//     for 状态2 in 状态2的所有取值：
//         for ...
//             dp[状态1][状态2][...] = 择优(选择1，选择2...)
var maxProfit = function (k, prices) {
  let len = prices.length,
    max_k = k;
  if (len <= 1) return 0;

  // dp数组定义
  let dp = [];
  for (let i = 0; i < prices.length; i++) {
    // 这么多天
    dp.push([]);
    for (let j = 0; j < 2; j++) {
      // 有股or每股
      dp[i].push([]);
      for (let k = 0; k <= max_k; k++) {
        // 交易次数
        dp[i][j].push(0);
      }
    }
  }

  // 初始化第一天的值
  for (let k = 0; k <= max_k; k++) {
    dp[0][0][k] = 0;
    dp[0][1][k] = -prices[0];
  }

  // 状态方程
  for (let i = 1; i < prices.length; i++) {
    for (let k = 1; k <= max_k; k++) {
      dp[i][0][k] = Math.max(dp[i - 1][0][k], dp[i - 1][1][k] + prices[i]);
      dp[i][1][k] = Math.max(dp[i - 1][1][k], dp[i - 1][0][k - 1] - prices[i]);
    }
  }
  return dp[len - 1][0][k];
};

//
// -------divider-------
//

/*
【最佳买卖股票时机含冷冻期】
【差异点：有冷冻期 A股的n+1制度】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
  卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

示例 :
输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

logs：02
[✔️]2021.04.01
[✔️]2021.04.20
*/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length;
  if (len <= 1) return 0;

  let dp = Array.from(new Array(len), () => []);
  // 初始化：因为第1天的时候，前一天i-1是负数，这个边界条件要处理
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  // 从2天开始算
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    // 因为有冷冻期，所以第i天选择【买入】的时候，要从 i-2 的状态转移，而不是 i-1
    dp[i][1] = Math.max(dp[i - 1][1], (i > 1 ? dp[i - 2][0] : 0) - prices[i]);
  }
  return dp[len - 1][0];
};

//
// -------divider-------
//

/*
【买卖股票的最佳时机含手续费】
【差异点：有手续费，可以无限交易，类似于美股】
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
  卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

示例 :
输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

logs：02
[✔️]2021.04.01
[✔️]2021.04.10
*/
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let len = prices.length;
  if (len <= 1) return 0;

  let dp = Array.from(new Array(len), () => []);
  // 初始化：因为第1天的时候，前一天i-1是负数，这个边界条件要处理
  dp[0][0] = 0;
  dp[0][1] = -prices[0] - fee;
  // 从2天开始算
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee); // 只要把手续费从利润中减去即可
  }
  return dp[len - 1][0];
};

//
// -------divider-------
//

/*
【最长递增子序列】
https://leetcode-cn.com/problems/longest-increasing-subsequence/
给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
说明:

可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
你算法的时间复杂度应该为 O(n2) 。

logs：05
[✔️]2021.04.01
[✔️]2021.04.06
[✔️]2021.04.20
[✔️]2021.04.21
[✔️]2021.04.22
*/
// 暴力破解 时间复杂度O(2^n)
// 动态规划 时间复杂度O(n^2)
// 这个动图还可以：https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/
// dp方程： for(0 -> len-1)
//            dp[i] = max{dp[j]} + 1 （j等于0-->i-1 并且 a[j]<a[i]）
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (!nums || !nums.length) return 0;
  let dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
};

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

logs：05
[✔️]2021.03.24
[✔️]2021.03.25
[✔️]2021.04.06
[✔️]2021.04.21
[✔️]2021.04.22
*/

// 动态规划 时间复杂度O(n)、空间复杂度O(n)
// dp方程：dp[i] = Math.max(nums[i], nums[i] + dp[i-1])
// 最大子序和 = 当前元素就是最大的(假如前面都是负数) Or 前面的加上当前的元素 => 取两者之间的最大值。
var maxSubArray = function (nums) {
  // new Array(nums.length).fill(0)
  // 复用nums只不过简化操作，反正里面的值是要被重写的
  let dp = nums.slice(); // 总之思想就是开个一维数组，将nums中的每一项最大记录下来，后面的就可以根据前面的来求最大值，最后得到总的最大值。
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  return Math.max(...dp);
};

// 发散一下，假设求【非连续】的子数组的最大和
// nums: [-2,1,-3,4,-1,2,1,-5,4]
var maxSubArray = function (nums) {
  let dp = nums.slice();
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > 0) {
        dp[i] = Math.max(nums[i], nums[i] + dp[j]);
      }
    }
  }
  // dp: [-2,1,-2,5,4,7,8,3,12]
  return Math.max(...dp);
};

//
// -------divider-------
//

/*
【乘积最大子数组】
https://leetcode-cn.com/problems/maximum-product-subarray/
给你一个整数数组 nums ，请你找出数组中乘积最大的【连续】子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

示例 1:
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。

示例 2:
输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

logs：2
[✔️]2021.04.21
[✔️]2021.04.23
*/
var maxProduct = function (nums) {
  const dp_max = nums.slice(); // 记录最大值
  const dp_min = nums.slice(); // 因为负负得正，所以还需要开一维来记录最小值
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i] > 0) {
      dp_max[i] = Math.max(nums[i], dp_max[i - 1] * nums[i]); // 正的最大值
      dp_min[i] = Math.min(nums[i], dp_min[i - 1] * nums[i]); // 负的最小值
    } else {
      dp_max[i] = Math.max(nums[i], dp_min[i - 1] * nums[i]); // 正的最大值（负负得正）
      dp_min[i] = Math.min(nums[i], dp_max[i - 1] * nums[i]); // 负的最小值
    }
  }
  return Math.max(...dp_max);
};

var maxProduct = function (nums) {
  let dp = Array.from(new Array(nums.length), () => []);
  // 0-表示正数 1-表示负数
  let res = nums[0];
  dp[0][0] = nums[0];
  dp[0][1] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 因为nums[i]有可能是正数，有可能是负数，所以要取三种状态的最大值
    dp[i][0] = Math.max(
      nums[i],
      dp[i - 1][0] * nums[i],
      dp[i - 1][1] * nums[i]
    );
    // 记录最小值，以便给下一个数求值
    dp[i][1] = Math.min(
      nums[i],
      dp[i - 1][0] * nums[i],
      dp[i - 1][1] * nums[i]
    );
    // 最后的最大值保存在正数状态数组里
    res = Math.max(res, dp[i][0]);
  }
  return res;
};

//
// -------divider-------
//

/*
【最长公共子序列】
https://leetcode-cn.com/problems/longest-common-subsequence/

给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。
一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
若这两个字符串没有公共子序列，则返回 0。

示例 1:
输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。

示例 2:
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3。

示例 3:
输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0。

logs：03
[✔️]2021.03.23
[✔️]2021.04.06
[✔️]2021.04.23
*/
// 动态规划 时间复杂度O(mn)、空间复杂度O(mn)
// https://leetcode.com/problems/longest-common-subsequence/discuss/348884/C%2B%2B-with-picture-O(nm)
// DP方程：如果最后一个字符不相同，那么就取各自删掉最后一个字符的最长公共子序列；如果最后一个字符相同，去掉相同字符且+1即可。
//        if(s1[s1.length-1] !== s2[s2.length-1]) Math.max(LCS(s1-1, s2), LCS(s1, s2-1))
//        if(s1[s1.length-1] === s2[s2.length-1]) LCS(s1-1, s2-1) + 1
/**
 * @param {string} text1 "abcde"
 * @param {string} text2 "ace"
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let m = text1.length;
  let n = text2.length;
  // [[0,0,0,0],
  //  [0,0,0,0],
  //  [0,0,0,0],
  //  [0,0,0,0],
  //  [0,0,0,0],
  //  [0,0,0,0]]
  let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  //      a c e
  //  [[0,0,0,0],
  // a [0,1,1,1],
  // b [0,1,1,1],
  // c [0,1,2,2],
  // d [0,1,2,2],
  // e [0,1,2,3]]
  return dp[m][n];
};

//
// -------divider-------
//

/*
【不同路径】
https://leetcode-cn.com/problems/unique-paths/

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
问总共有多少条不同的路径？
 
示例 1：
输入：m = 3, n = 7
输出：28

示例 2：
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下

示例 3：
输入：m = 7, n = 3
输出：28

logs：2
[✔️]2021.03.15
[✔️]2021.04.23
*/
// 动态规划。时间复杂度O(mn)、空间复杂度O(mn) 自底向上
// dp方程=dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 构建棋盘
  let dp = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n).fill(0);
  }
  // 因为棋盘的最下一行和最右一列的步数是确定的只有一步
  // 这里的话为了便于计算，将棋盘倒过来了，将【起点】作为【终点】，将【终点】作为【起点】
  // [
  //   [终,1,1,1,1,1,1],
  //   [1,0,0,0,0,0,0],
  //   [1,0,0,0,0,0,始]
  // ]
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  // 递推计算
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// 分治+记忆化搜索。时间复杂度O(mn)、空间复杂度O(mn)
var uniquePaths = function (m, n) {
  let board = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    board[i] = new Array(n).fill(0);
  }
  return dfs(m - 1, n - 1, board);
  function dfs(m, n, memo) {
    // 越界
    if (m < 0 || n < 0) return 0;
    // 边界
    if (m == 0 || n == 0) return 1;
    // 是否缓存
    if (memo[m][n] > 0) return memo[m][n];
    // 添加缓存
    memo[m][n] = dfs(m - 1, n, memo) + dfs(m, n - 1, memo);
    return memo[m][n];
  }
};

//
// -------divider-------
//

/*
【不同路径 II】
https://leetcode-cn.com/problems/unique-paths-ii/
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

示例 1：
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

示例 2：
输入：obstacleGrid = [[0,1],[0,0]]
输出：1

logs：01
[✔️]2021.03.16
*/
// 动态方程。时间复杂度：O(mn)、空间复杂度：O(mn)
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  // 出发点就被障碍堵住
  if (obstacleGrid[0][0] == 1) return 0;
  // 绘制棋盘
  let rows = obstacleGrid.length;
  let cols = obstacleGrid[0].length;
  let dp = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    dp[i] = new Array(cols).fill(0);
  }
  // 因为棋盘的最下一行和最右一列的步数是确定的只有一步
  // 这里的话为了便于计算，将棋盘倒过来了，将起点作为终点，将终点作为起点
  // [
  //   [终,1,1,1,1,1,1],
  //   [1,0,0,0,0,0,0],
  //   [1,0,0,0,0,0,始]
  // ]
  for (let i = 0; i < rows; i++) {
    // 如果边界路上有障碍，那么后面的网格确认的一步便失效
    if (obstacleGrid[i][0] === 1) {
      dp[i][0] = 0;
      break;
    }
    dp[i][0] = 1;
  }
  for (let j = 0; j < cols; j++) {
    // 如果边界路上有障碍，那么后面的网格确认的一步便失效
    if (obstacleGrid[0][j] === 1) {
      dp[0][j] = 0;
      break;
    }
    dp[0][j] = 1;
  }
  // 递推计算
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[rows - 1][cols - 1];
};

//
// -------divider-------
//

/*
【三角形最小路径和】
https://leetcode-cn.com/problems/triangle/description/
给定一个三角形 triangle ，找出自顶向下的最小路径和。
每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

示例 1：
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

示例 2：
输入：triangle = [[-10]]
输出：-10

logs：03
[✔️]2021.03.23
[✔️]2021.04.08
[✔️]2021.04.25
*/
// 动态规划。时间复杂度O(mn) 空间复杂度O(mn) 自底向上
// DP方程：f[i][j]=min(f[i−1][j−1],f[i−1][j])+c[i][j]
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let dp = triangle.slice();
  // 从倒数第二行开始算
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = triangle[i].length - 1; j >= 0; j--) {
      // [i][j]的左下点和右下点是[i + 1][j]和[i + 1][j + 1]
      dp[i][j] += Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  return dp[0][0];
};

//
// -------divider-------
//

/*
【零钱兑换】
https://leetcode-cn.com/problems/coin-change/description/
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
你可以认为每种硬币的数量是无限的。

示例 1：
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

示例 2：
输入：coins = [2], amount = 3
输出：-1

示例 3：
输入：coins = [1], amount = 0
输出：0

logs：03
[✔️]2021.03.24
[✔️]2021.04.08
[✔️]2021.04.08
*/
// 暴力破解
// BFS
// 动态规划 时间复杂度：O(sn) 其中s是金额，n是面额数、空间复杂度：O(s)
/**
 * @param {number[]} coins [1, 2, 5]
 * @param {number} amount 11
 * @return {number}
 */
// 跟爬楼梯问题类似，走到11阶可以走1or2or5步，一共有f(n) = f(n-1) + f(n-2) + f(n-5)种走法
// 凑成n所需的最少硬币数，即f(n) = Math.min(f(n-1) + f(n-2) + f(n-5))
var coinChange = function (coins, amount) {
  // dp数组初始化为 amount+1, 因为凑成 amount 金额的硬币数最多只可能等于 amount（全用1元面值的硬币）
  // 所以初始化为 amount+1 就相当于初始化为正无穷，便于后续取最小值
  let dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0; // dp：[0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12] 每一项代表的是多少元
  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        // dp方程：dp[i] = Math.min(之前填满面额i元最少需要的硬币, 填满面额(i-coin)元需要的硬币+当前硬币)
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  //      0元1元2元3元.....................11元
  // dp：[0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
  return dp[amount] === amount + 1 ? -1 : dp[amount];
};

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

假设n=5，有5级楼梯要爬，根据题意每次有2种选择，爬1级或爬2级。如果爬1级，则剩下4级要爬，如果爬2级，则剩下3级要爬。
由出发的可能不同可以具体化到两个子问题，爬4级楼梯有几种方式？爬3级楼梯有几种方式？
于是，爬5级楼梯的方式数 = 爬4级楼梯的方式数 + 爬3级楼梯的方式数。

递推公式：f(n) = f(n-1) + f(n-2)

logs：07
[✔️]2020.11.30
[✔️]2020.12.02
[✔️]2020.12.14
[✔️]2020.12.24
[✔️]2021.03.23
[✔️]2021.04.08
[✔️]2021.04.24
*/
// 递归。时间复杂度 O(2^n)
var climbStairs = function (n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
};

// 自顶向下递归+记忆化搜索。时间复杂度O(n)、空间复杂度O(n)
var climbStairs = function (n, memo = []) {
  if (n <= 2) return n;
  if (!memo[n]) {
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  }
  return memo[n];
};

// 动态规划。时间复杂度 O(n)、空间复杂度O(n)
// dp方程：F(n) = F(n-1) + F(n-2)
var climbStairs = function (n) {
  let arr = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};

// 不需要开额外数组来存中间状态 时间复杂度 O(n)、时间复杂度O(1)
var climbStairs = function (n) {
  if (n <= 2) return n;
  // prettier-ignore
  let f1 = 1, f2 = 2, f3 = 3
  for (let i = 3; i <= n; i++) {
    f3 = f1 + f2;
    f1 = f2;
    f2 = f3;
  }
  return f3;
};

//
// -------divider-------
//

/*
【斐波那契数列】
https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

示例 1：
输入：n = 2
输出：1

示例 2：
输入：n = 5
输出：5

logs：06
[✔️]2021.03.06
[✔️]2021.03.11
[✔️]2021.03.12
[✔️]2021.03.23
[✔️]2021.04.08
[✔️]2021.04.24
*/
// 通项公式法。时间复杂度O(1)（不展开、套数学公式即可）
// 暴力递归。时间复杂度O(2^n)、空间复杂度O(n)
// 自顶向下
var fibonacci = function (n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// 记忆化搜索。时间复杂度O(n)、空间复杂度O(n)
// 自顶向下，加个缓存优化、自顶向下来思考解决问题。
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n, memo = []) {
  if (n <= 1) {
    return n;
  }
  // 如果此数没有缓存过
  if (!memo[n]) {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
  return memo[n];
};

// DP。时间复杂度O(n)、空间复杂度O(n) 自底向上进行递推。
var fib = function (n) {
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};

// 尾递归。时间复杂度O(n)、空间复杂度O(1）
// 尾调用：函数在最后一步调用另一个函数。
// 尾递归：函数在最后一步调用自身。
// 尾递归（调用）由于是函数最后一步操作，不需要保存外层函数的执行上下文，所以调用栈不会溢出。（其实就是相当于一个for循环）
// 问题：很多宿主环境并未支持尾递归优化这个特性。
// https://ruanyifeng.com/blog/2015/04/tail-call.html
function fib(n, a = 1, b = 1) {
  if (n <= 0) return 0;
  if (n === 1) return a;
  return fib(n - 1, b, a + b); // 当函数return返回时，该函数的执行上下文就会从栈顶弹出
}

/* -------------------------- LRU Cache ---------------------------*/
/*
Least Recently Used Cache (最近最少使用)
使用 Double LinkedList 双向链表来实现
*/

/*
【LRU 缓存机制】

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。

实现 LRUCache 类：
LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

logs：01
[✔️]2021.04.25
*/
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const val = this.map.get(key);
  this.map.delete(key);
  this.map.set(key, val);
  return val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.map.delete(key);
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    const firstItem = this.map.keys().next().value; // iterator可迭代器
    this.map.delete(firstItem);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

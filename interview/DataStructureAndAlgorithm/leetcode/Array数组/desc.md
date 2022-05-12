# 数组

数组是在程序设计中，为了处理方便， 把具有相同类型的若干元素按有序的形式组织起来的一种形式。

首先，数组会利用 **索引** 来记录每个元素在数组中的位置，且在大多数编程语言中，索引是从 `0` 算起的。我们可以根据数组中的索引，快速访问数组中的元素。事实上，这里的索引其实就是内存地址。

![4.png](https://gitee.com/vr2/images/raw/master/images/628b6f699aa49ffcc9d3c75806457c4a1a66ffe025bb651d9f8e78b4242249b9-4.png)

其次，作为线性表的实现方式之一，数组中的元素在内存中是 **连续** 存储的，且每个元素占用相同大小的内存。

例如对于一个数组 `['oranges', 'apples', 'bananas', 'pears', 'tomatoes']`，为了方便起见，我们假设每个元素只占用一个字节，它的索引与内存地址的关系如下图所示。

![2.png](https://gitee.com/vr2/images/raw/master/images/65312e6dff56fc0c2ffad8752d6ca08da9bb7ec03211619754abd407e05147e8-2.png)

在具体的编程语言中，数组的实现方式具有一定差别。比如 C++ 和 Java 中，数组中的元素类型必须保持一致，而 Python 中则可以不同。相比之下，Python 中的数组（称为 list）具有更多的高级功能。

以下是数组的相关练习，可以帮助你进一步了解数组，快来试试吧！



#### 二分查找

- 如果该题目暴力解决的话需要 O(n)O(n) 的时间复杂度，但是如果二分的话则可以降低到 O(logn)O(logn) 的时间复杂度
- 整体思路和普通的二分查找几乎没有区别，先设定左侧下标 left 和右侧下标 right，再计算中间下标 mid
- 每次根据 nums[mid] 和 target 之间的大小进行判断，相等则直接返回下标，nums[mid] < target 则 left 右移，nums[mid] > target 则 right 左移
- 查找结束如果没有相等值则返回 left，该值为插入位置
- 时间复杂度：O(logn)O(logn)

二分查找的思路不难理解，但是边界条件容易出错，比如 循环结束条件中 left 和 right 的关系，更新 left 和 right 位置时要不要加 1 减 1。

下面给出两个可以直接套用的模板，记住就好了，免除边界条件出错

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1; // 注意
        while(left <= right) { // 注意
            int mid = (left + right) / 2; // 注意
            if(nums[mid] == target) { // 注意
                // 相关逻辑
            } else if(nums[mid] < target) {
                left = mid + 1; // 注意
            } else {
                right = mid - 1; // 注意
            }
        }
        // 相关返回值
        return 0;
    }
}
```

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length; // 注意
        while(left < right) { // 注意
            int mid = (left + right) / 2; // 注意
            if(nums[mid] == target) {
                // 相关逻辑
            } else if(nums[mid] < target) {
                left = mid + 1; // 注意
            } else {
                right = mid; // 注意
            }
        }
        // 相关返回值
        return 0;
    }
}

```


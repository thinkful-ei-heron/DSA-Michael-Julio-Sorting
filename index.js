/* Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
 What is the resulting list that will be sorted after 3 recursive calls to mergesort?

first call is mergeSort(full list) splits to
21, 1, 26, 45, 29, 28, 2, 9     49, 39, 27, 43, 34, 46, 40
second call is left = mergeSort(left) 

21, 1, 26, 45      29, 28, 2, 9
third call is left = mergeSort(left) will sort [21, 1, 26, 45]



 What is the resulting list that will be sorted after 16 recursive calls to mergesort?
[9];
 What are the first 2 lists to be merged?
[21], [1]
 Which two lists would be merged on the 7th merge?
[1, 21, 26, 45], [2, 9, 28, 29]
*/
let counter = 0;
function swap(array, i, j) {
  counter++;
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function mergeSort(array) {
  counter++;
  console.log(counter, ': ', array);
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  console.log(left, right);
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

/*
) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. Which of the following statements is correct about the partition step? Explain your answer.

The pivot could have been 17, but could not have been 14
>>>The pivot could have been either 14 or 17
Neither 14 nor 17 could have been the pivot
The pivot could have been 14, but could not have been 17

All elements less than 14 are left of 14 and all elements greater than 14 are right of 14, which is what you would see if 14 were the pivot.  Same reasoning implies that 17 could also be the pivot.  All other elements violate these constraints so could not have been the pivot.
2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning according to the quicksort algorithm.

When using the last item on the list as a pivot
14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
first partition:
pivot is 12

10, 3, 9, 12, 19, 14, 17, 16, 13, 15
then we quicksort on the array up to (but not including) the old pivot:
10, 3, 9
^J
3, 10, 9
  ^J
end of loop swap pivot and j
3, 9, 10

13, 10, 3, 9, 12, 14, 17, 16, 15, 19 

When using the first item on the list as a pivot:
*14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
first partition: pivot is14
pivot is 14, * marks J
  *14, 17, 13, 15, 19, 10, 3, 16, 9, 12 //swap arr[0] with itself then increment J
  14, *17, 13, 15, 19, 10, 3, 16, 9, 12 
  14, 13, *10, 15, 19, 17, 3, 16, 9, 12 
  14, 13, 10, *3, 19, 17, 15, 16, 9, 12 
  14, 13, 10, 3, *9, 17, 15, 16, 19, 12 
  14, 13, 10, 3, 9, *12, 15, 16, 19, 17 //no more later numbers <= 14: swap start and J
  12, 13, 10, 3, 9, 14, 15, 16, 19, 17 //done: now qsort start to the 9 and from the 16 to the end



- 13, 10, 3 , 9, 12, 14, [17] , 16, 15, 19
 14, [17], 16, 15, 19

 *pivot is 13:
 10, 3, 9 , 12, 13,

 *pivot is 10: 
  3, 9, 10 

 *pivot is 3
  3,9 -> 3 , 9

*/
function defaultCompare(a, b) {
  return a > b;
}
function quickSort(
  array,
  comparisonFunction = defaultCompare,
  start = 0,
  end = array.length
) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end, comparisonFunction);
  array = quickSort(array, comparisonFunction, start, middle);
  array = quickSort(array, comparisonFunction, middle + 1, end);
  return array;
}

function partition(array, start, end, comparisonFunction) {
  // Lomuto's with median-of-3
  let mid = Math.floor((start + end) / 2);
  if (comparisonFunction(array[start], array[mid])) {
    //array[mid] < array[start]
    swap(array, start, mid);
  }
  if (comparisonFunction(array[start], array[end - 1])) {
    //array[end - 1] < array[start]
    swap(array, start, end - 1);
  }
  if (comparisonFunction(array[end - 1], array[mid])) {
    //array[mid] < array[end - 1]
    swap(array, start, mid);
  }
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (comparisonFunction(pivot, array[i]) || pivot === array[i]) {
      //array[i] <= pivot
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

counter = 0;
// console.log(quickSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]), 'result');
// console.log(counter);

//#3
let nums =
  '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
nums = nums.split(' ').map(x => Number(x));

console.log(quickSort(nums));

//#4

// console.log(mergeSort(nums));

//#5
const LinkedList = require('./linkedList');

let drillList = new LinkedList();
nums.forEach(num => drillList.insertFirst(num));

function mergeSortList(head) {
  if (head === null || head.next === null) return head;
  const middle = getMiddle(head); // <--- ptr
  let left = head; //start of left side
  let right = middle.next; //start of right side
  middle.next = null; //break the chain

  left = mergeSortList(left);
  right = mergeSortList(right);
  return mergeList(left, right);
}

function mergeSortListWrapper(list) {
  let head = mergeSortList(list.head);
  let sorted = new LinkedList();
  sorted.head = head;
  return sorted;
}

function getMiddle(head) {
  let fast = head;
  let slow = head;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

function mergeList(left, right) {
  //left, right are nodes
  if (!left) return right;
  if (!right) return left;
  if (left.value <= right.value) {
    left.next = mergeList(left.next, right);
    return left;
  }
  right.next = mergeList(left, right.next);
  return right;
}
let shortList = new LinkedList();
shortList.insertFirst(1);
shortList.insertFirst(2);
shortList.insertFirst(3);
shortList.insertFirst(1);
// shortList.printList();
// let sorted = mergeSortListWrapper(drillList);

// sorted.printList();

// #6
function bucketSort(low, high, array) {
  let buckets = new Array(high - low).fill(0);
  // buckets is basically [low, low + 1, low + 2, ... , high] but offset to start at 0
  //this lets us easily get a nice array of 0s to work with
  for (let i = 0; i < array.length; i++) {
    //iterate through array and find the index into the buckets array
    let index = array[i] - low;
    //keep track of number of matches
    buckets[index]++;
  }
  let next = buckets[0]; //this is the next point where we switch to filling with a new number
  let j = 0; //iterator for buckets
  for (let i = 0; i < array.length; i++) {
    //iterate over original array, replacing contents as we go
    if (i < next) {
      array[i] = j + low;
    } else {
      j++; //next number in range
      next += buckets[j]; //how many times we saw it
    }
  }
}

// #7
function shuffle(arr) {
  //we need to swap random elements
  //let's do that arr.length times (seems a reasonable default)
  //might want more to guarantee a good shuffle?
  for (let i = 0; i < arr.length; i++) {
    let randItem = Math.floor(Math.random() * arr.length);
    let secRandItem = Math.floor(Math.random() * arr.length);
    swap(arr, randItem, secRandItem);
  }
  return arr;
}

//console.log(shuffle([4, 5, 2, 3, 6, 2]));

// #8

// for each pair of books, comparison works as follows:
// for each letter of the shorter title and each letter at the same position in the longer title (arbitrary which if lengths are equal)
// if the letters are the same (up to case), move on
// if the letters are different, whichever has the earlier letter in the alphabet should go before the other
// if all letters so far are the same and we're out of letters in the shorter title, it comes before the longer title

//having defined a useful comparison function, we can apply any of the previous sorting functions (modified to accept arbitrary comparison functions)

function compareTitles(a, b) {
  //should return true if a comes after b, false if a comes before b
  //for loop ? checking the character at index zero and comparing the two strings
  const shortLength = a.length > b.length ? b.length : a.length;
  for (let i = 0; i < shortLength; i++) {
    if (a[i].charCodeAt(0) > b[i].charCodeAt(0)) {
      return true;
    }
    if (a[i].charCodeAt(0) < b[i].charCodeAt(0)) {
      return false;
    }
  }
  return a.length > b.length ? true : false;
}

let titles = [
  'Harry Potter',
  'Percy Jackson',
  'Infinite Jest',
  'Calculus',
  'Mein Kampf',
  'Consider Phlebas',
  'The Player of Games',
  'Use of Weapons',
  'Excession',
  'Matter',
  'Surface Detail',
  'The Hydrogen Sonata',
  'The State of the Art',
  'Revelation Space',
  'Chasm City',
  'Redemption Ark',
  'Thud!',
  'HARRY POTTER',
];

console.log(quickSort(titles, compareTitles));
console.log(titles.sort());

//1, 2, 3, 11
//'1', '11', '2', '3'

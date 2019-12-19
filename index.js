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
9 is pivot
3, 9, 10


When using the first item on the list as a pivot

*/

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

function partition(array, start, end) {
  // Lomuto's with median-of-3
  // let mid = Math.floor((start + end) / 2);
  // if (array[mid] < array[start]) {
  //   swap(array, start, mid);
  // }
  // if (array[end - 1] < array[start]) {
  //   swap(array, start, end - 1);
  // }
  // if (array[mid] < array[end - 1]) {
  //   swap(array, start, mid);
  // }
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

function mergeSort(array) {
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

counter = 0;
console.log(quickSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]), 'result');
console.log(counter);

// HEAPS
// it's a special case of tree where =>
// in max heap => the parent should be greater than the children
// in min heap => the parent should be smaller than the children

// implementions 
// we can user nodes or flaten the tree in a linear data structure

// USES
// create efficient priority queue
// when you want to acces min or max value very quickly

const {swap} = require("../Algorithms/utils");

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) { // O(logn)
    const {values} = this;
    if(!values.length) return values.push(value);
    let currentIdx = values.push(value) -1;
    // Bubble up the inserted value to the right spot
    let parentIdx = Math.floor((Math.abs(currentIdx-1))/2);
    while(values[parentIdx] > values[currentIdx]){
      swap(values, parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((Math.abs(currentIdx-1))/2);
    }
    return currentIdx;
  }

  minExtract() { // O(logn)
    const {values} = this;
    if(!values.length) return undefined;
    swap(values, 0, values.length-1);
    const removed = values.pop();
    // Bubble down the root to the correct spot
    let currentIdx = 0;
    let swaps = true;
    while(swaps) {
      swaps = false;
      let firstChildIdx = currentIdx*2+1; 
      let secondChildIdx = currentIdx*2+2;
      const {smallest} = this.#getOrder(firstChildIdx, secondChildIdx);
      if(smallest && values[currentIdx] > values[smallest]) {
        swap(values, currentIdx, smallest);
        swaps = true;
      }
      currentIdx = smallest;
    }
    return removed;
  }

  #getOrder(index1, index2){
    const order = {};
    if(!this.values[index1]) {
      order.smallest = undefined;
      return order
    }
    if(!this.values[index2]) {
      order.smallest = index1;
      return order;
    } 
    if(this.values[index1] > this.values[index2]){
      order.smallest = index2;
      order.greatest = index1;
    }else {
      order.smallest = index1;
      order.greatest = index2;
    }
    return order;
  }
}


const heap = new MinBinaryHeap();
heap.insert(27)
heap.insert(39)
heap.insert(55)
heap.insert(18)
heap.insert(Infinity)
heap.insert(Infinity)
heap.insert(Infinity)
heap.insert(1)
heap.insert(100)
console.log(heap.minExtract())
console.log(heap.minExtract())
console.log(heap.values)

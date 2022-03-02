// PRIORITY QUEUE
// it's a queue but we extract depend on the priority of the node
// we can use arr or list but to sort or to search for min or max priority will cost O(n)
// So we use min binary heap

// USESE 
// when you want to pick elemetn based on its priority quickly
// Dijkstra's algorithm
// task list to ensue the most improtant one would be excuted first

// IMPLEMENTAION
// we build PQ based on minBinaryHeap;

const {swap} = require("../Algorithms/utils")

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {

  constructor() {
    this.values = [];
  }

  enqueue(value, priority) { // O(logn)
    const {values} = this;
    const newNode = new Node(value, priority)
    if(!values.length) return values.push(newNode);
    let currentIdx = values.push(newNode) -1;
    // Bubble up the inserted value to the right spot
    let parentIdx = Math.floor((Math.abs(currentIdx-1))/2);
    while(values[parentIdx].priority > values[currentIdx].priority){
      swap(values, parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((Math.abs(currentIdx-1))/2);
    }
    return currentIdx;
  }

  dequeue() { // O(logn)
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
      if(smallest && values[currentIdx].priority > values[smallest].priority) {
        swap(values, currentIdx, smallest);
        swaps = true;
      }
      currentIdx = smallest;
    }
    return removed.value;
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
    if(this.values[index1].priority > this.values[index2].priority){
      order.smallest = index2;
      order.greatest = index1;
    }else {
      order.smallest = index1;
      order.greatest = index2;
    }
    return order;
  }
}


const pq = new PriorityQueue();
pq.enqueue("A", 2) 
pq.enqueue("C", 4) 
pq.enqueue("B", 6) 
pq.enqueue("E", 1) 
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq)
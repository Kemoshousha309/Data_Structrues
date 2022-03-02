// STACK
// it's a data structure which the last element added should be the first one retrivied "last in first out" (LIFO)
// uses: history in some apps, undo immplementation, function invocation call stack ....

class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(){
    this.last = null;
    this.first = null;
    this.size = 0;
  }

  pop() {
    if(!this.last) return undefined;
    let poped = this.last
    if(this.size === 1) {
      this.last = null;
      this.first = null;
    }else {
      this.last = poped.next;
      poped.next = null;
    }
    this.size--;
    return poped;
  }

  push(value) { 
    const newNode = new Node(value);
    if(!this.last) {
      this.last = newNode;
      this.first = newNode;
    }else {
      newNode.next = this.last;
      this.last = newNode;
    }
    return this.size++;
  }
}

const s = new Stack();
// s.push(2)
// s.push(4)
// s.push(6)
// console.log(s.pop())
// console.log(s)


// QUEUE
// it's a data structure in which the first element in should be the first out "fist in first out" (FIFO) first served first
// uses: your turn in online game, save the order element in effective sequence ......

class Queue {
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) { 
    const newNode = new Node(value)
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return this.length++
  }

  dequeue() { 
    if(!this.head) return undefined;
    let shifted = this.head
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }else {
      this.head = shifted.next;
      shifted.next = null;
    }
    this.length--;
    return shifted.value;
  }
}

const q = new Queue();

module.exports = {
  Queue,
  Stack
}

// q.enqueue(2)
// q.enqueue(6)
// q.enqueue(1)
// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q)


// CONCLOSION
// Stack (LIFO), Queue (FIFO) data structures with adding and retriving time of n
// They are build on the linked array
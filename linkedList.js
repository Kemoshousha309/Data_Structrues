// CONCEPT => SINGLEY LINKED LIST (SLL)
// linear data structure where every node have a pointer points to the next one

// DOUBLY LINKED LIST (DLL)
// => the same concept of singly linked list but has one more feature which is previous pionter 
// and this improve some things as showed with every method

// NOTE
// array is an indexed linear data structure and has two types
// 1- static (SA) with fixec size (this type in relativly low level languages such as c, java)
// you can make this data structure by memory allocation
// 2- dynamic (DA) => it's size can be grow through resizing when it's filled


class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) { // SLL, DLL, SA => O(1), DA => O(1) or O(n) when resizing
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

  pop() { // SLL => O(n), DLL, DA, SA => O(1)
    if(!this.head) return -1;
    let node = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }else {
      let prev = null;
      while(node){
        if(node === this.tail){
          this.tail = prev;
          this.tail.next = null;
          break;
        }
        prev = node
        node = node.next;
      }
    }
    this.length--;
    return node;
  }

  shift() { // DA, SA => O(n), SLL, DLL=> O(1)
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
    return shifted;
  }

  unshift(value) { // DA, SA => O(n), SLL, DLL=> O(1)
    const newNode = new Node(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return this.length++;
  }
  get(index) { // DA, SA => O(1), SLL, DLL=> O(n)
    let node = this.head;
    let indexer = 0;
    while(node) {
      if(indexer === index){
        return node
      }
      node = node.next;
      indexer ++;
    }
    return undefined;
  }
  set(index, value) { // DA, SA => O(1), SLL, DLL=> O(n)
    const updateNode = this.get(index);
    if(updateNode){
      updateNode.value = value;
    }
    return updateNode;
  }
  insert(index, value) {// DA, SA => O(n), SLL, DLL=> O(n)
    if(this.length === 0 || index === this.length-1 ) return !!this.push(value);
    if(index === 0) return !!this.unshift(value);

    const newNode = new Node(value);
    const prevNode = this.get(index-1);
    if(prevNode && prevNode !== this.tail) {
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length++;
      return true;
    }
    return false;
  }

  remove(index) { // DA, SA => O(n), SLL, DLL=> O(n)
    if(this.length === 0 || index === this.length-1 ) return !!this.pop();
    if(index === 0) return !!this.shift();
    const preremoved = this.get(index-1);
    const removed = preremoved.next;
    if(removed){
      preremoved.next = removed.next;
      removed.next = null;
    }
    return !!removed;
  }
  reverse() { // O(n)
    if(!this.head || this.length === 1) return
    const temp = this.tail;
    this.tail = this.head;
    this.head = temp;
    let node = this.tail;
    let nextNode = node.next;
    let prevNode = null;
    while(node) {
      node.next = prevNode;
      prevNode = node;
      node = nextNode;
      if(node) nextNode = node.next;
    } 
    return this;
  }
}

const list = new SingleLinkedList();
list.push(4);
list.push(7);
list.push(2);
list.push(1);
// console.log(list.unshift(3))
// console.log(list.unshift(1))
console.log(list.reverse())

console.log(list)


// CONCLOSION
// 1- The relative low level language can make static array wich is more effecient than dynamic one
// 2 - Dynamic resize when it's completed which take O(n) "js, py arrays are built-in dynamic arrays"
// 3 - arrays at genral excel in accessing element not insertion and deletion
// 4 - linked list excels in inertion and deletion from the two ends of the list

// TREE 
// a data structure which every node in the relation of parent-children
// must have a root vertex
// for a vertex to point to another sibling or parent or other nodes parent is not allowed in tree
// tree has any number of children
// tree has a lot of types

// BINAYR TREE
// it's a tree which each node at most has two children

// BINARY SEARCH TREE
// binary tree which the left child smaller than the node and the right child is greater than the node
// excel in searching => using binary search algorithm

// methodology
// first node => root (the tree must have one root)
// node => vertex
// vertex has children => parent 
// children themselves => sibling
// a node with no children => leaf
// connections => edges

// USES
// DOM in browsers, routing, liking between things, operation file system, tree nodes representation

// IMPLEMENTAION
// when you have much more children use [] for them
// else there is two you can use just two pointers
// you can implement with pointer approach or flatten the tree into linear data structure but keeping the relation 
// between the node and its childrens

// TRAVERSAL
// there are two types of traversal non linear data sturctures such as graphes and trees
// 1- Breadth first search =>  explores all nodes at the present depth prior to moving on to the nodes at the next depth level.
// 2- Depth first search =>  start from a node and explore as far as possible in one branch before backtracking


const {Queue} = require("./stack_queue");

class Node{
  constructor(value) {
    this.value = value;
    // using left & right because => binary tree
    this.right = null;
    this.left = null;
    // if not binary tree
    // this.children = []; // will contian nodes each one pointing to its children
  }
}

class BinarySearchTree {  
  constructor(){
    this.root = null;
    this.size = 0;
  }

  insert(value) { // O(logn)
    const newNode = new Node(value);
    if(!this.root) {
      this.root = newNode;
      return this.size++;
    }
    let node = this.root;
    while(node) {
      if(value > node.value) {
        if(node.right){
          node = node.right;
        }else{
          node.right = newNode;
          break;
        }
      }else{
        if(node.left){
          node = node.left;
        }else{
          node.left = newNode;
          break;
        }
      }
    }
  }
  find(value) { // O(logn)
    let node = this.root;
    while(node) {
      if(value === node.value){
        return true
      }else if(value > node.value){
        node = node.right;
      }else {
        node = node.left;
      }
    }
    return false;
  }

  BFS() {
    const result = [];
    let node;
    // use a queue to keep track of the sequece of the nodes at the same depth level
    const queue = new Queue();
    queue.enqueue(this.root);
    while(queue.length){
      node = queue.dequeue();
      result.push(node.value);
      if(node.left) queue.enqueue(node.left);
      if(node.right) queue.enqueue(node.right);
    } 
    return result;
  }

  DFS() { // the place of the push define the type DFS
    const result = [];
    (function helper(node) {
      // result.push(node.value); // preOrder => flatten to linear data structure that can be use laterly to rebuild
      if(node.left) helper(node.left)
      // result.push(node.value); // inOrder => in binary search will keep the array sorted
      if(node.right) helper(node.right)
      result.push(node.value); // postOrder
    })(this.root)
    return result;
  }

}

const t = new BinarySearchTree();
t.insert(3)
t.insert(10)
t.insert(34)
t.insert(2)
t.insert(6)
// console.log(t.find(10))
// console.log(t.find(103))
console.log(t.DFS())
// console.log(t)
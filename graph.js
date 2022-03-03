// GRAPH
// collenction nodes and connections 

// METHODOLOGY
// node => vertex
// connection => edge

// USES 
// routes linking, maps, relation in social networks, recommendation

// TYPES 
// 1- weighted and unweighted graphs, weighted => the edge have a value
// 2- dircect or undirected, directed => the edge is directed from node to another node

//  IMPLEMENTATION
// to store each vertex and its edges
// 1- adjacently list => use a hash table 
// 2- adjacently matrix => 2D array difining every possible prospect true or false

// LIST VS MATRIX
// Matrix effecient in random access but cost more space complexity

const {Stack, Queue} = require("./stack_queue");
const {PriorityQueue} = require("./priorityQueue");

class Graph { // weighted graph
  constructor(){
    this.size = 0;
    this.data = {}
  }
  addVertex(vertex) {
    if(this.data[vertex])
      throw new Error("The vertex is already exist!!");
    this.data[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    const {data} = this;
    if(!data[vertex1] || !data[vertex2] || vertex1 === vertex2)
      throw new Error("Vertices are not valid!");
    
    data[vertex1].push([vertex2, weight])
    data[vertex2].push([vertex1, weight])
  }
  removeVertex(vertex) {
    const {data} = this;
    if(!data[vertex])
      throw new Error("unvalid vertex!");
    for(let key in data){
      data[key].forEach((edge, index) => {
        if(edge[0] === vertex) {
          data[key].splice(index, 1)
        }
      })
    }
    delete data[vertex];
  }
  removeEdge(vertex1, vertex2) {
    const {data} = this;
    data[vertex1] = data[vertex1].filter(v => v[0] !== vertex2);
    data[vertex2] = data[vertex2].filter(v => v[0] !== vertex1);
  }
  DFS_recursive(start) {
    const result = [];
    const visited = {};
    (function helper(node){
      result.push(node);
      visited[node] = true
      this.data[node].forEach(nighbor => {
        if(!visited[nighbor[0]])
          helper.call(this, nighbor[0])
      })
    }).call(this, start)
    return result;
  }

  DFS_iterative(start) {
    const result = [];
    const visited = {};
    // stimulation the call stack
    const stack = new Stack();
    stack.push(start);
    while(stack.size) {
      const node = stack.pop();
      if(!visited[node]) {
        result.push(node);
      }
      visited[node] = true;
      this.data[node].forEach(v => {
        if(!visited[v[0]]){
          stack.push(v[0])
        }
      })
    }
    return result;
  }

  BFS(start) {
    const result = [];
    const visited = {};
    const queue = new Queue();
    queue.enqueue(start)
    let node;
    while(queue.length) {
      node = queue.dequeue();
      if(!visited[node]){
        result.push(node);
      }
      visited[node] = true;
      this.data[node].forEach(v => {
        if(!visited[v[0]]){
          queue.enqueue(v[0]);
        }
      })
    }
    return result;
  }

  shortestPath(start, finish) { // Dijkstra's algorithm
    const dists = {};
    const distsQueue = new PriorityQueue();
    const prev = {};
    const path = [];
    for(let key in this.data) {
      if(key === start) {
        dists[key] = 0;
        distsQueue.enqueue(key, 0)
      }else {
        dists[key] = Infinity;
        distsQueue.enqueue(key, Infinity);
      }
      prev[key] = null
    }
    let smallest;
    while(distsQueue.values){
      smallest = distsQueue.dequeue()
      if(smallest === finish) {
        path.push(finish)
        while(prev[smallest]){
          smallest = prev[smallest];
          path.push(smallest);
        }
        path.reverse();
        break;
      }
      this.data[smallest].forEach(([vertex, weight]) => {
        const candidate = dists[smallest]  + weight;
        if(candidate < dists[vertex]) {
          dists[vertex] = candidate;
          distsQueue.enqueue(vertex, weight)
          prev[vertex] = smallest
        }
      })
    }
    return path;
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "F", 1);
graph.addEdge("D", "E", 3);

// graph.removeEdge("A", "B")

// console.log(graph.DFS("A"))
// console.log(graph.BFS("A"))
// console.log(graph.DFS_iterative("A"))


// console.log(graph.data)
console.log(graph.shortestPath("A", "E"))



// HASH TABLE 
// it's a key-value pair data structure
// excels at insertion, updating, access (access by key), searching
// built-in data structure in the most programming languages
// js => object, py => dictionary, java => hashtable, ... map in others

// THE IDEA
// we have an array that we will store the data in
// we accept a key-value pair and will convert the key to an index of the array and store it
// when retriving conveert the key with the same hash fuction then use the returned index to get the element
// the power of the hash table depend on the effecient of hash function

// HASHING 
// the idea of transformation of the data
// uses in encryption, cypersecuirty, encrypt passwords, ...
// properties of hashing
// 1- get the same output from the same input every time
// 2- converting to unique form with every input (distributes the values)
// 3- fast => O(1)
// 4- non-invertible
// there are alot of hashing algorithms which are really fast and powerfull

class HashTable{
  constructor(length=50) {
    this.values = Array.from({length: length});
  }

  #hash(key) {  // map a key "string" to an index in the hash table "array"
    let total = 0;
    const prime = 31;
    // the prime number used in hashing to distribute 
    // the values among hash indices to avoid collisions
    for(let i = 0; i < Math.min(key.length, 20); i++){
        let code = key[i].charCodeAt(0);
        total = (total* prime + code) % this.values.length;
    // the remainder of the division will never exceed the divisor
    }
    return total;
  }

  set(key, value){ // O(1)
    const index = this.#hash(key);
    if(this.values[index]) {
      this.values[index].push([key, value])
    } else{
      this.values[index] = [[key, value]]
    }
  }

  get(key) { // O(1)
    const index = this.#hash(key);
    let value = undefined;
    if(this.values[index]){
      this.values[index].forEach(element => {
        if(element[0] === key){
          return value = element[1]
        }
      })
    }
    return value;
  }
  keys() { // O(nk)
    let result = [];
    this.values.forEach(element => {
      if(element){
        element.forEach(e => {
          result.push(e[0]);
        })
      }
    })
    return result;
  }
  getvalues() { // O(nk)
    let result = [];
    this.values.forEach(element => {
      if(element){
        element.forEach(e => {
          result.push(e[1]);
        })
      }
    })
    return result;
  }
  
}

const h = new HashTable();
h.set("A", 3)
h.set("B", 60)
h.set("C", 2)
h.set("dg", 6)
h.set("g", 2)
h.set("hs", 6)
h.set("n", 2)
console.log(h.getvalues())
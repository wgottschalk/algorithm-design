module.exports = class Heap {
  constructor(array = []) {
    this.values = [null].concat(array)
    this.size = this.values.length - 1
  }

  getValues() {
    return this.values.slice(1)
  }

  getParent(index){
    return index >> 1
  }

  getLeftChild(index) {
    return index << 1
  }

  getRightChild(index) {
    return (index << 1) + 1
  }

  heapify(i) {
    const leftIndex = this.getLeftChild(i)
    const rightIndex = this.getRightChild(i)
    const heap = this.values
    let least = null;

    if ( heap[leftIndex] < heap[i] )  least = heap[leftIndex]
    if ( heap[rightIndex] < heap[i] ) least = heap[rightIndex]
    if (least) {
      let temp = heap[least]
      heap[least] = heap[i]
      heap[i] = temp

      this.heapify(i)
    }
  }

  insert(element) {
    this.values = [element].concat(this.values.slice(1))
    this.heapify(1)
  }

  buildHeap() {
    const heap = new Heap()
    const currHeap = this.getValues()
    currHeap.forEach((value) => {
      heap.insert(value)
    })
    this.values = [null].concat(heap.getValues())
  }
}

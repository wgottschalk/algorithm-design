function Heap (comparator = (a, b) => a - b) {
    Object.defineProperty(this, 'size', {
      get: function() {return this._heap.length - 1}
    })
    Object.defineProperty(this, 'heap', {
      get: function() {return this._heap.slice(1)}
    })
    Object.defineProperty(this, 'min', {
      get: function() {return this._heap.slice(1)[0]}
    })
    this.comp = comparator
    this._heap = [null]
  }

  Heap.prototype = {
    parentIndex(index) {return index >> 1},
    leftIndex(index)   {return index << 1},
    rightIndex(index)  {return (index << 1) + 1},
    insert(element) {
      this._heap.push(element)
      this._bubbleUp(this.size)
      return this
    },
    _bubbleUp(childIndex) {
      const parentIdx = this.parentIndex(childIndex)
      if (this.comp(this._heap[parentIdx], this._heap[childIndex]) > 0
          && childIndex > 1) {
        this._swap(parentIdx, childIndex)
        this._bubbleUp(parentIdx)
      }
    },
    _swap(a, b) {
      let temp = this._heap[a]
      this._heap[a] = this._heap[b]
      this._heap[b] = temp
    },
    extractMin() {
      const min = this.min
      this._heap[1] = this._heap.pop()
      this._bubbleDown(1)
      return min
    },
    _bubbleDown(index) {
      const leftIdx = this.leftIndex(index)
      const rightIdx = this.rightIndex(index)
      let minIdx

      if (this.comp(this._heap[index], this._heap[leftIdx]) > 0 ) {
        minIdx = leftIdx
      }

      if (this.comp(this._heap[index], this._heap[rightIdx]) > 0
      &&  this.comp(this._heap[leftIdx], this._heap[rightIdx]) > 0) {
        minIdx = rightIdx
      }

      if (minIdx) {
        this._swap(index, minIdx)
        this._bubbleDown(minIdx)
      }
    },
    heapsort(array) {
      array.forEach( node => this.insert(node))
      return this.heap.map( this.extractMin.bind(this) )
    }
  }

module.exports = Heap

function Heap (comparator = (a, b) => a - b) {
    Object.defineProperty(this, 'min', {
      get: function() {return this._heap[0]}
    })
    this.comp = comparator
    this._heap = []
  }

  Heap.prototype = {
    parentIndex(index) {return (index - 1 ) >> 1},
    leftIndex(index)   {return (index << 1) + 1},
    rightIndex(index)  {return (index << 1) + 2},
    insert(element) {
      this._heap.push(element)
      this._bubbleUp(this._heap.length - 1)
      return this
    },

    _bubbleUp(childIndex) {
      const parentIdx = this.parentIndex(childIndex)
      if (childIndex > 0
      && this.comp(this._heap[parentIdx], this._heap[childIndex]) > 0) {
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
      this._heap[0] = this._heap.pop()
      this._bubbleDown()
      return min
    },

    _bubbleDown(index = 0) {
      const leftIdx = this.leftIndex(index)
      const rightIdx = this.rightIndex(index)
      let minIdx

      if (leftIdx < this._heap.length
      &&  this.comp(this._heap[index], this._heap[leftIdx]) > 0 ){
        minIdx = leftIdx
      }

      if ( rightIdx < this._heap.length
      && this.comp(this._heap[index], this._heap[rightIdx]) > 0
      && this.comp(this._heap[leftIdx], this._heap[rightIdx]) > 0 ) {
        minIdx = rightIdx
      }

      if (minIdx) {
        this._swap(index, minIdx)
        if (this.leftIndex(minIdx) < this._heap.length) {
          this._bubbleDown(minIdx)
        }
      }
    },

    heapsort(array) {
      array.forEach( node => this.insert(node) )
      return this._heap.slice(0).map( this.extractMin.bind(this) )
    }
  }

module.exports = Heap

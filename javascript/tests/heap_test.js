const Heap = require('../heap/heap')

describe("heap", () => {
  beforeEach( () => {
    this.h = new Heap()
  })

  describe("#parent", () => {
    it("returns the parent element at the given index", () => {
      const root = this.h.parentIndex(2)
      const parent = this.h.parentIndex(8)
      expect(root).to.equal(1)
      expect(parent).to.equal(4)
    })

    it("returns the root when getParent is called on the root index", () => {
      const root = this.h.parentIndex(1)
      expect(root).to.equal(root)
    })
  })

  describe("#leftChild", () => {
    it("returns the index of the left child at a given index", () => {
      const child = this.h.leftIndex(1)
      expect(child).to.equal(2)
    })
  })

  describe("#rightChild", () => {
    it("returns the index of the right child at a given index", () => {
      const child = this.h.rightIndex(1)
      expect(child).to.equal(3)
    })
  })

  describe("#insert", () => {
    it("inserts an item into the heap and maintains the integrity of the heap", () => {
      this.h.insert(3).insert(1).insert(5)
      expect(this.h.heap).to.eql([1, 3, 5])
    })
  })

  describe("#min", () => {
    it("returns the min value of the heap as a property", () => {
      const values = [7,4,8,9,2,3,1,6,0,5]
      values.forEach( val => this.h.insert(val))
      expect(this.h.min).to.equal(0)
    })
  })


  describe("#extractMin", () => {
    it("deletes the minimun value and maintains the heap", () => {
      const values = [7,4,8,9,2,0]
      values.forEach( val => this.h.insert(val))
      const min = this.h.extractMin()
      expect(min).to.equal(0)
      expect(this.h.heap).to.eql([2, 4, 8, 9, 7])
    })
  })

  describe("#heapsort", () => {
    it("sorts an aray of numbers", () => {
      expect(this.h.heapsort([5,4,3,6,7,2,1,8,9,0]))
        .to.eql([0,1,2,3,4,5,6,7,8,9])
    })
  })
  // describe("#heapify", () => {
  //   it("it will maintain the heap structure given the left" +
  //      "and right children are valid heaps", () => {
  //     const h = new Heap()
  //
  //     expect(h.getValues()).to.eql([0, 1, 7, 3, 0, 9, 8, 5])
  //   })
  // })
  //
  // describe("#buildHeap", () => {
  //   it("will return a valid heap given any array", () => {
  //     const h = new Heap([8, 7, 6, 5, 4, 3, 2, 1])
  //     h.buildHeap()
  //     expect(h.getValues()).to.eql([1, 2, 3, 4, 5, 6, 7, 8])
  //   })
  // })
})

const Heap = require('../heap/heap')

describe("heap", () => {
  beforeEach( () => {
    this.h = new Heap()
  })

  describe("#parent", () => {
    it("returns the parent element at the given index", () => {
      const root = this.h.getParent(2)
      const parent = this.h.getParent(8)
      expect(root).to.equal(1)
      expect(parent).to.equal(4)
    })

    it("returns the root when getParent is called on the root index", () => {
      const root = this.h.getParent(1)
      expect(root).to.equal(root)
    })
  })

  describe("#leftChild", () => {
    it("returns the index of the left child at a given index", () => {
      const child = this.h.getLeftChild(1)
      expect(child).to.equal(2)
    })
  })

  describe("#rightChild", () => {
    it("returns the index of the right child at a given index", () => {
      const child = this.h.getRightChild(1)
      expect(child).to.equal(3)
    })
  })

  describe("#insert", () => {
    it("inserts an item into the heap and maintains the integrity of the heap", () => {
      this.h.insert(3).insert(1).insert(5)
      expect(this.h.getHeap()).to.eql([1, 5, 3])
    })
    it("takes a list of items and bulk inserts them into the heap", () => {
      this.h.insert(3, 1, 5)
      expect(this.h.getHeap()).to.eql([1, 5, 3])
    })
    it("takes an array of items and bulk inserts", () => {
      this.h.insert([3, 1, 5])       
      expect(this.h.getHeap()).to.eql([1, 5, 3])
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

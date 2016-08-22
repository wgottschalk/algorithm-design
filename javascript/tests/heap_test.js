const Heap = require('../heap/heap')

describe("heap", () => {
  beforeEach( () => {
    this.h = new Heap()
  })

  describe("#parent", () => {
    it("returns the parent element at the given index", () => {
      const root = this.h.parentIndex(2)
      const parent = this.h.parentIndex(8)
      expect(root).to.equal(0)
      expect(parent).to.equal(3)
    })

    it("returns the root when getParent is called on the root index", () => {
      const root = this.h.parentIndex(1)
      expect(root).to.equal(0)
    })
  })

  describe("#leftChild", () => {
    it("returns the index of the left child at a given index", () => {
      const child = this.h.leftIndex(1)
      expect(child).to.equal(3)
    })
  })

  describe("#rightChild", () => {
    it("returns the index of the right child at a given index", () => {
      const child = this.h.rightIndex(1)
      expect(child).to.equal(4)
    })
  })

  describe("#insert", () => {
    it("inserts an item into the heap and maintains the integrity of the heap", () => {
      this.h.insert(3).insert(1).insert(5)
      expect(this.h._heap).to.eql([1, 3, 5])
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
      expect(this.h._heap).to.eql([2, 4, 8, 9, 7])
    })
  })

  describe("#heapsort", () => {
    it("sorts an aray of numbers", () => {
      expect(this.h.heapsort([5,4,3,6,7,2,1,8,9,0]))
        .to.eql([0,1,2,3,4,5,6,7,8,9])
    })
    it("heapsorts nodes", () => {
      const nodeHeap = new Heap( (nodeA, nodeB) => nodeA.value - nodeB.value )
      function Node(val, name) {
        this.value = val
        this.name = name
      }
      const values = [[5, 'a'], [1, 'b'],[3, 'c'],[8, 'd'],[4, 'e'],[2, 'f'],[0, 'g'],[9, 'h']]
      const nodes = values.map( ([value, name]) => new Node(value, name))
      const sorted = nodeHeap.heapsort(nodes)
      expect(sorted).to.eql( nodes.sort( (a, b) => a.value - b.value) )
    })
  })
})

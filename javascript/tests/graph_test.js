const Graph = require('../graph/graph')

describe("graphs", () => {
  beforeEach(() => {
    this.g = new Graph()
  })

  it("tests the properties on a graph", () => {
    expect(this.g).to.have.property("isDirected", false)
    expect(this.g).to.have.property("adjList")

    const directedG = new Graph({isDirected: true})
    expect(directedG).to.have.property("isDirected", true)
  })

  it("#addNode", () => {
    this.g.addNode('a').addNode('b')
    expect(this.g.adjList).to.have.all.keys(['a', 'b'])
  })

  it("#addEdge", () => {
    const {g} = this;
    g.addNode('a').addNode('b').addEdge('a', 'b')
    g.addEdge('c', 'd', 2)
    expect(g.adjList).to.eql({
      a: {b: 1},
      b: {a: 1},
      c: {d: 2},
      d: {c: 2}
    })

    const dag = new Graph({isDirected: true})
    dag.addEdge('a', 'b')
    expect(dag.adjList).to.eql({a: {b: 1}, b: {}})
  })

  it("#getNeighbors", () => {
    this.g
      .addEdge('a', 'b')
      .addEdge('a', 'c')
      .addNode('d')

    const ANeighbors = this.g.getNeighbors('a')
    const BNeighbors = this.g.getNeighbors('b')
    const DNeighbors = this.g.getNeighbors('d')

    expect(ANeighbors).to.eql(['b', 'c'])
    expect(BNeighbors).to.eql(['a'])
    expect(DNeighbors).to.eql([])
  })

  it("#getEdge", () => {
    this.g
      .addEdge('a', 'b', 2)
      .addEdge('c', 'd')

    expect(this.g.getWeight('a', 'b')).to.equal(2)
    expect(this.g.getWeight('d', 'c')).to.equal(1)
  })
})

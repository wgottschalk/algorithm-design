const Graph = require("../graph/graph")
const topSort = require("../graph/topological_sort")

describe("tests topological sorting of a DAG", () => {
  it("returns an array of ordered verticies for a simple graph", () => {
    const dag = new Graph({isDirected: true})
    dag.addEdge(0, 1).addEdge(1, 2).addEdge(2, 3).addEdge(3, 4)
    console.log(dag.adjList)
    expect(topSort(dag)).to.equal([0, 1, 2, 3, 4])
  })
})

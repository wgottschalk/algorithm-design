function exists(value) {
  return value !== null || value !== undefined
}
module.exports = class Graph {
  constructor({isDirected} = {isDirected: false}) {
    this.isDirected = isDirected
    this.adjList = Object.create(null)
  }

  addNode(node) {
    if (this.adjList[node]) throw new Error('node already exists')
    this.adjList[node] = Object.create(null)
    return this
  }

  addEdge(nodeA, nodeB, weight = 1){
    if (nodeA === nodeB) throw new Error('must be connected to different verticies')
    if (!exists(nodeA) || !exists(nodeB)) throw new Error('must provide 2 nodes')
    if (!this.adjList[nodeA]) this.addNode(nodeA)
    if (!this.adjList[nodeB]) this.addNode(nodeB)

    this.adjList[nodeA][nodeB] = weight
    if (!this.isDirected) {
      this.adjList[nodeB][nodeA] = weight
    }
    return this
  }

  getNeighbors(node) {
    return Object.keys(this.adjList[node])
  }

  getWeight(nodeA, nodeB) {
    return this.adjList[nodeA][nodeB]
  }
}

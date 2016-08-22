module.exports = class Graph {
  constructor({isDirected} = {isDirected: false}) {
    this.isDirected = isDirected
    this.adjMatrix = Object.create(null)
  }

  addNode(node) {
    if (this.adjMatrix[node]) throw new Error('node already exists')
    this.adjMatrix[node] = Object.create(null)
    return this
  }

  addEdge(nodeA, nodeB, weight = 1){
    if (nodeA === nodeB) throw new Error('must be connected to different verticies')
    if (!nodeA || !nodeB) throw new Error('must give to nodes')
    if (!this.adjMatrix[nodeA]) this.addNode(nodeA)
    if (!this.adjMatrix[nodeB]) this.addNode(nodeB)

    this.adjMatrix[nodeA][nodeB] = weight
    if (!this.isDirected) {
      this.adjMatrix[nodeB][nodeA] = weight
    }
    return this
  }

  getNeighbors(node) {
    return Object.keys(this.adjMatrix[node])
  }

  getWeight(nodeA, nodeB) {
    return this.adjMatrix[nodeA][nodeB]
  }
}

const scheduler = require('../greedy_algorithms/scheduler')
const {inspect} = require('util')

const scheduleA = [
  [0, 5],
  [0, 10],
  [0, 5],
  [5, 10],
  [5, 20],
  [15, 22],
  [15, 22],
  [20, 30],
  [24, 30],
  [24, 30]
]

const scheduleB = [
  [0, 5],
  [0, 10],
  [0, 5],
  [6, 10],
  [6, 20],
  [15, 22],
  [15, 22],
  [21, 30],
  [24, 30],
  [24, 30]
]

describe("it returns the schedule using the minimum amount of resources", () => {
  it("scheduler for equal overlapping values", () => {
    const greedySchedule = scheduler(scheduleA)
    expect(greedySchedule).to.eql({
      1: [ [0, 5],  [5, 10], [15, 22], [24, 30] ],
      2: [ [0,          10], [15, 22], [24, 30] ],
      3: [ [0, 5],  [5, 20],    [20,        30] ],
      4: [],
      5: []
    })
  })

  it("scheduler for non equal overlapping values", () => {
    const greedySchedule = scheduler(scheduleB)

    expect(greedySchedule).to.eql({
      1: [ [0, 5],  [6, 10], [15, 22], [24, 30] ],
      2: [ [0,          10], [15, 22], [24, 30] ],
      3: [ [0, 5],  [6, 20],    [21,        30] ],
      4: [],
      5: []
    })
  })
})

module.exports = function scheduler(schedule) {
  const resource = new Resource(5)
  const prevIntervals = []
  schedule.sort(function(a, b) {
    return a[0] > b[0]
  });

  schedule.forEach(function(currInterval, index, schedule) {
    const interval_j = new Interval(currInterval)
    const labels = resource.getLabels()

    // removing prev intervals if theres an overlap
    prevIntervals.forEach(function(interval_i) {
      // console.log('labels: ', labels)
      // console.log('interval_i: ', interval_i)
      // console.log('interval_j: ', interval_j)
      if (isOverlap(interval_i.val, interval_j.val)) {
        // console.log("overlap: ", interval_i)
        const deleteIndex = labels.indexOf(interval_i.resource  )
        labels[deleteIndex] = null
        // console.log("labels after delete: ", labels)
      }
      // console.log("-------------------------");
    })

    // filtering labels to assign a resource
    const nonExcludedLabels = labels.filter( resource => !!resource )
    if (nonExcludedLabels.length) {
      interval_j.resource = nonExcludedLabels[0]
    } else {
      const nextLabel = resource.getLabels().length + 1
      interval_j.resource = nextLabel
    }
    // console.log("resource assignment: ", interval_j)
    // tracking our resources for the next iteration of the loop
    resource.addInterval(interval_j)
    prevIntervals.push(interval_j)
    // console.log("done \n\n\n")
  })
  return resource.val
}


function isOverlap(intervalA, intervalB) {
  const [startA, finishA] = intervalA;
  const [startB, finishB] = intervalB;
  return (startA <= startB && finishA > startB) ||
         (startB <= startA && finishB > startB)
}

class Interval {
  constructor(interval) {
    this.val = interval;
    this.resource = null;
  }
}

class Resource {
  constructor(numLabels) {
    this.val = {};
    this.labels = [];
    for (var i = 1; i <= numLabels; i++) {
      this.labels.push(i)
    }
    this.labels.forEach( value => this.val[value] = [])
  }

  getLabels() {
    return [...this.labels]
  }

  addInterval(interval) {
    const resourceNum = interval.resource
    if (!this.val[resourceNum]) this.val[resourceNum] = []
    this.val[resourceNum].push(interval.val)
  }
}

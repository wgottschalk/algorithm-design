module.exports = function match (groupA) {
  const matches = new Map();
  while (matches.size !== groupA.length) {
    groupA.forEach( item => {
      if (item.isMatched) return;
      
      const highestMatch = item.popHighestPreference()

      // if the item's first choice is available, then match them!
      if (!highestMatch.isMatched) {
        highestMatch.isMatched = true;
        item.isMatched = true;
        matches.set(highestMatch, item)
      } else {

      // if the first choice actually prefers the current item over its match
      // then break the current match and reassign it.
        const itemMatch = highestMatch.getHighestPreference()
        if (item === itemMatch) {
          const oldItem = matches.get(highestMatch)
          oldItem.isMatched = false;
          item.isMatched = true;
          matches.set(highestMatch, item)
        } else {

      // if the first choice does not prefer the current item, then do nothing
      // on the next iteration of the loop a new highest Mathed will be produced
      // for the item
          return item.isMatched = false;
        }
      }
    })
  }

  return matches;
}

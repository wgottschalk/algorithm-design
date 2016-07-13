class Item {
  constructor(name) {
    this.name = name;
    this.isMatched = false;
    this.preferences = new Map();
    this.matchStrength = 1000
  }

  getPreferences() {
    return this.preferences.entries();
  }

  getHighestPreference() {
    let highest = [null, -Infinity]

    this.preferences.forEach( (value, key) => {
      highest = highest[1] > value
        ? highest
        : [key, value]
    })

    const item = highest[0]
    return item;
  }

  popHighestPreference() {
    const item = this.getHighestPreference()
    this.preferences.delete(item);
    return item;
  }

  over(item){ return this.prefers(item) }
  prefers(item) {
    this.preferences.set(item, this.matchStrength);
    this.matchStrength -= 1;
    return this;
  }

}

module.exports = Item;

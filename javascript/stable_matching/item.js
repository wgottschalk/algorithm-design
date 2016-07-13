class Item {
  constructor(name) {
    this.name = name;
    this.isMatched = false;
    this.preferences = new Map();
    this.matchStrength = 1000
  }

  prefers(item) {
    this.preferences.set(item, this.matchStrength);
    this.matchStrength -= 1;
    return this;
  }
  over(item) {
    this.prefers(item);
    return this;
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
}

module.exports = Item;

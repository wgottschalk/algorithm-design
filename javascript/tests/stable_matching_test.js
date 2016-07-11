const Item = require('../stable_matching/item')
const match = require('../stable_matching/match')

describe("stable matching algorithm tests", function() {
  beforeEach( function() {
    this.alan = new Item("alan");
    this.betty = new Item("betty");
    this.students = [this.alan, this.betty]

    this.google = new Item("google");
    this.facebook = new Item("facebook");
    this.companies = [this.google, this.facebook]
  })

  it("matches alan to google and betty to facebook", function() {
    const {alan, betty, facebook, google} = this

    alan.preferences.set(google, 1)
    alan.preferences.set(facebook, 0)
    betty.preferences.set(facebook, 1)
    betty.preferences.set(google, 0)

    google.preferences.set(alan, 1)
    google.preferences.set(betty, 0)
    facebook.preferences.set(betty, 1)
    facebook.preferences.set(alan, 0)

    const matches = match(this.students);
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })

  it("handles a scenario where there has to be a reassignment", function(){
    const {alan, betty, facebook, google} = this

    alan.preferences.set(google, 1)
    alan.preferences.set(facebook, 0)
    betty.preferences.set(google, 1)
    betty.preferences.set(facebook, 0)

    google.preferences.set(betty, 1)
    google.preferences.set(alan, 0)
    facebook.preferences.set(betty, 1)
    facebook.preferences.set(alan, 0)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(betty)
    expect(matches.get(facebook)).to.be.equal(alan)
  })

  it("handles a scenario where nobody gets their ideal match", function(){
    const {alan, betty, facebook, google} = this

    alan.preferences.set(google, 1)
    alan.preferences.set(facebook, 0)
    betty.preferences.set(facebook, 1)
    betty.preferences.set(google, 0)

    google.preferences.set(betty, 1)
    google.preferences.set(alan, 0)
    facebook.preferences.set(alan, 1)
    facebook.preferences.set(betty, 0)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })

  it("it wont reassign a match when the current match is stronger", function(){
    const {alan, betty, facebook, google} = this

    alan.preferences.set(google, 1)
    alan.preferences.set(facebook, 0)
    betty.preferences.set(google, 1)
    betty.preferences.set(facebook, 0)

    google.preferences.set(alan, 1)
    google.preferences.set(betty, 0)
    facebook.preferences.set(alan, 1)
    facebook.preferences.set(betty, 0)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })
})

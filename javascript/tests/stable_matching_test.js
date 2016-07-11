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

  it('matches alan to google and betty to facebook', function() {
    const {alan, betty, facebook, google} = this

    alan.preferences.set(google, 1)
    alan.preferences.set(facebook, 0)
    betty.preferences.set(facebook, 1)
    betty.preferences.set(google, 0)

    google.preferences.set(alan, 1)
    google.preferences.set(betty, 0)
    facebook.preferences.set(betty, 1)
    facebook.preferences.set(alan, 0)

    const matches = match(this.students, this.companies);
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })
})

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

    alan.prefers(google).over(facebook)
    betty.prefers(facebook).over(google)

    google.prefers(alan).over(betty)
    facebook.prefers(betty).over(alan)

    const matches = match(this.students);
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })

  it("handles a scenario where there has to be a reassignment", function(){
    const {alan, betty, facebook, google} = this

    alan.prefers(google).over(facebook)
    betty.prefers(google).over(facebook)

    google.prefers(betty).over(alan)
    facebook.prefers(betty).over(alan)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(betty)
    expect(matches.get(facebook)).to.be.equal(alan)
  })

  it("handles a scenario where nobody gets their ideal match", function(){
    const {alan, betty, facebook, google} = this

    alan.prefers(google).over(facebook)
    betty.prefers(facebook).over(google)

    google.prefers(betty).over(alan)
    facebook.prefers(alan).over(betty)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })

  it("it wont reassign a match when the current match is stronger", function(){
    const {alan, betty, facebook, google} = this

    alan.prefers(google).over(facebook)
    betty.prefers(google).over(facebook)

    google.prefers(alan).over(betty)
    facebook.prefers(alan).over(betty)

    const matches = match(this.students)
    expect(matches.get(google)).to.be.equal(alan)
    expect(matches.get(facebook)).to.be.equal(betty)
  })
})

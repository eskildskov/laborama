import {should} from 'chai'
import {parseLabResult} from '../index.js'

should()

const regexTests = [
  ['S-Kalium 4,5', {
    "fluid": 'S',
    "analysis": 'Kalium',
    "values": [['4,5', null]]
  }], 
  ['Pt-GFR, estimert 67 - 76 H - 900 H', {
    "fluid":'Pt',
    "analysis":'GFR, estimert',
    "values": [['67', null], ['76', 'H'], ['900', 'H']]
  }], 
  ['Pt-GFR, estimert >90', {
    "fluid":'Pt',
    "analysis":'GFR, estimert',
    "values": [['>90', null]]
  }], 
  ['S-Troponin T 14 - 17 H - 16 H', {
    "fluid":'S',
    "analysis":'Troponin T',
    "values": [['14', null], ['17', 'H'], ['16', 'H']]
  }], 
]

regexTests.forEach(regexTest => {
  describe(`${regexTest[0]}`, () => {
    it('should parse right', () => {
      const parsed = parseLabResult(regexTest[0])
      parsed.should.eql(regexTest[1])
    })
  })
});

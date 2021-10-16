function cleanLabResults(messyLabResultsString) {
  const removePatterns = [/\[[^\]]+\]/g, "B-Differensialtelling Utført", "X-Ekstrarør Mottatt", /, antall/g]

  removePatterns.forEach(pattern => {
    messyLabResultsString = messyLabResultsString.replace(pattern, '')
  })

  messyLabResultsString = messyLabResultsString.replace('GFR, estimert', 'eGFR')

  let labResultsArr = messyLabResultsString.split(";")
  labResultsArr = labResultsArr.map(s => s.trim()).filter(item => item)

  const parser = /^(?<fluid>[^-]+)-(?<analysis>.+?)\s(?<values>(?:\S+(?:\s?[HL])?)(?:(?:\s-\s\S+(?:\s?[HL])?)+|$))/i

  let labResults = labResultsArr.map( s => {
    const resultObj  = {}

    let match = s.match(parser) || []
    let valuesAndDeviations = match.groups.values.split('-')
    const regDev = /([HL])/
  
    resultObj.values = valuesAndDeviations.map(vd => {
      const devMatch = vd.match(regDev)
      const valDev = []
      if (devMatch) {
        vd = vd.replace(regDev, '') 
      }
      valDev[0] = vd.trim()
      valDev[1] = devMatch ? devMatch[0] : null 

      return valDev
    })

    resultObj.fluid = match.groups.fluid
    resultObj.analysis = match.groups.analysis.trim()
    
    return resultObj
  })

  return labResults
}



new Vue({
  el: '#app',
  data: {
    labInput: ''
  },
  computed: {
    labOutput: function () {
      return cleanLabResults(this.labInput)
    }
  }
})
// PS-Kreatinin 86; Pt-GFR, estimert 67; PS-Natrium 141; S-Kalium 4,5; B-Hemoglobin 10,3L; B-Trombocytter 422H; B-Leukocytter 11,2H; B-EVF 0,34L; B-MCV 94; B-Differensialtelling Utført; B-Nøytrofile granulocytter, antall 6,82; B-Lymfocytter, antall 3,41H; B-Monocytter, antall 0,83; B-Eosinofile granulocytter, antall 0,07; B-Basofile granulocytter, antall 0,09; B-SR 37H; S-Troponin T [HMR] 16H; PS-NT-proBNP [HMR] 2912H; S-Glukose 6,7H; PS-TSH [HMR] 5,21H; S-T4, fritt [HMR] 25,6H; PS-CRP 17H;B(aB)-Hb, total 9,8 L; PS-Kreatinin 507 H - 558 H - 546 H - 562 H - 515 H; B-Hemoglobin 9,9 L; B-Trombocytter 394 H; B-Leukocytter 6,2; B-MCV 98 H; B-MCH 30,0; B-MCHC 30,7 L; PS-Kolesterol 2,9; PS-LDL-kolesterol 1,3[Veiledende behandlingsmål for LDL-kolesterol etter europeiske ESC/EAS retningslinjer (2019): Veldig høy risiko ved primær og sekundær forebygging: LDL < 1,4 mmol/L og >=50 % reduksjon av LDL fra utgangsverdi Høy risiko: LDL < 1,8 mmol/L og >=50 % reduksjon av LDL fra utgangsverdi Moderat risiko: LDL < 2,6 mmol/L Lav risiko: LDL < 3,0 mmol/L]; PS-HDL-kolesterol 1,0[Optimal HDL-kolesterol konsentrasjon mtp. risiko for hjerte- og karsykdommer er > 1,0 mmol/L for menn.]; PS-Triglyserid 1,30[Optimalt triglyseridnivå mtp. risiko for hjerte- og karsykdommer er <1,7 mmol/L.]; B-HbA1c 71 H; PS-TSH [HMR] 2,61; S-T4, fritt [HMR] 19,2; X-Ekstrarør Mottatt

function cleanLabResults(messyLabResultsString) {
  const removePatterns = [/\[[^\]]+\]/g, "B-Differensialtelling Utført", "X-Ekstrarør Mottatt", /, antall/g]

  removePatterns.forEach(pattern => {
    messyLabResultsString = messyLabResultsString.replace(pattern, '')
  })

  messyLabResultsString = messyLabResultsString.replace('GFR, estimert', 'eGFR')

  let labResultsArr = messyLabResultsString.split(";")
  labResultsArr = labResultsArr.map(s => s.trim()).filter(item => item)

  const parser = /([^-]+)-(.+)\s(.+)\s*/i

  let labResults = labResultsArr.map( s => {
    const resultObj  = {}

    const lastChar = s.slice(-1)
    if (lastChar == 'L' || lastChar == 'H') {
      resultObj.deviation = lastChar
      s = s.slice(0, -1).trim()
    }



    let match = s.match(parser) || []
    resultObj.fluid = match[1]
    resultObj.analysis = match[2].trim()
    resultObj.value = match[3]

    return resultObj
  })

  let cleanResult = ''

  labResults.forEach(r => {
    cleanResult += `${r.analysis} ${r.value}. `
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
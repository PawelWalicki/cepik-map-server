const express = require('express')
const cors = require('cors')
const app = express()
const d02 = require('./data_base/02')
const d04 = require('./data_base/04')
const d06 = require('./data_base/06')
const d08 = require('./data_base/08')
const d10 = require('./data_base/10')
const d12 = require('./data_base/12')
const d14 = require('./data_base/14')
const d16 = require('./data_base/16')
const d18 = require('./data_base/18')
const d20 = require('./data_base/20')
const d22 = require('./data_base/22')
const d24 = require('./data_base/24')
const d26 = require('./data_base/26')
const d28 = require('./data_base/28')
const d30 = require('./data_base/30')
const d32 = require('./data_base/32')
app.use(cors())
const port = 3030

const getFallbackDataForVoivodeship = (code) => {
  switch(code) {
    case '02':
      return d02
      break;
    case '04':
      return d04
      break;
    case'06':
      return d06 
      break;
    case'08':
      return d08
      break;
    case'10':
      return d10
      break;
    case'12':
      return d12
      break;
    case'14':
      return d14
      break;
    case'16':
      return d16
      break;
    case'18':
      return d18
      break;
    case'20':
      return d20
      break;
    case'22':
      return d22
      break;
    case'24':
      return d24
      break;
    case'26':
      return d26
      break;
    case'28':
      return d28
      break;
    case'30':
      return d30
      break;
    case'32':
      return d32
    break
  }
}

const fetchWithTimeout = (url, timeout) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timeout. Fallback!")), timeout)
    )
  ])
}

app.get('/api/cepik', async (req, res) => {
    const {voivodeship, from , to} = req.query
    const url = `https://api.cepik.gov.pl/pojazdy?wojewodztwo=${voivodeship}&data-od=${from}&data-do=${to}`
    console.log(url)
    let data = {}
    try {
      const response = await fetchWithTimeout(url, 5000)
      data = await response.json()
      res.json(data)
    } catch (e) { // Fallback
      console.log("Error: ", e)
      res.json(getFallbackDataForVoivodeship(voivodeship))
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// React -> server || <-> baza danych

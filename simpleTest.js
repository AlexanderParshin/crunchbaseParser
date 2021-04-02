const crunchbaseParser = require('./crunchbaseParser')

// Simple use case
// const URL = 'wunderfund.co'
const URL = 'coingenius.ai'
// const URL = 'lendflo.com'
// const URL = 'lendflo11111.com'

const simpleTest = async (url) => {
  const companyInfo = await crunchbaseParser(url)
  const objJSON = await JSON.stringify(companyInfo)
  await console.log(objJSON)
}

simpleTest(URL)
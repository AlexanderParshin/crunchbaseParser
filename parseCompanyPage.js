
const scrollDown = require('./scrollDown')

const isSamenessUrl = (url, urlParse) => {
  const urlSlash = `${url}/`
  const urlWWW = `www.${url}`
  const urlWWWSlash = `www.${url}/`

  if ((url === urlParse) | 
    (urlSlash === urlParse) | 
    (urlWWW === urlParse) | 
    (urlWWWSlash === urlParse)) return true
  return false
}

const parseCompany = async (page, companyUrl) => {

  // url
  const urlPageCompany = await page.url()

  // totalFundingAmount
  const totalFundingAmountSel = `a.component--field-formatter.field-type-money.link-primary.ng-star-inserted`
  await page.waitForSelector(totalFundingAmountSel)
  const totalFundingAmount = await page.$eval(totalFundingAmountSel, el => el.innerText)

  // cbRank
  const cbRankSel = `a.component--field-formatter.field-type-integer.link-primary.ng-star-inserted`
  await page.waitForSelector(cbRankSel)
  const cbRank = await page.$eval(cbRankSel, el => el.innerText)

  // foundedDate
  const foundedDateSel = `span.component--field-formatter.field-type-date_precision.ng-star-inserted`
  await scrollDown(page, foundedDateSel)
  await page.waitForSelector(foundedDateSel)
  const foundedDate = await page.$eval(foundedDateSel, el => el.innerText)

  // numberEmployees
  const numberEmployeesSel = `a.component--field-formatter.field-type-enum.link-accent.ng-star-inserted`
  await scrollDown(page, numberEmployeesSel)
  await page.waitForSelector(numberEmployeesSel)
  const arrElementEmployees = await page.$$eval(numberEmployeesSel, elements => elements.map((el) => el.innerText))
  const numberEmployees = arrElementEmployees[1]

  // urlCompanyParsed
  const urlCompanyParsedSel = `a.component--field-formatter.field-type-link.layout-row.layout-align-start-end.link-accent.ng-star-inserted`
  await scrollDown(page, urlCompanyParsedSel)
  await page.waitForSelector(urlCompanyParsedSel)
  const urlCompanyParsed = await page.$eval(urlCompanyParsedSel, el => el.innerText)

  // if url do not match
  if (!isSamenessUrl(companyUrl, urlCompanyParsed)) return null

  const company = {
    crunchbaseLink: urlPageCompany,
    totalFundingAmount: totalFundingAmount,
    cbRankP: cbRank,
    foundedDate: foundedDate,
    numberEmployees: numberEmployees,
    // urlCompany: urlCompanyParsed
  }

  return company

}










module.exports = parseCompany
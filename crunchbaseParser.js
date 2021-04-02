const puppeteer = require('puppeteer')
const foundPage = require('./foundPage')
const parseCompany = require('./parseCompanyPage')

const OPT = {
    headless: true,
    args: [
      //'--no-sandbox', 
      //'--disable-setuid-sandbox', 
      //'--user-data-dir',
      '--proxy-server="direct://"',
      '--proxy-bypass-list=*'
    ]
  };

const parseCompanyInfo = async (newPage, companyUrl) => {
  const page = await foundPage(newPage, companyUrl)
  if (page) {
    const companyInfo = await parseCompany(page, companyUrl)
    return companyInfo
  }
  return null
}

const crunchbaseParser = (async (companyUrl) => {
  const browser = await puppeteer.launch(OPT)
  const newPage = await browser.newPage()
  await newPage.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36')
  const companyInfo = await parseCompanyInfo(newPage, companyUrl)
  await browser.close()
  return companyInfo
})

module.exports = crunchbaseParser
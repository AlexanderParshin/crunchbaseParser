
const foundPage = async (page, companyName) => {
  try {
    await page.goto('https://www.crunchbase.com/')
    let searchPageIsLoaded = false
    let width = 260
    while (!searchPageIsLoaded) {
      // input company name
      try {
        const inputSel = '#mat-input-0'
        const inputField = await page.waitForSelector(inputSel, { timeout: 5000 })
        if (inputField) {
          await page.click(inputSel)
          await page.type(inputSel, companyName, {delay: 100}) 
          await page.waitFor(2000)
        }
      } catch (error) {}
      // captcha
      try {
        const captchaSel = '#px-captcha'
        const captcha = await page.waitForSelector(captchaSel, { timeout: 6000 })
        if (captcha) {
          await page.mouse.click(width, 200, { delay: 5000 })
          if (width < 300) {
            width += 10
          }
        }
      } catch (error) {}
      // no result found
      try {
        const noResultFoundSel = 'div.cb-padding-large-bottom.cb-font-size-large'
        const noResultFound = await page.waitForSelector(noResultFoundSel, { timeout: 1000 })
        if (noResultFound) {
          return null
        }
      } catch (err) {}
      // Go to pageCompany
      try {
        const pageFoundSel = '.row-name'
        const pageCompanyLink = await page.waitForSelector(pageFoundSel, { timeout: 1000 })
        if (pageCompanyLink) {
          await page.click(pageFoundSel)
          searchPageIsLoaded = true 
        }
      } catch (err) {}
    }

  return page
  } catch (err) {
    console.error(err)
  }
}

module.exports = foundPage



const scrollDown = async (page, selector) => {
  await page.$eval(selector, e => {
    e.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  })
}

module.exports = scrollDown
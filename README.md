# Crunchbase.com parser


# How to use

```
const crunchbaseParser = require('./crunchbaseParser')
const urlCompany = 'coingenius.ai'
const info = crunchbaseParser(urlCompany)
```

# Example of the result

```
{"crunchbaseLink":"https://www.crunchbase.com/organization/coingenius",
  "totalFundingAmount":"$200K",
  "cbRankP":"35,072",
  "foundedDate":"Aug 8, 2018",
  "numberEmployees":"1-10"
}
```

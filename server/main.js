const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/asfd', (req, res) => {
    res.send('Yeah its there');
})

app.get('/getZodiacs/:birthdate', async (req, res) => {
  console.log(req.params.birthdate);
  
  await axios.get(`https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${req.params.birthdate}`)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const selector = $('.r1');
    console.log(selector.html());
    res.send(selector.html());
  })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const { default: axios } = require('axios');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cheerio = require("cheerio");
const pretty = require("pretty");

// (async function example() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://www.astrosofa.com/horoscope/ascendant');
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//    // await driver.quit();
//   }
// })();

async function getSign(date) {
  let response = await axios.get(`https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${date}`)
  .then(res("done"));

  console.log(response);
  console.log("?");
  
}


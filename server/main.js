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
  const sendBack = {zodiac: "", chinese: "", lifePath: "",
  imageUrl: ''};
  
  await axios.get(`https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${req.params.birthdate}`)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const selector = $('.r1');
    sendBack.zodiac = selector.text();
    
  })
  await axios.get(`https://miniwebtool.com/what-is-my-chinese-zodiac-sign/?birthday=${req.params.birthdate}`)
  .then((response) =>{
    const $ = cheerio.load(response.data);
    const selector = $('.r1');
    
    sendBack.chinese = selector.text();
  })

  await axios.get(`https://miniwebtool.com/life-path-number-calculator/?birthday=${req.params.birthdate}`)
  .then((response) =>{
    const $ = cheerio.load(response.data);
    const selector = $('.r1');
    
    sendBack.lifePath = selector.text();

  });

  // FORMAT THIS
  await axios.get(`https://imagine.gsfc.nasa.gov/hst_bday/${convertDateForNasa(req.params.birthdate)}`)
  .then((response) =>{
    console.log(`https://imagine.gsfc.nasa.gov/hst_bday/${convertDateForNasa(req.params.birthdate)}`);
    const $ = cheerio.load(response.data);
    const selector = $('.addthis_inline_share_toolbox').attr('data-media');
    sendBack.imageUrl = selector;
    //convertDateForNasa(req.params.birthdate);
  });
  
  
  
  res.send(sendBack);

})

function convertDateForNasa(date){
  let month = date.split('-')[1];
  let monthLong;
  if(month == '1'){
    monthLong = 'january';
  }else if(month == '2'){
    monthLong = 'february';
  }else if(month == '3'){
    monthLong = 'march';
  }else if(month == '4'){
    monthLong = 'april';
  }else if(month == '5'){
    monthLong = 'may';
  }else if(month == '6'){
    monthLong = 'june';
  }else if(month == '7'){
    monthLong = 'july';
  }else if(month == '8'){
    monthLong == 'august';
  }else if(month == '9'){
    monthLong = 'september';
  }else if(month == '10'){
    monthLong = 'october';
  }else if(month == '11'){
    monthLong = 'november';
  }else if(month == '12'){
    monthLong = 'december';
  }else{
    console.log('err');
  }
  return monthLong + '-' + date.split('-')[2];
  
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const { default: axios } = require('axios');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cheerio = require("cheerio");
const pretty = require("pretty");
const { type } = require('@testing-library/user-event/dist/type')

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


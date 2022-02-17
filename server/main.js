const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const { getMonth } = require('date-fns')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/asfd', (req, res) => {
    res.send('Yeah its there');
})



app.get('/getZodiacs/:birthdate', async (req, res) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const sendBack = {zodiac: "", chinese: "", lifePath: "",
  imageUrl: ''};
 

  try{
    await axios.get(`https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${req.params.birthdate}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const selector = $('.r1');
      sendBack.zodiac = selector.text();
      
    })
  }catch(err){
    console.log(err);
  }
  
  try{
    await axios.get(`https://miniwebtool.com/what-is-my-chinese-zodiac-sign/?birthday=${req.params.birthdate}`)
  .then((response) =>{
    const $ = cheerio.load(response.data);
    const selector = $('.r1');
    
    sendBack.chinese = selector.text();
  })
  }catch(err){
    console.log(err);
  }
  
  try{
    await axios.get(`https://miniwebtool.com/life-path-number-calculator/?birthday=${req.params.birthdate}`)
    .then((response) =>{
      const $ = cheerio.load(response.data);
      const selector = $('.r1');
      
      sendBack.lifePath = selector.text();
  
    });
  }catch(err){
    console.log(err);
  }

  try{
        // FORMAT THIS
  await axios.get(`https://imagine.gsfc.nasa.gov/hst_bday/${convertDateForNasa(req.params.birthdate)}`)
  .then((response) =>{
    console.log(`https://imagine.gsfc.nasa.gov/hst_bday/${convertDateForNasa(req.params.birthdate)}`);
    const $ = cheerio.load(response.data);
    const selector = $('.addthis_inline_share_toolbox').attr('data-media');
    sendBack.imageUrl = selector;
    //convertDateForNasa(req.params.birthdate);
  });
  }catch(err){
    console.log(err);
  }

  try{
    await axios.get('http://www.webexhibits.org/calendars/moon.html?day=19&month=8&year=1994')
    .then((response) =>{
      const $ = cheerio.load(response.data);
      console.log($.html());
    })
  }catch(err){
    console.log(err);
  }

  
  try{
    await axios.get(`http://www.webexhibits.org/calendars/moon.html?day=${dateDay(req.params.birthdate)}&month=${dateMonth(req.params.birthdate)}&year=${dateYear(req.params.birthdate)}`)
    .then((response) =>{
      const $ = cheerio.load(response.data);
      console.log($.html());
    })
  }catch(err){
    console.log(err);
  }
   
  
  res.send(sendBack);

})

function dateMonth(date){
  return date.split('-')[1];
}
function dateDay(date){
  return date.split('-')[0];
}
function dateYear(date){
  return date.split('-')[2];
}

function convertDateForNasa(date){
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  console.log(date);
  let month = date.split('-')[1];
  console.log(month);
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
  console.log(monthLong + '-' + date.split('-')[2]);
  return months[month] + '-' + date.split('-')[2];
  
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


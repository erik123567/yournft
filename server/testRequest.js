
const { default: axios } = require('axios');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cheerio = require("cheerio");
const pretty = require("pretty");
const { type } = require('@testing-library/user-event/dist/type')

async function test(){

  try{
    await axios.get('http://www.webexhibits.org/calendars/moon.html?day=19&month=8&year=1994')
    .then((response) =>{
      const $ = cheerio.load(response.data);
      const selector = $('#moonphase .moonphase img').attr('src');
      console.log(selector);
    })
  }catch(err){
    console.log(err);
  }
}

test();
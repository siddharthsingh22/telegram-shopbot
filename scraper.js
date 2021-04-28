const Nightmare = require('nightmare')
const nightmare = Nightmare({show : true})
const bot = require('./bot');

async function findLink(barCode, chatId){
    try{
        let link =  await nightmare
       .goto('https://www.amazon.in/')
        .type('#twotabsearchtextbox', barCode)
        .click('#nav-search-submit-button')
        .wait('.s-search-results')
        .evaluate(() => document.querySelector('.a-link-normal').href)
        .click('.a-size-base-plus')  // this selector needs improvement 
      //   .end()
        .catch(error => {
            bot.sendMessage(chatId, "Error in searching the product on amazon.in\nPlease try again")
            console.error('XXXX Amazon product search failed ${error} XXXX')
        })
    }catch(err){
        throw(err);
    }  
}

module.exports = {
    findLink
};






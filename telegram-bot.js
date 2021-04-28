const token = '1705722172:AAFiKPj7GUrK-5brPGo91eds0pU79qh5QXc';
const scanner = require('./scanner');
const axios = require('axios');
const fileDownload = require('./file-download');
const bot = require('./bot');
const downloadImage = require('./file-download');
const path = require('path');

let localFilePath = '';

bot.on('message',(msg, match) => {
  let chatId = msg.chat.id;
    if(match.type === 'photo' && msg.caption === '/bc'){
      return axios.get(`https://api.telegram.org/bot${token}/getFile?file_id=${msg.photo[0].file_id}`)
      .then((response) => {
        const imageUrl = `https://api.telegram.org/file/bot${token}/${response.data.result.file_path}`;
        const fileName = path.basename(imageUrl);
        localFilePath = path.resolve(__dirname, 'images', fileName)
        return fileDownload.downloadImage(imageUrl, localFilePath, chatId)
      })
      .then(() => {
        scanner.scan(localFilePath, chatId);
      })
      .catch((err) => {
        console.log(err);
      })
    }
});


const axios = require('axios');
const bot = require('./bot');
const fs = require('fs');


async function downloadImage (imageUrl, localFilePath, chatId){
    try {
      const response = await axios({
        method: 'GET',
        url: imageUrl,
        responseType: 'stream',
      });
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', async () => {
        console.log('==== Successfully downloaded image! ====');
        try{
            bot.sendMessage(chatId, "Image downloaded successfuly \nProcessing barcode.......")
            
        }catch(err){
            throw new Error(err);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
}

module.exports = {
    downloadImage
}
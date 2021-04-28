var Quagga = require('quagga').default;
const scraper = require('./scraper.js');
const bot = require('./bot');


function scan(fileName, chatId){
    Quagga.decodeSingle({
        src: fileName,
        numOfWorkers: 0, 
        inputStream: {
            type : "ImageStream",
            size: 800 
        },
        locate : true,
        decoder: {
            readers:["code_128_reader", 
                    "ean_reader", 
                    "ean_8_reader", 
                    "code_39_reader", 
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader",
                    "2of5_reader",
                    "code_93_reader"
                    ] 
        },
    }, function(result) {
        if(result && result.codeResult){
            bot.sendMessage(chatId, `Barcode identified successfully\nCode value - ${result.codeResult.code}`)
            .then(() => {
                return bot.sendMessage(chatId, "\nAnalysing the deatils of your product.........")
            })
            .then(() => {
                return bot.sendMessage(chatId, `\nYou can also view the result at amazon.in/s?k=${result.codeResult.code}`)
            })
            .then(() => {
                scraper.findLink(result.codeResult.code, chatId);
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            bot.sendMessage(chatId, "Error in identifying the barcode. Some tips for getting better result are \n\n1) Ensure that barcode is clearly visible\n2) Crop the image so that barcode is at the center and occupies atleast 70% of the area\n3) Ensure that the barcode is facing upwards")
            .then(() => {
                return bot.sendPhoto(chatId, 'correct_sample.jpg', {caption: 'Use this barcode image as an example'})
            })
            .catch((err) => {
                console.log(err)
            });
            console.log("XXXX Error in identifying the barcode XXXX");
        }
    }) 
}
module.exports = {
    scan
}


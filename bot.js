const TelegramBot = require('node-telegram-bot-api');
const token = '1705722172:AAFiKPj7GUrK-5brPGo91eds0pU79qh5QXc';
const bot = new TelegramBot(token, {polling: true});

module.exports = bot;
const tgApi = require('node-telegram-bot-api')

const {gameFrom, gameAgain} = require('./options.js')

const token = '5409060764:AAERexkUqJx6hQKmT3hGwhc9XRAcM8nsAwE'

const bot = new tgApi(token, { polling: true })

const chats = {

}

const startGame = async (chatId) => {
    const randomGuess = Math.floor(Math.random() * 10)
    chats[chatId] = randomGuess
    bot.sendMessage(chatId, "Guess number in range [0 - 9]", gameForm)
}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start bot'},
        {command: '/help', description: 'Show all commands'},
        {command: '/info', description: 'Show info'},
        {command: '/game', description: 'Guess number in 3 attempts'}
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/1.webp')
            return bot.sendMessage(chatId, `You're welcome! It's my firts bot!`)
        }
        if (text === 'help') {

        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Sorry, ${msg.from.first_name}. This topic has not been ready yet :(`)
        }

         if (text === '/game') {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, `Uncknown command! Try it again.`)
    })

     bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        console.log( data)
        console.log( chats[chatId])

        if (data === '/again') {
            return startGame(chatId)
        }

        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations! You have won! The number is ${chats[chatId]}`, gameAgain)
        }

        return bot.sendMessage(chatId, `Unfortunately you have not guessed! The number is ${chats[chatId]}`, gameAgain)


    })
}

start()
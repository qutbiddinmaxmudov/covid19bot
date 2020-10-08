require('dotenv').config()
const { Telegraf } = require('telegraf'),
api = require('covid19-api'),
bot = new Telegraf(process.env.BOT_TOKEN),
markup = require('telegraf/markup')

bot.start((ctx) => ctx.reply('Hello '+ctx.message.from.first_name + `! 
This bot created for getting information about coronavirus in the world!`,markup.keyboard([
    ['russia','uzbekistan']
])
.resize()
.extra()
))
bot.help((ctx) => ctx.reply('Write the name of country and i will send you statistic information about coronavirus!' + `Or you can choose one of this countries: 
${require('./counties')}`))
bot.on('text', async (ctx)=>{
    let data = {}
    try {
        data = await api.getReportsByCountries(ctx.message.text)
        ctx.reply(`
Country: ${data[0][0].country};
Cases:  ${data[0][0].cases};
Deaths: ${data[0][0].deaths};
Recovered: ${data[0][0].recovered};
        `)
    } catch {
        ctx.reply(`Error please try again!
If you don't know what to do write /help
        `)
    }
})
bot.launch()
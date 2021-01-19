const db = require("quick.db");
const Discord = require('discord.js');
module.exports = {
    name: "yardım",
    description: "sesfsfscfsfsfig",
    run: async (client, message, args) => {
let eklenti = new Discord.MessageEmbed()  
.setAuthor(`PYTHONIC`)//pythonic x zyvok (owned by plasmic)
.setColor('#FA7813')//pythonic x zyvok (owned by plasmic)
.addField(`__PYTHONIC__`,`:city_sunset: Bu bot Pythonic ve Zyvok tarafından yapılmıştır`, true)
.addField(`__Komutlar__`,`:beers: \`p!antiraid\` | Antiraidi ayarla\n:tools: \`p!beyazliste\` | Beyazlisteyi ayarla `)
  .setImage(`https://cdn.discordapp.com/attachments/754581545158836275/773252937928671272/output-onlinepngtools_3_1.png`)
 message.channel.send(eklenti) 
  }};
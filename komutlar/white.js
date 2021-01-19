const db = require("quick.db");
const Discord = require('discord.js');
module.exports = {
    name: "beyazliste",
    description: "sesfsaaaaafscfsfsfig",
    run: async (client, message, args) => {
let eklenti = new Discord.MessageEmbed()  
.setAuthor(`PYTHONIC`)
.setColor('#FA7813')
.setDescription(`Hadi beyazliste kuralım!`)  
.addField(`__Beyazliste listesi__`,`🌪 Beyazlisteye eklediğin kişilerin listesini atar! \`p!liste\` `,true)
.addField(`__Beyazliste ekle/sil__`,`🤹 \`p!ekle\` | birine beyazliste ver \n🎭 \`p!sil\` | Birinden beyaz liste al`)
  .setImage(`https://cdn.discordapp.com/attachments/754581545158836275/773252937928671272/output-onlinepngtools_3_1.png`)
 message.channel.send(eklenti) 
  }};
const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = {
    name: "liste",
    description: "Shows Whitelist-list",
    run: async (client, message, args) => {
        let guild = message.guild.iconURL()
   
          let wordlist = new Discord.MessageEmbed()
         .setFooter(message.author.username, message.author.displayAvatarURL)
            .setImage(`https://cdn.discordapp.com/attachments/754581545158836275/773252937928671272/output-onlinepngtools_3_1.png`)
         let database = db.get(`trustedusers_${message.guild.id}`)//pythonic x zyvok (owned by plasmic)
         if(database && database.length) {
            let array =[]
              database.forEach(m => {
              array.push(`<@${m.user}>`)//pythonic x zyvok (owned by plasmic)
            })
         
            wordlist.addField('** Beyazliste **', `${array.join("\n")}`)
        }
        return message.channel.send(wordlist);
}}

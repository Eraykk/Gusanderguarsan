const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
module.exports = {
    name: "sil",
    description: "set guild anit raid config",
    run: async (client, message, args) => {

if(message.author.id === message.guild.ownerID) {
    
        let user = message.mentions.users.first()//pythonic x zyvok (owned by plasmic)
        if(!user) {
            return message.channel.send(`Birini etiketleyin`)
        }
        const guildicon = message.guild.iconURL();
        let database = db.get(`trustedusers_${message.guild.id}`)//pythonic x zyvok (owned by plasmic)
        if(database) {
            let data = database.find(x => x.user === user.id)
          let unabletofind = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())//pythonic x zyvok (owned by plasmic)
          .setDescription(`
          ** Kişi buluunamadı** 
          `)
          .setFooter(message.guild.name, guildicon)
          
            if(!data) return message.channel.send(unabletofind)
          
            let value = database.indexOf(data)
            delete database[value]
          
            var filter = database.filter(x => {
              return x != null && x != ''
            })
          
            db.set(`trustedusers_${message.guild.id}`, filter)
          let deleted = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setDescription(`
          **Bir kişiden, ${user} beyazliste alındı** 
          `)
          .setFooter(message.guild.name, guildicon)
          
            return message.channel.send(deleted)
          
        } else {          
     message.channel.send(`Böyle bir kullanıcı yok`)
        }}
    
message.channel.send(`Sadece sunucu sahibi kullanabilir!`)
}}
 

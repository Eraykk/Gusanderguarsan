const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token , status , dpunishment } = yaml.load(fs.readFileSync("./antiraid.yml"));

module.exports = {
    name: "antiraid",  //pythonic x zyvok (youtube.com/pythonic)
    description: "aaaaaaaaaaaaaaaaaa",
    run: async (client, message, args) => {
    let cmd = args[0];
   if(message.author.id === message.guild.ownerID) {    
    
    const guildicon = message.guild.iconURL();//pythonic x zyvok (youtube.com/pythonic)
    if(!cmd) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag,message.author.displayAvatarURL())//pythonic x zyvok (owned by plasmic)
        .setColor('#FA7813')
          .setImage(`https://cdn.discordapp.com/attachments/754581545158836275/773252937928671272/output-onlinepngtools_3_1.png`)//pythonic x zyvok (owned by plasmic)
        .setDescription(`
        » ** Role Protection**
        ${mainprefix}antiraid rolkurmalimiti <sayı>
       ${mainprefix}antiraid rolsilmelimiti <sayı>  
 
        » ** Channel Protection**
         ${mainprefix}antiraid kanalkurmalimiti <sayı>
         ${mainprefix}antiraid kanalsilmelimiti <sayı>

       » ** Members Protection**
         ${mainprefix}antiraid banlimit <sayı>
         ${mainprefix}antiraid kicklimit <sayı>
    
        » ** Others Protections**
        ${mainprefix}antiraid logkanal <#kanal>
        ${mainprefix}antiraid kullanici-sil @user
        ${mainprefix}antiraid liste
        ${mainprefix}antiraid ceza <roleremove/kick/ban>

        » ** Whitelisting**
        ${mainprefix}whitelist
     `)
 .setFooter(message.guild.name, guildicon)
  return message.channel.send(embed);
}
 if(cmd.toLowerCase() === 'liste') {
   let rolelimit = db.get(`rolecreatelimit_${message.guild.id}`) 
   if(rolelimit === null) rolelimit = "kapalı :x:"
   let roledelete = db.get(`roledeletelimits_${message.guild.id}`) 
   if(roledelete === null) roledelete = "kapalı :x:"
   let logschannel = db.get(`acitonslogs_${message.guild.id}`)
   let logschannel2 = db.get(`acitonslogs_${message.guild.id}`)
   if(logschannel === null) logschannel = "kapalı :x:"
   else logschannel = `<#${logschannel2}>`
   let channelcreatelimits = db.get(`channelcreatelimits_${message.guild.id}`)
   if(channelcreatelimits === null) channelcreatelimits = "kapalı :x:"
   let channeldeletelimits = db.get(`channeldeletelimits_${message.guild.id}`)
   if(channeldeletelimits === null) channeldeletelimits = "kapalı :x:"
   let banlimits = db.get(`banlimits_${message.guild.id}`)
  if(banlimits === null) banlimits = "kapalı :x:"
  let kicklimits = db.get(`kicklimits_${message.guild.id}`)
  if(kicklimits === null) kicklimits = "kapalı :x:"
  let punishment = db.get(`punishment_${message.guild.id}`)
  if(dpunishment === null) dpunishment = "None"
  if(punishment === null) punishment = dpunishment
   let listeembebd = new Discord.MessageEmbed()

      .setAuthor(message.author.username, message.author.displayAvatarURL())
     .setImage(`https://cdn.discordapp.com/attachments/754581545158836275/773252937928671272/output-onlinepngtools_3_1.png`)
   .setColor('#FA7813')
   .setTitle(`⚙️ ${message.guild.name} antiraid   `)
   .addField('rol oluşturma limiti', rolelimit, true)
   .addField('rol silme limiti', roledelete, true)
   .addField(`Loglar kanalı`, logschannel, true)
   .addField(`kanal oluşturma limiti`, channelcreatelimits, true)
   .addField(`kanal silme limiti`, channeldeletelimits, true)
   .addField(`Ban limiti`, banlimits, true)
   .addField(`Kick limiti`, kicklimits, true)
   .addField(`ceza`, punishment, true)
    .setFooter(message.guild.name, guildicon)
    return message.channel.send(listeembebd);
 }
 if(cmd.toLowerCase() === 'rolkurmalimiti') {
let rolecreate = args.slice(1).join(" ");
if(!rolecreate) {
 let missing = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.displayAvatarURL())
 .setDescription(`** an invaild usage**\nantiraid rolkurmalimiti (sayı)`)
 .setFooter(message.guild.name, guildicon)

  return message.channel.send(missing);
}
if(isNaN(rolecreate)) {
  let missing = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid rolkurmalimiti (sayı)`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(missing);
}
db.set(`rolecreatelimit_${message.guild.id}`, rolecreate)
let done = new Discord.MessageEmbed() 
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setColor('#FA7813')
.setDescription(`Done SetRoleCreation limits Has Been Set To ${rolecreate} ✅`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done);
}
if(cmd.toLowerCase() === 'rolsilmelimiti') {
  let roledelete = args.slice(1).join(" ");
  if(!roledelete) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
   .setDescription(`** an invaild usage**\nantiraid rolsilmelimiti (sayı)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(roledelete)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid rolsilmelimiti (sayı)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`roledeletelimits_${message.guild.id}`, roledelete)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Done SetRoleDelete limits Has Been Set To ${roledelete} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
  
}
if(cmd.toLowerCase() === 'logkanal') {
  let logs = message.mentions.channels.first();
  if(!logs) {
  let logsembed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Please Mention an vaild channel`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(logsembed);
}
logs.send(`** Anit-Raid Logs Room **`)
db.set(`acitonslogs_${message.guild.id}`, logs.id)
let done = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setColor('#FA7813')
.setDescription(`well done aciton-logs channel has been set to ${logs}`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done)
}
if(cmd.toLowerCase() === 'kanalkurmalimiti') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
   .setDescription(`** an invaild usage**\nantiraid kanalkurmalimiti (sayı)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid kanalkurmalimiti (sayı)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channelcreatelimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Done Channel Create limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'kanalsilmelimiti') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
   .setDescription(`** an invaild usage**\nantiraid kanalsilmelimiti (sayı)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid kanalsilmelimiti (sayı)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channeldeletelimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Done Channel Delete limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'banlimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
   .setDescription(`** an invaild usage**\nantiraid setbanlimit (sayı)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid setbanlimit (sayı)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`banlimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Done Ban limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'kicklimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
   .setDescription(`** an invaild usage**\nantiraid setbanlimit (sayı)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nantiraid setkicklimit (sayı)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`kicklimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor('#FA7813')
  .setDescription(`Done Kick limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'kullanici-sil') {
  let user = message.mentions.users.first()
if(!user) {
  return message.channel.send(`** Mention User **`);
}
db.delete(`executer_${message.guild.id}_${user.id}_kicklimits`) 
db.delete(`executer_${message.guild.id}_${user.id}_banlimits`)
db.delete(`executer_${message.guild.id}_${user.id}_rolecreate`)
db.delete(`executer_${message.guild.id}_${user.id}_roledelete`)
db.delete(`executer_${message.guild.id}_${user.id}_channelcreate`)
db.delete(`executer_${message.guild.id}_${user.id}_channeldelete`)
return message.channel.send(`Reseted User limits`);
}
 if(cmd.toLowerCase() === 'ceza') {
   let argsp = args[1];
   let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#FA7813')
    .setDescription(`
    Punishment List:
    **kick**,**roleremove**,**ban**
    `)
    .setFooter(message.guild.name, guildicon)

   if(!argsp) return message.channel.send(embed)

   if(argsp.toLowerCase() === 'kick') {
let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
.setColor('#FA7813')
    .setDescription(`Punishment Was Changed to **Kick**`)
    .setFooter(message.guild.name, guildicon)
db.set(`punishment_${message.guild.id}`, 'kick')
return message.channel.send(embed)
   }
   if(argsp.toLowerCase() === 'ban') {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`Punishment Was Changed to **ban**`)
    .setFooter(message.guild.name, guildicon)
db.set(`punishment_${message.guild.id}`, 'ban')
return message.channel.send(embed)
   }
  if(argsp.toLowerCase() === 'roleremove') {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor('#FA7813')
    .setDescription(`Punishment Was Changed to **roleremove**`)
    .setFooter(message.guild.name, guildicon)
db.set(`punishment_${message.guild.id}`, 'roleremove')
return message.channel.send(embed)

  } 
   
    }
  return;
  }
  return message.channel.send(new Discord.MessageEmbed().setTitle(`Only server owners can use`))
}}

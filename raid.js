console.log("\nLoading...")
console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token , status , dpunishment } = yaml.load(fs.readFileSync("./antiraid.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const express = require('express');
const http = require('http');
const { join } = require('path');
const { readdirSync } = require('fs');
client.commands= new Discord.Collection();
client.login(token)

  

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var sesese = "2";

const log = message => {
    console.log(`${message}`);
};

client.on('ready', () => {
    client.user.setActivity(status, { type: 'PLAYING' });
    console.clear();

  console.log('\n\x1b[32m%s\x1b[0m', `          $[BILGI]: Giriş yapıldı: ${client.user.tag}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[BILGI]: Prefix: ${mainprefix}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[BILGI]: v12 antiraid/güvenlik botu`);  

   console.log('\x1b[31m%s\x1b[0m', `            $[BILGI]: YOUTUBE.COM/PYTHONIC`);  

 });

 const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "komutlar", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           
      let premiumcheck = db.get(`blacklisted`)

      if(premiumcheck && premiumcheck.find(find => find.kid == message.author.id)) return message.channel.send(`you cant use the bot your blacklisted!!`);
 
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
   
           } catch (error){
               console.error(error);
           }
        }
   })
  

     
   client.on("roleCreate", async rol => {
    const user = await rol.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${rol.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('It is Trusted User');
    } 
    db.add(`executer_${rol.guild.id}_${rol.guild.id}_rolecreate`, 1)

    let author = db.get(`executer_${rol.guild.id}_${entry.id}_rolecreate`)
  let limiti = db.get(`rolecreatelimt_${rol.guild.id}`)
if(limiti === null) {
    return console.log('shit');
}
let logs = db.get(`acitonslogs_${rol.guild.id}`)

    if(author > limiti) {
      let punishment = db.get(`punishment_${rol.guild.id}`)
      if(punishment === null) punishment = dpunishment
    if(punishment === 'roleremove') {
    rol.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
    rol.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
    db.silme(`executer_${rol.guild.id}_${entry.id}_rolecreate`)
    console.log('trying to remove user roles..')
    let logsembed = new Discord.MessageEmbed()
    .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol silme limiti]`)
    return client.channels.cache.get(logs).send(logsembed);
    })
    }
    if(punishment === 'ban') {
    rol.guild.üyeler.cache.get(entry.id).ban()
    db.silme(`executer_${rol.guild.id}_${entry.id}_rolecreate`)
    console.log('trying to ban the user..')
    let logsembed = new Discord.MessageEmbed()
    .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol oluşturma limiti]`)
    return client.channels.cache.get(logs).send(logsembed);
    }
    if(punishment === 'kick') {
    rol.guild.üyeler.cache.get(entry.id).kick()
    db.silme(`executer_${rol.guild.id}_${entry.id}_rolecreate`)
    console.log('trying to kick the user..')
    let logsembed = new Discord.MessageEmbed()
    .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol oluşturma limiti]`)
    return client.channels.cache.get(logs).send(logsembed);
    }
    return;
    }
       let warn = db.get(`executer_${rol.guild.id}_${entry.id}_rolecreate`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} kişisi Creating Roles.. [${warn || 0}/${author || 0}]`)
       client.channels.cache.get(logs).send(logsembed)

});

client.on("roleDelete", async rol => {
    const user = await rol.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    db.add(`executer_${rol.guild.id}_${entry.id}_roledelete`, 1)

    let author = db.get(`executer_${rol.guild.id}_${entry.id}_roledelete`)
  let limiti = db.get(`roledeletelimt_${rol.guild.id}`)
if(limiti === null) {
    return console.log('shit');
}
let trustedusers = db.get(`trustedusers_${rol.guild.id}`)
if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
return console.log('It is Trusted User');
}
let logs = db.get(`acitonslogs_${rol.guild.id}`)

if(author > limiti) {
  let punishment = db.get(`punishment_${rol.guild.id}`)
  if(punishment === null) punishment = dpunishment
if(punishment === 'roleremove') {
rol.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
rol.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
db.silme(`executer_${rol.guild.id}_${entry.id}_roledelete`)
console.log('trying to remove user roles..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
})
}
if(punishment === 'ban') {
rol.guild.üyeler.cache.get(entry.id).ban()
db.silme(`executer_${rol.guild.id}_${entry.id}_roledelete`)
console.log('trying to ban the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
if(punishment === 'kick') {
rol.guild.üyeler.cache.get(entry.id).kick()
db.silme(`executer_${rol.guild.id}_${entry.id}_roledelete`)
console.log('trying to kick the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ rol silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
return;
       }
       let warn = db.get(`executer_${rol.guild.id}_${entry.id}_roledelete`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} kişisi siliyor Roles.. [${warn || 0}/${author || 0}]`)
       client.channels.cache.get(logs).send(logsembed)
});        

client.on("channelCreate", async channel => {
    const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('It is Trusted User');
    }
    db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1)
    let author = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
  let limiti = db.get(`channelcreatelimts_${channel.guild.id}`)
if(limiti === null) {
    return console.log('shit');
}
let logs = db.get(`acitonslogs_${channel.guild.id}`)

if(author > limiti) {
  let punishment = db.get(`punishment_${channel.guild.id}`)
  if(punishment === null) punishment = dpunishment
if(punishment === 'roleremove') {
channel.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
channel.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
db.silme(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
console.log('trying to remove user roles..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel oluşturma limiti]`)
return client.channels.cache.get(logs).send(logsembed);
})
}
if(punishment === 'ban') {
channel.guild.üyeler.cache.get(entry.id).ban()
db.silme(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
console.log('trying to ban the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel oluşturma limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
if(punishment === 'kick') {
channel.guild.üyeler.cache.get(entry.id).kick()
db.silme(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
console.log('trying to kick the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel oluşturma limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
return;
       }
       let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} kişisi Creating channel.. [${warn || 0}/${author || 0}]`)
       client.channels.cache.get(logs).send(logsembed)
});        

client.on("channelDelete", async channel => {
     const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('It is Trusted User');
    }
    db.add(`executer_${channel.guild.id}_${entry.id}_channeldelete`, 1)

    let author = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
  let limiti = db.get(`channeldeletelimts_${channel.guild.id}`)
if(limiti === null) {
    return console.log('shit');
}

let logs = db.get(`acitonslogs_${channel.guild.id}`)
    if(author > limiti) {
      let punishment = db.get(`punishment_${channel.guild.id}`)
      if(punishment === null) punishment = dpunishment
if(punishment === 'roleremove') {
channel.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
channel.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
db.silme(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
console.log('trying to remove user roles..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
})
}
if(punishment === 'ban') {
channel.guild.üyeler.cache.get(entry.id).ban()
db.silme(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
console.log('trying to ban the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
if(punishment === 'kick') {
channel.guild.üyeler.cache.get(entry.id).kick()
db.silme(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
console.log('trying to kick the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Channel silme limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
return;
}
       let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} kişisi siliyor channel.. [${warn || 0}/${author || 0}]`)
       client.channels.cache.get(logs).send(logsembed)
});    
client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
        })
        .then(audit => audit.entries.first());
        const entry = entry2.executor;
        let trustedusers = db.get(`trustedusers_${member.guild.id}`)
        if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return console.log('It is Trusted User');
        }
        db.add(`executer_${member.guild.id}_${entry.id}_kicklimts`, 1)

        let author = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
        let limiti = db.get(`kicklimts_${member.guild.id}`)
      if(limiti === null) {
          return console.log('shit');
      }

      let logs = db.get(`acitonslogs_${member.guild.id}`)
          if(author > limiti) {
            let punishment = db.get(`punishment_${member.guild.id}`)
            if(punishment === null) punishment = dpunishment
if(punishment === 'roleremove') {
member.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
member.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
db.silme(`executer_${member.guild.id}_${entry.id}_kicklimts`)
console.log('trying to remove user roles..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Kick üyeler limiti]`)
return client.channels.cache.get(logs).send(logsembed);
})
}
if(punishment === 'ban') {
member.guild.üyeler.cache.get(entry.id).ban()
db.silme(`executer_${member.guild.id}_${entry.id}_kicklimts`)
console.log('trying to ban the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Kick üyeler limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
if(punishment === 'kick') {
member.guild.üyeler.cache.get(entry.id).kick()
db.silme(`executer_${member.guild.id}_${entry.id}_kicklimts`)
console.log('trying to kick the user..')
let logsembed = new Discord.MessageEmbed()
.setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Kick üyeler limiti]`)
return client.channels.cache.get(logs).send(logsembed);
}
 
return;
             }
             let warn = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
             let logsembed = new Discord.MessageEmbed()
             .setTitle(`${entry.tag} kişisi Kicking üyeler.. [${warn || 0}/${author || 0}]`)
             client.channels.cache.get(logs).send(logsembed)
      
    }
    })
    client.on("guildMemberRemove", async member => {
        const entry1 = await member.guild
        .fetchAuditLogs()
        .then(audit => audit.entries.first());
      if (entry1.action === "MEMBER_BAN_ADD") {
        const entry2 = await member.guild
          .fetchAuditLogs({
            type: "MEMBER_BAN_ADD"
            })
            .then(audit => audit.entries.first());
            const entry = entry2.executor;
            let trustedusers = db.get(`trustedusers_${member.guild.id}`)
            if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
            return console.log('It is Trusted User');
            }
            db.add(`executer_${member.guild.id}_${entry.id}_banlimts`, 1)

            let author = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
            let limiti = db.get(`banlimts_${member.guild.id}`)
          if(limiti === null) {
              return console.log('shit');
          }

          let logs = db.get(`acitonslogs_${member.guild.id}`)
              if(author > limiti) {
                let punishment = db.get(`punishment_${member.guild.id}`)
                if(punishment === null) punishment = dpunishment
if(punishment === 'roleremove') {
  member.guild.üyeler.cache.get(entry.id).roles.cache.map(userroles => {
  member.guild.üyeler.cache.get(entry.id).roles.remove(userroles.id)
   db.silme(`executer_${member.guild.id}_${entry.id}_banlimts`)
  console.log('trying to remove user roles..')
   let logsembed = new Discord.MessageEmbed()
  .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Banning üyeler limiti]`)
 return client.channels.cache.get(logs).send(logsembed);
  })
}
if(punishment === 'ban') {
  member.guild.üyeler.cache.get(entry.id).ban()
  db.silme(`executer_${member.guild.id}_${entry.id}_banlimts`)
  console.log('trying to ban the user..')
   let logsembed = new Discord.MessageEmbed()
  .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Banning üyeler limiti]`)
 return client.channels.cache.get(logs).send(logsembed);
 }
 if(punishment === 'kick') {
  member.guild.üyeler.cache.get(entry.id).kick()
  db.silme(`executer_${member.guild.id}_${entry.id}_banlimts`)
  console.log('trying to kick the user..')
   let logsembed = new Discord.MessageEmbed()
  .setTitle(`${entry.tag} kişisi sunucuyu patlatmaya çalışıyordu ama yakalandı! [ Banning üyeler limiti]`)
 return client.channels.cache.get(logs).send(logsembed);
 }
 return;
              }
                 let warn = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
                 let logsembed = new Discord.MessageEmbed()
                 .setTitle(`${entry.tag} kişisi Banning üyeler.. [${warn || 0}/${author || 0}]`)
                 client.channels.cache.get(logs).send(logsembed)
          
        }
        })
    
 

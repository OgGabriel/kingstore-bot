const { Discord, Client, MessageEmbed } = require("discord.js")
const bot = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })
const prefix = '.'

var footer = '| 2020 © King Store - Todos os direitos reservados.'
var cor = '#7EC0EE'

bot.once('ready', () => {
    console.log('King Store BOT online!')
})

//easter eggs & misc
bot.on('message', async message => {
    if (message.author.bot) return

    if (message.content.includes('vyxt')) return message.react('🐎').then( () => message.react('🇨') .then( () => message.react('🇦') ) .then( () => message.react('🇱') ) .then( () => message.react('🇴') ))
    if (message.content.includes('kp')) return message.react('🙀').then( () => message.react('🇱') .then( () => message.react('🇮') ) .then( () => message.react('🇳') ) .then( () => message.react('🇩') ) .then( () => message.react('🇴') ))
    if (message.content.includes('loja')) return message.reply('a melhor loja de todas é a King Store!')

    //censura
    if (message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.')){
        if (!message.member.roles.cache.get('774347864070684693')) return message.delete() && message.channel.send(new MessageEmbed()
        .setDescription('Você não tem permissão para divulgar neste servidor!')
        .setColor('RED')
        )
    }
})

bot.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    function msg(msg) {
        message.channel.send(new MessageEmbed().setDescription(msg).setColor(cor))
    }
    function semperm() {
        message.channel.send(new MessageEmbed().setDescription('Você não tem permissão para isso!').setColor("RED"))
        message.react('👎')
    }
    function icmd(uso) {
        message.channel.send('Comando incorreto! Modo de uso: ' + uso)
        message.react('😔')
    }
    function clogs(msg) {
        bot.guilds.cache.get('773749887057395772').channels.cache.get('774374027220877342').send(new MessageEmbed().setDescription(msg).setColor(cor).setFooter(footer))
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()

    const comandos = ['ping', 'cmd-list', 'author', 'lock', 'unlock', 'kick', 'ban', 'bc', 'cls', 'clear', 'setup-ticket', 'setup-auth', 'produtos']

    //ping
    if (cmd == 'ping') {
        msg('Pong!')
        message.react('👌')
    }
    //teste
    else if (cmd == 'teste') {
        message.channel.send(new MessageEmbed().setDescription('teste').setFooter(footer))
    }
    //cmd-list
    else if (cmd == 'cmd-list'){
        if (!message.member.hasPermission("ADMINISTRATOR")) return semperm()
        message.channel.send( new MessageEmbed() .setTitle('📑 Lista de comandos:') .setDescription('``' + comandos.join('`` , ``') + '``.'))
    }
    //author
    else if (cmd == 'author') {
        msg('Author: <@286652790326034432>')
        message.react('😎')
    }
    else if (cmd == 'produtos') {
        msg('Para saber mais informações sobre nossos produtos, acesse <#773749962613325844>')
        message.react('💲')
    }
    //lock
    else if (cmd == "lock") {
        if (!message.member.hasPermission("BAN_MEMBERS")) return semperm()
        message.channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false })
        let lock_embed = new MessageEmbed()
            .setTitle("** :x: CHAT BLOQUEADO :x: **")
            .addField("Esse chat foi bloqueado por:", message.author)
            .setColor(cor)
            .setFooter(footer)
        message.channel.send(lock_embed)
        message.react('🔒')
    }
    //unlock
    else if (cmd == "unlock") {
        if (!message.member.hasPermission("BAN_MEMBERS")) return semperm()
        message.channel.createOverwrite(message.guild.id, { SEND_MESSAGES: true })
        let lock_embed = new MessageEmbed()
            .setTitle("** :x: CHAT DESBLOQUEADO :x: **")
            .addField("Esse chat foi desbloqueado por:", message.author)
            .setColor(cor)
            .setFooter(footer)
        message.channel.send(lock_embed)
        message.react('🔓')
    }
    //kick
    else if (cmd == "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(sem_permisssao)
        } else {
            if (args.length <= 0) return icmd("``.kick @Usuário <motivo>``")
            let mencionado = message.mentions.members.first()
            if (!mencionado) return message.channel.send(nao_encontrado)
            let motivo = args.slice(1).join(' ')
            if (!motivo) motivo = "Motivo não especificado!"
            if (!mencionado.bannable) return message.channel.send("Eu não tenho permissão para expulsar essa pessoa!")

            let kickmember_embed = new MessageEmbed()
                .setColor(`#FF0000`)
                //.setThumbnail(mencionado.user.displayAvatarURL())
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                .setAuthor(`Expulso por ` + message.author.tag, message.author.avatarURL())
                .setTitle("**Expulsão do servidor!**")
                .setDescription("**Usuário expulso:** " + mencionado.user.tag + "\n**Autor da expulsão:** " + message.member.displayName + "\n**Motivo da expulsão:** " + motivo)
                .setTimestamp()

            message.channel.send(kickmember_embed)
            mencionado.kick({ reason: motivo })
            message.react('👍')
            mencionado.send(kickmember_embed)
            clogs(`<@${message.author.id}> kickou ${mencionado}`)
        }
    }
    //ban
    else if (cmd == "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(sem_permisssao)
        } else {
            if (args.length <= 0) return icmd("``.ban @Usuário <motivo>``")
            let mencionado = message.mentions.members.first()
            if (!mencionado) return message.channel.send(nao_encontrado)
            let motivo = args.slice(1).join(' ')
            if (!motivo) motivo = "Motivo não especificado!"
            if (!mencionado.bannable) return message.channel.send("Eu não tenho permissão para banir essa pessoa!")

            let banmember_embed = new MessageEmbed()
                .setColor(`#FF0000`)
                //.setThumbnail(mencionado.user.displayAvatarURL())
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                .setAuthor(`Banido por ` + message.author.tag, message.author.avatarURL())
                .setTitle("**Banimento do servidor!**")
                .setDescription("**Usuário banido:** " + mencionado.user.tag + "\n**Autor do ban:** " + message.member.displayName + "\n**Motivo do ban:** " + motivo)
                .setTimestamp()

            message.channel.send(banmember_embed)
            mencionado.ban({ reason: motivo })
            message.react('👍')
            mencionado.send(banmember_embed)
            clogs(`<@${message.author.id}> baniu ${mencionado}`)
        }
    }
    //ticket-setup
    else if (cmd == "setup-ticket") {
        let channel = message.mentions.channels.first()
        if (!channel) return message.reply("Mencione um canal para definir o chat de tickets.")

        let sent = await channel.send(new MessageEmbed()
            .setTitle("⚙ King Store - Ticket Manager")
            .setDescription("Clique no emoji [🎟] para abrir um ticket")
            .setFooter(footer)
            .setColor(cor)
        )

        sent.react("🎟")

        message.react('👍')
        message.reply("Sistema de ticket setado no canal " + channel.name)
        console.log("Sistema de ticket setado no canal " + channel.name + "!")
    }
    //auth-setup
    else if (cmd == "setup-auth") {
        let channel = message.mentions.channels.first()
        if (!channel) return message.reply("Mencione um canal para definir o chat de autenticação.")

        let sent = await channel.send(new MessageEmbed()
            .setTitle("⚙ King Store - Authentication Manager")
            .setDescription("Clique no emoji [🛒] para registrar-se no servidor e conseguir acesso aos demais canais!")
            .setFooter(footer)
            .setColor(cor)
        )

        sent.react("🛒")

        message.react('👍')
        message.reply("Sistema de autenticação setado no canal " + channel.name)
        console.log("Sistema de autenticação setado no canal " + channel.name + "!")
    }
    //cls
    else if (cmd == 'cls') {
        message.channel.bulkDelete(100)
        await message.reply('Chat limpo! 😎')
    }
    //clear
    else if (cmd == "clear") {
        if (!message.member.hasPermission("BAN_MEMBERS")) semperm()
        if (args.length <= 0) return icmd('``.clear <quantia>``')

        const quantia = args[0]

        if (isNaN(quantia)) return message.reply("não foi possível deletar ``" + quantia + "`` mensagens!")
        if (quantia > 100) {
            return message.channel.send("O número de mensagens deve ser menor ou igual a 100!")

        }
        message.channel.bulkDelete(quantia)
        await message.reply("foram deletadas " + quantia + " mensagens. 🙀")
        clogs(`<@${message.author.id}> apagou ${quantia} mensagens`)
        console.log(message.author.username + " apagou " + quantia + " mensagens")
    }
    //broadcast
    else if (cmd == "bc") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return semperm()
    let canal = message.mentions.channels.first()
    if (!canal) return icmd("``.bc <canal>``")
    const arr = [];
    const filter = m => m.author.id === message.author.id;
    const questions = ["Qual é o título? 🤔", "Qual é a mensagem? 🤔", "Envie qualquer mensagem para confirmação 😳"]
    msg("Qual é o título?")
    let i = 0
    const collector = message.channel.createMessageCollector(filter)
    collector.on("collect", m => {
        if (i < questions.length - 1){
            arr.push(String(m.content))
            i++
            msg(questions[i])
        } else {
            collector.stop()
        }
    })
    collector.on('end', () => {
        msg('Enviando mensagem em 5 segundos! 🥵')
        setTimeout(() => {
            canal.send(new MessageEmbed() .setTitle(arr[0]) .setDescription(arr[1]) .setColor(cor))
        }, 5000);
    })
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    if (user.partial) await user.fetch()
    if (reaction.partial) await reaction.fetch()
    if (reaction.message.partial) await reaction.message.fetch()

    if (user.bot) return

    let ticketid = bot.channels.cache.get('775141695963922463')
    let tag_num = user.tag.replace('#', '-').trim(user.username)

    if (reaction.message.channel.id == ticketid && reaction.emoji.name === '🎟') {

        if (reaction.message.guild.channels.cache.filter(c => c.name.includes(tag_num))) return
        reaction.message.guild.channels.create(`ticket-${tag_num}`, {
            permissionOverwrites: [
                {
                    id: reaction.message.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: "774347864070684693",
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }
            ],
            type: 'text',
            parent: '775138142105501706'
        }).then(async channel => {
            channel.setTopic(user.id)
            let mssg = await channel.send(`<@${user.id}>`, new MessageEmbed().setTitle("Ticket aberto!").setDescription(`Aguarde pacientemente por uma resposta!`).setColor(purple))
            mssg.react('🔒')
            clogs(`${user.username} abriu um ticket`)
            console.log(`${user.username} abriu um ticket`)
        })
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    if (user.partial) await user.fetch()
    if (reaction.partial) await reaction.fetch()
    if (reaction.message.partial) await reaction.message.fetch()

    if (user.bot) return
    
    if (reaction.message.channel.id == '775545486211285014'){
        if (reaction.emoji.name === '🛒'){
        reaction.message.guild.members.cache.get(user.id).roles.add('773751736434819123')
        }
    }

    if (reaction.message.guild.channels.cache.find(c => c.name.includes('ticket-'))) {
    if (reaction.emoji.name === '🔒') {
        reaction.message.channel.send(new MessageEmbed().setTitle(" :no_entry: **TICKET FECHADO** :no_entry:").setDescription("Esse ticket foi fechado! \nDeletenado canal em 5 segundos...").setFooter(footer))
        
        setTimeout(() => {
            reaction.message.channel.delete()
        }, 5000);
      }
    }
})
  

bot.login('token')
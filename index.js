const Discord = require('discord.js')
const client = new Discord.Client({
  disableMentions: 'everyone'
})

client.once('ready', () => console.log('READY'))

client.on('message', message => {
  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g
  let result

  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups

    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.cleanContent, [ ...targetMessage.attachments.values(), ...targetMessage.embeds ]))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      )
  }
})

client.login()
  .catch(console.error)

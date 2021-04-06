const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some((r) => r.name === "〖⚠️〗Team di Moderazione〖⚠️〗")){
        return message.channel.send(':x: Devi avere il ruolo 〖⚠️〗Team di Moderazione〖⚠️〗!');
    }

    if(!args[0]){
        return message.channel.send(':x: Devi specificare un valido ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Impossibile trovare un giveaway `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway ricaricato!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway con ID ${giveaway.messageID} non è finito.`)){
            message.channel.send('Questo giveaway non è finito!');
        } else {
            console.error(e);
            message.channel.send('Errore!');
        }
    });

};

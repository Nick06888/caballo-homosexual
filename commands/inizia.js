const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some((r) => r.name === "〖⚠️〗Team di Moderazione〖⚠️〗")){
        return message.channel.send(':x: Devi avere il ruolo 〖⚠️〗Team di Moderazione〖⚠️〗!.');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: Devi menzionare un canale valido!');
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Devi menzionare una durata valida!');
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Devi specificare un numero di vincitori!');
    }

 
    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(':x: Devi specificare il premio!');
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY FINITO** 🎉🎉",
            timeRemaining: "Tempo Rimasto: **{duration}**!",
            inviteToParticipate: "Regisci con 🎉 per partecipare!",
            winMessage: "Congratulationi, {winners}! hai vinto **{prize}**!",
            embedFooter: "Creato Da Calabrese",
            noWinner: "Giveaway cancellato, pochi partecipanti.",
            hostedBy: "Fatto Da: {user}",
            winners: "vincitore(i)",
            endedAt: "Finito a",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway iniziato in ${giveawayChannel}!`);

};

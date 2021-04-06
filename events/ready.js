module.exports = (client) => {
    console.log(`Pronto in ${client.user.tag} Guardando ${client.channels.cache.size} canali in ${client.guilds.cache.size} server, per un totale di ${client.users.cache.size} motherfuckers.`);
};
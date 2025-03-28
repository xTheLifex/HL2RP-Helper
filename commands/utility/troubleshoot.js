const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('troubleshoot')
        .setDescription('Replies with troubleshooting information'),
    async execute(interaction) {
        await interaction.reply('Please make sure you have CSS (Counter-Strike: Source) mounted, as well as "allow all custom content" enabled in your GMod settings. ' +
            'Half-Life 2 recently got its anniversary update, which includes\n' +
            '- Bug Fixes\n' +
            '- Improved Lighting and HDR\n' +
            '- Episodic content');
    },
};
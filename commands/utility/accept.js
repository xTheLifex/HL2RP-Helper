const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accept')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDescription('Formats your message into an accepted format')
        .addStringOption(option =>
            option.setName('message')
                .setDescription("Your approval message.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('remarks')
                .setDescription("Your remarks for this approval.")
                .setRequired(false)
        )
    ,
    async execute(interaction) {
        const msg = interaction.options.getString('message');
        const remarks = interaction.options.getString('remarks');
        const author = interaction.user
        const embeds = [];

        if (msg) {
            embeds.push({
                "description": "# Accepted\n\n**Your submission has been reviewed and approved by our staff team.**\n\n" +
                    "They've left the following comment:\n\n```" + msg + "```",
                "color": 65290,
                "thumbnail": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1024px-Eo_circle_green_checkmark.svg.png"
                },
                "footer": {
                    "text": `Approved by ${author.tag}`,
                    "icon_url": author.avatarURL()
                },
                "timestamp": new Date().toISOString()
            });
        } else {
            embeds.push({
                "description": "# Accepted\n\n**Your submission has been reviewed and approved by our staff team.**",
                "color": 65290,
                "thumbnail": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1024px-Eo_circle_green_checkmark.svg.png"
                },
                "footer": {
                    "text": `Approved by ${author.tag}`,
                    "icon_url": author.avatarURL()
                },
                "timestamp": new Date().toISOString()
            });
        }

        if (remarks) {
            embeds.push({
                "title": "Remarks",
                "description": "**The staff team has left remarks on this approval:**\n\n```" + remarks + "```",
                "color": 16747008,
                "author": {
                    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Simple_Attention.svg/600px-Simple_Attention.svg.png",
                    "name": "Remarks"
                }
            });
        }

        await interaction.reply({
            content: "",
            embeds: embeds
        });
    }
};
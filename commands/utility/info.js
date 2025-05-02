const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with server information'),
    async execute(interaction) {
        await interaction.reply({
            "content": "",
            "tts": false,
            "embeds": [
                {
                    "id": 652627557,
                    "title": "📌  StormRP | Important Resources",
                    "description": "**🔗 Important Links**\n📜 [**Server Rules**](https://docs.google.com/document/d/12WUgtuJlfgtR73Ad_gtU-nGzxL7lhXdYmxP8Ih0oKh4/edit?usp=sharing)\n📦 [**Content Pack**](https://steamcommunity.com/sharedfiles/filedetails/?id=3463630502)\n\n**🧭 Storm Resources**\n🗺️ [**Lore Map**](https://www.google.com/maps/d/u/0/viewer?mid=1vjaaTab8qzj1xJpKAe-196X706oRLN0&ll=20.86456613314774%2C0&z=2)\n🏙️ [**Sector & City Index**](https://docs.google.com/document/d/1OqFYzDkjocGhB1piKyP8WjDKs-kpj9HtpUeijF-d_ro/edit?usp=sharing)\n⚙️ [**Combine Technology Guide**](https://docs.google.com/document/d/1OU4sfPfyt2QH9VnAzPGe4CAEtDWxyD6OaU6kzxc2sjA/edit?usp=sharing)\n🕒 [**Storm Timeline**](https://docs.google.com/document/d/1m7K4zdDR9XxypJscLLPGPbMkAS_fqwTtpdfGvWqIy0s/edit?usp=sharing)\n🧬 [**Character Authorization Form**](https://docs.google.com/document/d/1kY0TY3GctbDxde9rzPbRO1AR_9JRXtESyuFTuFtZPmY/edit?usp=sharing)",
                    "color": 15409955,
                    "fields": []
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        });
    },
};
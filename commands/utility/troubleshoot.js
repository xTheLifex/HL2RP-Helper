const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('troubleshoot')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDescription('Replies with troubleshooting information'),
    async execute(interaction) {
        await interaction.reply({
            "content": "",
            "tts": false,
            "embeds": [
                {
                    "id": 420123302,
                    "description": "# Having problems with your game? \n## **We can offer some advice!**\n\n### General Advice\n- Try verifying game integrity on steam and relaunch the game and see if the issue persists.\n- Try following [this guide](https://steamcommunity.com/sharedfiles/filedetails/?id=336428778) to clear up your Garry's Mod.\n- Try following [this guide](https://help.steampowered.com/en/faqs/view/6AD7-820D-8BE5-E51F) to delete your **Steam** download cache\n\n### Bugs!\n**If it's an urgent exploit please ping staff or reach out to us in DMs!**\nOtherwise, you can report bugs to us at #suggestions-bugs. \n\n### Low FPS!\n**You can try doing the following things (in order) to increase FPS:**\n1. Change your branch to **x86-64 - Chromium**\n2. Lower your graphic settings in Garry's Mod.\n3. Enabling **Multicore Rendering**\n4. Disable **Fullscreen Optimizations** \n\n*The above steps are also available in more detail on this [this guide](https://steamcommunity.com/sharedfiles/filedetails/?id=1911349076).*\n\n### Purple Textures and Errors!\n1. Make sure you are subscribed to the [**Undetermined's server content**](https://steamcommunity.com/sharedfiles/filedetails?id=3571243780).\n2. Make sure you don't have any addons that could be causing **conflict** with the server content.\n3. Make sure you've restarted Garry's Mod after **subscribing** to the addons and **enabling them**.",
                    "color": 10524984,
                    "thumbnail": {
                        "url": "https://media.discordapp.net/attachments/1224523237241651291/1357480629205209208/Screenshot_1.png?ex=67f05bda&is=67ef0a5a&hm=67c8f5e59e41e263db8f0ccbdaede03789d6d11cc298351eded86cd284164d1c&=&format=webp&quality=lossless&width=814&height=919"
                    },
                    "fields": []
                },
                {
                    "id": 317130679,
                    "description": "## Still having issues?\n**Please share your computer specs with us if your problem is related to performance. Here's the steps to do so:**\n1. If you're in windows, press Windows Key + R to open up the Run panel\n2. Type in \"dxdiag\"\n3. You can refuse the digitally signed drivers window and wait for the panel to load.\n4. Attach a screenshot of your computer specs. \n5. Make sure to also send the \"System\" tab as well as the \"Display\" tab.\n\nYou can also ping our developer <@183702048007651329> here for his two tokens on your issue.",
                    "color": 10324752,
                    "fields": []
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        });
    },
};
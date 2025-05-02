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
                    "description": "# **Storm | Troubleshooting & Help Guide**\n## Running into issues? Here's what to try first.\n\n### ⚙️ General Fixes\n\n* Make sure you have **Counter-Strike: Source (CSS)** **mounted** and have *“Allow all custom content”* **enabled** in your GMod settings.\n  You can get CSS on [Steam](https://store.steampowered.com/app/240/CounterStrike_Source/), or download the content [here](https://gmodcontent.com/).\n\n* Verify the integrity of Garry’s Mod via Steam and restart the game afterwards.\n\n* Clean up your GMod using [this cleanup guide](https://steamcommunity.com/sharedfiles/filedetails/?id=336428778).\n\n* Clear your Steam download cache by following [this official Steam guide](https://help.steampowered.com/en/faqs/view/6AD7-820D-8BE5-E51F).\n\n\n### 🐞 Found a Bug or Exploit?\n\nIf it’s **critical** (like an exploit), **contact staff or DM us immediately**.\nFor non-urgent issues, report them in **#suggestions-and-bugs** on our Discord.\n\n### 🖥️ FPS Issues?\n\n**Try these steps (in order):**\n\n1. Switch to the **x86-64 - Chromium** branch (can boost performance, but might cause crashes).\n2. Drop your GMod graphics settings.\n3. Turn on **Multicore Rendering** (advanced video settings).\n4. Disable **Fullscreen Optimizations** in the game's .exe properties.\n\nFull breakdown available in [this performance guide](https://steamcommunity.com/sharedfiles/filedetails/?id=1911349076).\n\n### 🟪 Purple Textures or Errors?\n\n1. Subscribe to [**Storm’s content pack**](https://steamcommunity.com/sharedfiles/filedetails/?id=3463630502) on the Workshop.\n2. Avoid addon conflicts — disable unnecessary or conflicting content.\n3. Restart GMod after subscribing and enabling new addons.\n4. Confirm that **Counter-Strike: Source** is fully mounted. [Steam](https://store.steampowered.com/app/240/CounterStrike_Source/) | [Free Content](https://gmodcontent.com/)\n",
                    "color": 10565688,
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/attachments/1030974319058239529/1367926321996628028/Storm_Logo_transparent.png?ex=68165c2a&is=68150aaa&hm=13bfdfa5ca7f8a877ff9810fe87cb1bbe70feed032684f0e1c6fffd5a8691b70&"
                    },
                    "fields": []
                },
                {
                    "id": 317130679,
                    "description": "## Still having issues?\n**Please share your computer specs with us if your problem is related to performance. Here's the steps to do so:**\n1. If you're in windows, press Windows Key + R to open up the Run panel\n2. Type in \"dxdiag\"\n3. You can refuse the digitally signed drivers window and wait for the panel to load.\n4. Attach a screenshot of your computer specs. \n5. Make sure to also send the \"System\" tab as well as the \"Display\" tab.\n\nYou can also ping our developer <@183702048007651329> for his two cents on your issue.",
                    "color": 10358800,
                    "fields": []
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        });
    },
};
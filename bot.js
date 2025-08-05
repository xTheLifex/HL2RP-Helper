// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlagsBitField } = require('discord.js');
const config = require('./config.json')
const { GameDig } = require('gamedig');
const pc = require('picocolors')
const VERSION = 1;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Functions
const Log = function (text) { console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] ${text}`)}
const Err = function (text) {Log(pc.red("[ERROR] ") + text)}
const Warn = function (text) {Log(pc.yellowBright("[WARN] ") + pc.bgBlack(text))}
const Info = function (text) {Log(pc.blue("[INFO] ") + text)}
const OK = function (header, text) {Log(pc.green(`[${header}] `) + text)}


// Import commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(pc.green("[LOGIN]") + ` Ready! Logged in as ${readyClient.user.tag}`);
});

// Command handling
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
});


const TICK_TIME = 8000;
const SCOREBOARD_DATA_PATH = "./scoreboardMessage.json"; // File to store message ID
let lastPlayerCount = 0;
async function fetchWithTimeout(promise, timeout = 5000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout))
    ]);
}

client.on(Events.ClientReady, async function () {
    OK("BOT", "Automatic tick started. Bot version " + VERSION);
    await HandleStatUpdater();
});

client.on(Events.MessageCreate, async message => {
    if (message.channelId !== config.mediaChannelID) return;
    if (message.author.bot) return;

    const hasAttachment = message.attachments.size > 0;
    const hasEmbed = message.embeds.some(embed => embed.image || embed.video);

    if (!hasEmbed && !hasAttachment)
    {
        await message.delete().catch((reason) => {
            Err(reason)
        });
        //
        // try {
        //     var response = await message.reply({
        //         "content": "",
        //         "embeds": [
        //             {
        //                 "id": 298008172,
        //                 "description": "# This is a media-only channel! \nPlease upload an image or video of your own artwork.",
        //                 "fields": [],
        //                 "thumbnail": {
        //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/512px-Cross_red_circle.svg.png?20181021160952"
        //                 },
        //                 "color": 16711680
        //             }
        //         ],
        //     });
        //     await message.delete().catch(() => {});
        //
        //     setTimeout(() => { response.delete().catch(() => {}); }, 10000);
        // } catch (err) {
        //     console.error("Error handling non-media message:", err);
        // }
    }
})

async function HandleStatUpdater()
{
    let channel;
    try {
        channel = await fetchWithTimeout(client.channels.fetch(config.playerCountChannelID));
    } catch (error) {
        Err("Channel fetch failed: " + error.message);
        return;
    }

    let messageID = null;

    // Load message ID from file if it exists
    if (fs.existsSync(SCOREBOARD_DATA_PATH)) {
        try {
            messageID = JSON.parse(fs.readFileSync(SCOREBOARD_DATA_PATH)).messageID;
        } catch (error) {
            Err("Failed to read scoreboardMessage.json");
        }
    }

    // Fetch the scoreboard message if it exists
    let scoreboardMessage = null;
    if (messageID) {
        try {
            scoreboardMessage = await fetchWithTimeout(channel.messages.fetch(messageID));
        } catch {
            scoreboardMessage = null;
        }
    }

    // If message doesn't exist (was deleted), create a new one
    if (!scoreboardMessage) {
        try {
            scoreboardMessage = await fetchWithTimeout(channel.send("# Loading Player Count..."));
            fs.writeFileSync(SCOREBOARD_DATA_PATH, JSON.stringify({ messageID: scoreboardMessage.id }));
        } catch (error) {
            Err("Failed to send message: " + error.message);
            return;
        }
    }

    // Start interval to update scoreboard
    setInterval(async function () {
        const state = await GameDig.query({
            type: "garrysmod",
            host: config.playerCountServerIP,
            port: config.playerCountServerPort
        }).catch(() => {
            Err("Server is offline or fetch has failed.");
            return null;
        });

        if (!state) return;

        // if (state.numplayers !== lastPlayerCount)
        // {
        //     try {
        //         const newName = `🌎-Players-${state.numplayers}`;
        //         await fetchWithTimeout(channel.setName(newName));
        //         lastPlayerCount = state.numplayers;
        //     } catch (error) {
        //         Err("Failed to update channel name: " + error.message);
        //     }
        // }

        let scoreboardText = `# ${state.name.replace()} \n` +
            `**Current Map: ** \`\`${state.map || "Unknown"}\`\`\n` +
            `**Players:** \`\`${state.numplayers} Online\`\`\n` +
            `**IP:** \`\`${state.connect}\`\`\n` +
            `**Ping:** \`\`${state.ping}\`\`\n\n` +
            `Current Players:\n`;
        scoreboardText += state.players.map(player => `- ${player.name || "*(Connecting...)*"}`).join("\n");

        try {
            await fetchWithTimeout(scoreboardMessage.edit(scoreboardText));
            Info("Message Edited.");
        } catch (error) {
            Err("Failed to edit message: " + error.message);
        }
    }, TICK_TIME);
}

// Log in to Discord with your client's token
client.login(config.token);

client.on("rateLimit", (rateLimitInfo) => {
    Warn(`Client -> is being rate limited. Timeout: ${rateLimitInfo.timeout}ms | Limit: ${rateLimitInfo.limit} | Method: ${rateLimitInfo.method}
    Path: ${rateLimitInfo.path}`)
})
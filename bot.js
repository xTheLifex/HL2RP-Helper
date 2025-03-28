// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json')
const { GameDig } = require('gamedig');
const pc = require('picocolors')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Functions
const Err = function (text) {console.log(pc.red("[ERROR] ") + text)}
const Warn = function (text) {console.log(pc.yellowBright("[WARN] ") + pc.bgBlack(text))}
const Info = function (text) {console.log(pc.blue("[INFO] ") + text)}
const OK = function (header, text) {console.log(pc.green(`[${header}] `) + text)}


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


const SECONDS = 1000;
const TICK_TIME = 10 * SECONDS;
client.on(Events.ClientReady, function () {
    OK("BOT", "Automatic tick started.")
    setInterval(async function () {
        const channel = await client.channels.cache.get(config.playerCountChannelID);
        if (!channel)
        {
            Err("Channel ID is invalid!")
            return;
        }
        
        await GameDig.query({
            type: "garrysmod",
            host: config.playerCountServerIP,
            port: config.playerCountServerPort
        }).then((state) => {
            channel.setName(`🌎-Players: ${state.numplayers}`);
        }).catch((error) =>
        {
            Err("Server is offline or fetch has failed.")
        })
    }, TICK_TIME)
})
// Log in to Discord with your client's token
client.login(config.token);

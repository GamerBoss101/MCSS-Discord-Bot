import Discord from "discord.js";
import fs from "fs";
import path from "path";
import BotClient from "./libs/BotClient.js";

export const client = new BotClient({ 
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

(async() => {
    fs.readdirSync(path.join(__dirname, "./handlers")).forEach( async(file) => {
        await (await import(path.join(__dirname, `./handlers/${file}`))).default(Discord, client);
    });
})();

client.login(process.env.BOT_CLIENT_TOKEN)
.then(() => console.log("Bot Logged IN")).catch((Error) => console.error(Error));


process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason);
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception thrown');
    console.error(error);
});
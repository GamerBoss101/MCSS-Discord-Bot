import { EmbedBuilder } from "discord.js";

import { setTimeout } from "timers/promises";

function changeProperty(object, ...changes) {
    changes.forEach((change) => {
        object[change.key] = change.value;
    });
    return object;
}

function buildEmbed(obj) {
    let embed = new EmbedBuilder()
    if(obj.title) embed.setTitle(obj.title);
    if(obj.description) embed.setDescription(obj.description);
    if(obj.color) embed.setColor(obj.color);
    if(obj.url) embed.setURL(obj.url);
    if(obj.image) embed.setImage(obj.image);
    if(obj.thumbnail) embed.setThumbnail(obj.thumbnail);
    if(obj.timestamp) embed.setTimestamp();

    if(obj.author) {
        let name = obj.author.name || null;
        let url = obj.author.url || null;
        let iconURL = obj.author.iconURL || null;
        embed.setAuthor({ name: name, url: url, iconURL: iconURL });
    }

    if(obj.footer) {
        let text = obj.footer.text || null;
        let iconURL = obj.footer.iconURL || null; 
        embed.setFooter({ text: text, iconURL: iconURL });
    }

    if(obj.fields) {
        obj.fields.forEach((field) => {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
        });
    }
    return embed;
}

export default {
    buildEmbed,
    wait: setTimeout,
    changeProperty,
}
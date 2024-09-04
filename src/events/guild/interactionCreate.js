export default async(Discord, client, interaction) => {

    if(interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) {
        client.action.forEach((value, key) => {
            if(interaction.customId.includes(key)) return value.execute(Discord, client, interaction);
        });
    };

    if (interaction.isChatInputCommand()) {
        let command = client.commands.get(interaction.commandName);
        if(!command) return;
        if(!command.isEnabled()) return interaction.reply({ content: `:x: - This Command is not Enabled`, ephemeral: true });
        
        try {
            console.log(`Command Executed: ${interaction.commandName} - ${interaction.user.username}`);
            await command.execute(Discord, client, interaction);
    
        } catch(error) { 
            console.log(error);
            console.log(`An error occured while executing the command: ${interaction.commandName}`);
            console.log(`${error}`);
    
            const Embed = client.util.buildEmbed(client.formatter.format("./responses/error.yaml"));
    
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }
    };

    if(interaction.isCommand()) {
        if(!interaction.isChatInputCommand()) console.log(`Interaction created: ${interaction.commandName} - ${interaction.user.username}`);
    };
}
import Discord from 'discord.js';
import Formatter from './Formatter.js';
import Util from './Util.js';

export default class BotClient extends Discord.Client {
    constructor(props) {
        super(props);
        this.storage = null;
        this.commands = new Discord.Collection();
        this.action = new Discord.Collection();
        this.formatter = new Formatter();
        this.util = Util;
    }
}
const SnakeGame = require('snakecord')
const TicTacToe = require('discord-tictactoe')
const Minesweeper = require('discord.js-minesweeper')
const { DiscordBattleShip } = require("discord-battleship")
const akinator = require("discord.js-akinator")
const Discord = require("discord.js")
const client = new Discord.Client()
const keepAlive = require("./server")

client.on ("ready", () => {
  console.log(`Bot is online`)
})

const snakeGame = new SnakeGame({
  title: 'Snake',
  color: "GREEN",
  timestamp:false,
  gameOverTitle: "Game Over"
})

const config = {
  token: "Bot token"
}

client.on('ready', () => {
    console.log("Clearing Console")
    console.clear()
    console.log('Ready!')
    client.user.setActivity(`commands`)
})

client.on('message', message => {

  const args = message.content.slice().split(/ +/)
  const command = args.shift().toLowerCase();
	if(command === 'test') {
		return message.channel.send('Bot works!')
	} else if(command === 'snake' || command === 'snakegame') {
		return snakeGame.newGame(message)
  } else if(command === 'support') {
    return message.channel.send('https://discord.gg/68xvSdSf4g')
	} else if(command === 'commands' || command === 'h') {
		const embed = new Discord.MessageEmbed()
		    .setTitle("commands")
		    .addFields(
			    { name: 'test', value: "if bot answer bot works, that works!", inline: true },
			    { name: 'snake', value: "Play snake game!", inline: true },
          { name: 'tictactoe', value: "Play tictactoe with gamebot!", inline: true },
          { name: 'minesweeper <rows> <colums> <mines>', value: "Play minesweeper!", inline: true},
          { name: 'battleship @user', value: "Play battleship with your friends!", inline: true},
          { name: 'akinator', value: "Play Akinator!", inline: true },
			    { name: 'commands', value: "Show commands", inline: true },
          { name: 'support', value: "Give link to Gamebot support server", inline: true }
		    )

        return message.reply(embed)
    }
})

const game = new TicTacToe({ language: 'en' })
client.on('message', message => {
  if (message.content.startsWith('tictactoe')) {
    game.handleMessage(message)
  }
})

client.on('message', function (message) {
  const content = message.content.split(' ')
  const args = content.slice(1)

  if (content[0] === 'minesweeper') {
    const rows = parseInt(args[0])
    const columns = parseInt(args[1])
    const mines = parseInt(args[2])

    if (!rows) {
      return message.channel.send(':warning: Please provide the number of rows.')
    }

    if (!columns) {
      return message.channel.send(':warning: Please provide the number of columns.')
    }
 
    if (!mines) {
      return message.channel.send(':warning: Please provide the number of mines.')
    }

    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start()

    return matrix
      ? message.channel.send(matrix)
      : message.channel.send(':warning: You have provided invalid data.')
  }
})

const BattleShip = new DiscordBattleShip({
    embedColor: "RED",
    prefix: "?",
})
client.on("message", async (message) => {
    if (message.content.toLowerCase().includes("battleship"))
        await BattleShip.createGame(message);
})
new DiscordBattleShip({ embedColor: "YELLOW" })

client.on("ready", () => {
    console.log("Bot is Online")
});

client.on("message", async message => {
    if(message.content.startsWith(`akinator`)) {
        akinator(message)
    }
})

keepAlive()
client.login(config.token)

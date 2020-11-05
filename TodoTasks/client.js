const EventEmitter =require('events')
const readline=require('readline')

const rl =readline.createInterface({	
input:process.stdin,
output:process.stdout
})
const client = new EventEmitter();
const server = require('./server')(client)
server.on('response',(resp) => {
  process.stdout.write("\u001b[2J\u001b[0;0f")
  process.stdout.write(resp)
  process.stdout.write("\n\>")
})
let command ,args;
rl.on('line',(input) => {
	[command, ...args]=input.split(' ')
	client.emit('command',command,args)
})
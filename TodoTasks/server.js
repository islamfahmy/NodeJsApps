const EventEmitter =require('events')
class Server extends EventEmitter{
  constructor(client){
  	super();
  	this.tasks={}
  	this.taskid=1;
   	process.nextTick(()=>{
	 this.emit('response','Type a command (help to list commands)')
   	})
   client.on('command',(command,args)=>{
   	switch(command)
   	{
   		case 'help':
   		case 'add':
   		case 'ls':
   		case 'delete':
   		this[command](args);
   		break ;
   		default:
   		this.emit('response','unkown command')

   	}
   })
  }
  tasksString(){
  	return Object.keys(this.tasks).map(key => 
     key+": "+this.tasks[key]
     )
  }
  help(){
  	this.emit('response','add task \nls \ndelete:id')
  }
  add(args){
  	this.tasks[this.taskid++]=args.join(' ')
  	this.emit('response','Added task '+this.tasks[this.taskid-1])

  }
  ls(){
  	this.emit('response','Tasks:\n'+this.tasksString())
  }
  delete(args){
    delete( this.tasks[ args[0] ] )
  	this.emit('response','Deleted task '+args[0])
  }
}
module.exports=(client) => new Server(client);
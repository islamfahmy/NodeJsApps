//process.stdout.write("\u001b[2J\u001b[0;0f")
const server =require('net').createServer()
let counter =0 ;
let sockets ={}
server.on('connection',socket=>{
   socket.id=counter++
   
  console.log('client connected');
  socket.write('please type your name:\n')
 
  socket.on('data',data=>{
    if(!sockets[socket.id])
    {
       socket.name = data.toString().trim();
       socket.write('welcome '+socket.name+' !\n')
       sockets[socket.id]=socket;
       return 
    }
    Object.entries(sockets).forEach(([key,cs])=>
    { 
     if(key==socket.id) return;
     cs.write(socket.name+": ")
     cs.write(data)
    })
  })
  socket.on('end',()=>{
    delete sockets[socket.id]
  })
});
server.listen(8000,console.log('server bound'));

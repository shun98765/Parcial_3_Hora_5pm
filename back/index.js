const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente en el puerto');

    socket.broadcast.emit('chat_message', {
        usuario: 'INFO',
        mensaje: 'Se ha conectado un nuevo usuario'
    })
    
    
    socket.on('chat_message', (data) =>{
        socket.broadcast.emit('chat_message', data)
    })
});

server.listen(3000);
import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { LiMensaje, UlMensajes } from './ui-components';

const socket = io('http://localhost:3000');

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {

    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }

  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    }, setNuevoMensaje(''));
  };

  return (
    <>
      <br/><br/>
      <div class="App">
        <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
        <ul class="UlMensajes">
          {mensajes.map(mensaje => (
            <li class="LiMensaje">{mensaje.usuario}: {mensaje.mensaje}</li>
          ))}
        </ul>
        <input type="text" value={nuevoMensaje} onChange={e => setNuevoMensaje(e.target.value)} 
          onKeyDown={e => {
            if (e.key === 'Enter') {
              enviarMensaje();
            }
          }}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </>
  );
}

export default App;

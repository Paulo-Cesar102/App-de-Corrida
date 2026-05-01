require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const loggerMiddleware = require('./src/middlewares/logger');
const runRoutes = require('./src/routes/runRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const tournamentRoutes = require('./src/routes/tournamentRoutes');
const announcementRoutes = require('./src/routes/announcementRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io para comunicação em tempo real
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json()); // Permite ler JSON no body
app.use(loggerMiddleware); // Aplica o middleware globalmente

// Configuração de Rotas
app.use('/api/auth', authRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallet', transactionRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/announcements', announcementRoutes);

// Socket.io - Gerenciamento de Conexões em Tempo Real
io.on('connection', (socket) => {
  console.log(`[Socket] Novo cliente conectado: ${socket.id}`);

  // Ouve atualizações de localização do cliente
  socket.on('updateLocation', (data) => {
    // console.log(`[Socket] Localização recebida de ${data.userId}:`, data.coords);
    
    // Emite para todos os outros clientes (ou pode ser restrito a salas específicas)
    socket.broadcast.emit('locationBroadcast', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

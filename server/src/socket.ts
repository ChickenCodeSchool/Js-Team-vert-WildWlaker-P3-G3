import type { Server as HttpServer } from "node:http";
import { Server as SocketServer } from "socket.io";

let io: SocketServer | null = null;

export const initSocket = (server: HttpServer): SocketServer => {
  io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Utilisateur connecté :", socket.id);

    socket.on("join-event", (eventId: number) => {
      socket.join(`event-${eventId}`);
      console.log(`${socket.id} a rejoint event-${eventId}`);
    });

    socket.on("leave-event", (eventId: number) => {
      socket.leave(`event-${eventId}`);
      console.log(`${socket.id} a quitté event-${eventId}`);
    });

    socket.on("disconnect", () => {
      console.log("Utilisateur déconnecté :", socket.id);
    });
  });

  return io;
};

export const getIo = (): SocketServer => {
  if (!io) {
    throw new Error("Socket.IO n'est pas initialisé");
  }

  return io;
};

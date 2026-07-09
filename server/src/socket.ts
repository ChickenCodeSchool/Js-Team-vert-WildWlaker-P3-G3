import type { Server as HttpServer } from "node:http";
import { Server as SocketServer } from "socket.io";

let io: SocketServer | null = null;

export const initSocket = (server: HttpServer): SocketServer => {
  io = new SocketServer(server, {
    cors: {
      origin: `${process.env.CLIENT_URL}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Utilisateur connecté :", socket.id);

    socket.on("join-event", (eventUuid: string) => {
      socket.join(`event-${eventUuid}`);
      console.log(`${socket.id} a rejoint event-${eventUuid}`);
    });

    socket.on("leave-event", (eventUuid: string) => {
      socket.leave(`event-${eventUuid}`);
      console.log(`${socket.id} a quitté event-${eventUuid}`);
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

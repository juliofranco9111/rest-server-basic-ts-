import express from 'express';
import { SERVER_PORT } from './../global/environment';

import socketIO from 'socket.io';
import http from 'http';

import * as socket from './../sockets/socket';



export default class Server {

    private static _instance: Server;


    public app: express.Application;
    public port: number;

    // Socket (propiedad encargada de emitir los eventos)
    public io: SocketIO.Server;
    private httpServer: http.Server;

    // El constructor lo hago privado para prevenir una nueva instancia del servidor de IO
    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        // Inicializar el http que funciona como intermediario
        // entre express y IO
        this.httpServer= new http.Server(this.app); 

        // IO
        this.io = socketIO(this.httpServer);
        
        this.escucharSockets();
        
    }

    public static get instance(){
        //Su valor del static es declarado arriba del constructor
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');

        // Escuchar cuando un "cliente" se conecta
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // Métodos del Socket services
            
            // Desconectar 
            socket.desconectar(cliente);

            // Escuchar mensaje 
            socket.mensaje(cliente,this.io);
        })

        
    }

    // método para iniciar el servidor
    start( callback: Function ){
        // como se importó el http entonces ya no iniciamos el app 
        // sino el httpServer
        this.httpServer.listen (this.port, callback());
    }
}
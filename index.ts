//Importo la clase
import Server from "./classes/server";

// Importo el router
import router from "./routes/router";

//Importo el bodyParser
import bodyParser from "body-parser";

// Importar el cors
import cors from "cors";

//Se llama instance por la modificacion en el server
const server = Server.instance;


// CORS

server.app.use( cors({ origin:true, credentials:true }) );


//bodyParser (Asegurarse de que esta cargado antes de las rutas)

server.app.use( bodyParser.urlencoded({ extended:true }) )
server.app.use( bodyParser.json() );


// Rutas

server.app.use('/', router);




server.start( ()=>{
    console.log(`+++++Servidor corriendo en localhost:${server.port}+++++`);
} )
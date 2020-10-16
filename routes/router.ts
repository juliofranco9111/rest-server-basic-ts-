import { usuariosConectados } from './../sockets/socket';


//1.Importar desde express
import { Router, Request, Response } from "express";
import Server from '../classes/server';

const router = Router();

// 2.Definir las rutas

router.get('/mensajes', ( req:Request, res:Response)=>{ 
    res.json({
        ok: true,
        mensaje: 'GET está bien'
    });
});

router.post('/mensajes', ( req:Request, res:Response)=>{ 

    // Cuerpo y de son los nombres que le pongo en postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    
     

    res.json({
        ok: true,
        // cuerpo: cuerpo === solo poner un cuerpo
        cuerpo,
        de
    });


});


// Leer por url los argumentos
router.post('/mensajes/:id', ( req:Request, res:Response)=>{ 

    // Cuerpo y de son los nombres que le pongo en postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }
    // Conectar servicio rest con sockets

    const server = Server.instance;

    server.io.in( id ).emit('mensaje-privado', payload);

    // console.log(id);

    res.json({
        ok: true,
        // cuerpo: cuerpo === solo poner un cuerpo
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener los Ids de los usuarios
router.get('/usuarios',(req: Request,res: Response) => {
    const server = Server.instance;

    server.io.clients((err: any, clientes: string[]) => {
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle',(req: Request,res: Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
        
    })
})

export default router;







// Se debe cargar el archivo de rutas en el index.ts

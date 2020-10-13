//1.Importar desde express
import { Router, Request, Response } from "express";

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

    console.log(id);

    res.json({
        ok: true,
        // cuerpo: cuerpo === solo poner un cuerpo
        cuerpo,
        de,
        id
    });
});

export default router;







// Se debe cargar el archivo de rutas en el index.ts
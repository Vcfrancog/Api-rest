require('dotenv').config();

const { json } = require('express');
const express = require("express");
const db = require('./db')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('', (rep, res) => {
res.send("hola");
});


app.get('/api/usuario', async (req, res) => {
    try {
        const usuarios = await db('usuario').select();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message,
        });
    }
    
});

app.post('/api/usuario', async (req, res) => {
const nombre = req.body.nombre;
const telefono = req.body.telefono;
const descripcion = req.body.descripcion;

if (!nombre) 
return res
.status(400)
.send({status: 400, message: 'usuario es requerido'});

try {
    const nuevoUsuario = await db('usuario')
    .insert({
        nombre: nombre,
        telefono: telefono,
        descripcion: descripcion,
    })
    .returning('*');

res.status(201).send(nuevoUsuario[0]);
} catch(error){
    res.status(500).send({
        status: 500,
        message: error.message,
    });
}
});

app.patch('/api/usuario/:id', async (req, res) => {
    const id =Number(req.params.id) || -1;
    try {
        const usuarioModificar = await db ('usuario').first().where({id: id});
        if (!usuarioModificar)
        return res.status(404).send({
            status: 404,
            message: 'El usuario con id ' +id+ 'no existe',
        });
    
            const nombre = req.body.nombre;
            const telefono = req.body.telefono;
            const descripcion = req.body.descripcion; 

            if (nombre) usuarioModificar.nombre=nombre;
            if (telefono) usuarioModificar.telefono=telefono;
            if (descripcion) usuarioModificar.descripcion=descripcion;

            const usuario =  await db('usuario')
            .update({
                nombre: usuarioModificar.nombre,
                telefono: usuarioModificar.telefono, 
                descripcion:  usuarioModificar.descripcion,
            })
            .where({id: id}).returning('*');

        res.status(200).send(usuario[0]);
    } catch(err){
        res.status(500).send({
            status: 500,
            message: error.message,
    });
}
});

app.delete('/api/usuario/:id', async (req, res) => {
    const id =Number(req.params.id) || -1;
    try {
        const usuarioABorrar = await db ('usuario').first().where({id: id});
        if (!usuarioABorrar)
        return res.status(404).send({
            status: 404,
            message: 'El usuario con id ' +id+ 'no existe',
        });
                    
        await db ('usuario').delete().where({id: id});
           
         
        res.status(204).send();
    } catch(err){
        res.status(500).send({
            status: 500,
            message: error.message,
    });
}
});


app.listen(port, () => {
 console.log("El servidor está inicializado en el puerto " + port);
});

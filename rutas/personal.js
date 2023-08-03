const express = require('express')
const routes = express.Router()


routes.get('/', (req, res) => {
    req.getConnection((err, connect) => {
        return res.json({
            success: "Los datos personales se encuentran incriptados.",
            data: rows
        });
    })
})

//Busca persona por nombre.
routes.get('/:nombre', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        connect.query('SELECT Id FROM personal WHERE REPLACE(lower(concat_ws(" ",Nombre,Apellidos))," ","") = ?', [req.params.nombre], (err, rows) => {
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows[0]
            });
        })
    })
})

routes.get('/:ID/:id', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        connect.query('SELECT `Id`, `Nombre`, `Apellidos`, `Cedula`, `Teléfono`, `Correo` FROM `personal` WHERE `Id` = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows[0]
            });
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        connect.query('INSERT INTO personal set ? ', [req.body], (err) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err
                });
            } else {
                return res.json({
                    success: true,
                    msg: 'Usuario Registrado'
                });
            }
            res.send('Empleado Registrado')
        })
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        connect.query('DELETE FROM personal WHERE Id = ? ', [req.params.id], (err) => {
            if (err) return res.send(err)
            res.send('Persona Eliminada')
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        connect.query('UPDATE personal set ? WHERE Id = ? ', [req.body, req.params.id], (err) => {
            if (err) return res.send(err)
            res.send('Persona Actualizada')
        })
    })
})

module.exports = routes
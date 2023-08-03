const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT T.Id, Fecha, concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Lote,PilaActual,PilaDestino,TipoPez,Cantidad,muestro,T.IdPersonal FROM trazabilidad AS T INNER JOIN personal AS P ON T.IdPersonal = P.Id WHERE T.Estado = 1', (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('', [req.params.id],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})


routes.post('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('INSERT INTO trazabilidad set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Trazabilidad Registrada')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE trazabilidad SET Estado = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Trazabilidad Eliminada')
        })
    })
})

module.exports = routes
const express = require('express');
const route = express.Router();
const productController = require('../controladores/productsController');

route.get('/', productController.listar);
route.get('/:id', productController.detalle);
route.post('/create', productController.crear);
route.put('/edit/:id', productController.editar);
route.delete('/delete/:id', productController.borrar);

module.exports = route;
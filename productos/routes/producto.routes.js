const ProductoController = require('../controllers/producto.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.productoRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/productos', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductoController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/productos', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.list
    ]);

       // Solo lee si el usuario con acceso PAID
    app.get('/productos/:productoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/productos/:productoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductoController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/productos/:productoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductoController.removeById
    ]);
    
    // Busqueda por categoriaID
    app.get('/productoscatId/:categoriaId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.getByCat
    ]);

    // Busqueda por marca
    app.get('/productosmarca/:marca', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.getByMarca
    ]);

    // Busqueda por nombre de categoria
    app.get('/productoscatNom/:categoriaName', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.getByCatNom
    ]);

    // Lista precios de productos
    app.get('/productosprecio', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProductoController.listPrecio
    ]);

};



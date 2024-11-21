
const CarritoController = require('../controllers/carrito.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.carritoRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/carrito', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CarritoController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/carrito', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CarritoController.list
    ]);

    // Solo lee si el usuario con acceso PAID
    app.get('/carrito/:carritoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CarritoController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/carrito/:carritoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CarritoController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/carrito/:carritoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CarritoController.removeById
    ]);

    // Solo lee si el usuario con acceso PAID
    app.get('/carritouserId/:carritoUserId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CarritoController.getByUserId
    ]);
    

};

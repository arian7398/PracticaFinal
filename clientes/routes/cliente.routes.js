
const ClienteController = require('../controllers/cliente.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.clienteRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/clientes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ClienteController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/clientes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ClienteController.list
    ]);

       // Solo lee si el usuario con acceso PAID
    app.get('/clientes/:clienteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ClienteController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/clientes/:clienteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ClienteController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/clientes/:clienteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ClienteController.removeById
    ]);

    // Solo actualiza si es el ADMINISTRADOR
    app.get('/clientesuserId/:clienteUserId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ClienteController.getByUserId
    ]);

};


const PagoController = require('../controllers/pago.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.pagoRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/pagos', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/pagos', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        PagoController.list
    ]);

    // Solo lee si el usuario con acceso PAID
    app.get('/pagos/:pagoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        PagoController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/pagos/:pagoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/pagos/:pagoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.removeById
    ]);

    // Solo lee si el usuario con acceso ADMIN
    app.get('/pagosuserId/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.getByUserId
    ]);

    app.get('/pagosmetodoPago/:metodo', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.getByMetodoPago
    ]);

    app.get('/pagosOrden/:nroOrden', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.getByOrdenCompra
    ]);

    app.get('/pagosordenId/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PagoController.getByOrdenId
    ]);

};

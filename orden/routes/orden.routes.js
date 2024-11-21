
const OrdenController = require('../controllers/orden.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.ordenRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/ordenes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/ordenes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdenController.list
    ]);

    // Solo lee si el usuario con acceso PAID
    app.get('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdenController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.removeById
    ]);

    // Solo lee si el usuario con acceso ADMIN
    app.get('/ordenesuserId/:ordenuserId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.getByUserId
    ]);

    // Solo lee si el usuario con acceso ADMIN
    app.get('/ordenesestado/:ordenEstado', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.getByEstado
    ]);

    // Solo lee si el usuario con acceso ADMIN - Devulelve ID
    app.get('/ordenesnumero/:ordenNum', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.getByNumOrd
    ]);

};

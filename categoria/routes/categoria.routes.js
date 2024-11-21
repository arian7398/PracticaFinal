
const CategoriaController = require('../controllers/categoria.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.categoriaRoutes = function (app) {

    // Solo el ADMINISTRADOR puede registrar
    app.post('/categorias', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoriaController.insert
    ]);

    // Solo lista los usuarios con el acceso PAID
    app.get('/categorias', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CategoriaController.list
    ]);

    // Solo lee si el usuario con acceso PAID
    app.get('/categorias/:categoriaId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CategoriaController.getById
    ]);

     // Solo actualiza si es el ADMINISTRADOR
     app.patch('/categorias/:categoriaId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoriaController.patchById
    ]);

    // Solo el usuario ADMIN puede eliminar
    app.delete('/categorias/:categoriaId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoriaController.removeById
    ]);

    // Devuelve el ID
    app.get('/categoriasNom/:categoriaNom', [
        CategoriaController.getByNom
    ]);

};

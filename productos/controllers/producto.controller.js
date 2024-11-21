const ProductoModel = require('../models/producto.model');
const CategoriaModel = require('../../categoria/models/categoria.model');

exports.insert = (req, res) => {
    ProductoModel.createProducto(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProductoModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ProductoModel.findById(req.params.productoId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    ProductoModel.patchUser(req.params.productoId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    ProductoModel.removeById(req.params.productoId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.getByCat = (req, res) => {
    ProductoModel.findByCat(req.params.categoriaId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByMarca = (req, res) => {
    ProductoModel.findByMarca(req.params.marca)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.getByCatNom = async (req, res) => {
    const categoriaNameRegex = new RegExp(req.params.categoriaName, 'i');
    const categorias = await CategoriaModel.findByNom( categoriaNameRegex );

    if (!categorias.length) return res.status(404).json({ message: 'Categoría no encontrada' });
    const categoriaIds = categorias.map(categoria => categoria._id);

    ProductoModel.findByCatNom(categoriaIds)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.listPrecio = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProductoModel.listPrecio(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Categoria = require("../../categoria/models/categoria.model");
const Schema = mongoose.Schema;

const productoSchema = new Schema(
  {
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    marca: { type: String, required: true },
    medida: { type: String, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const Producto = mongoose.model('Producto', productoSchema);

exports.createProducto = (productoData) => {
  const producto = new Producto(productoData);
  return producto.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Producto.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, users) {
              if (err) {
                  reject(err);
              } else {
                  resolve(users);
              }
          })
  });
};

exports.findById = (id) => {
  return Producto.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, productoData) => {
  return Producto.findOneAndUpdate({
      _id: id
  }, productoData);
};

exports.removeById = (productoId) => {
  return new Promise((resolve, reject) => {
      Producto.deleteMany({_id: productoId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByCat = (categoriaId) => {

  console.log(categoriaId)

  return Producto.find( {categoria : categoriaId })
      .then((result) => {
          // result = result.toJSON();
          return result;
      });
};


exports.findByMarca = (marca) => {
  const marcaRegex = new RegExp(marca, 'i');
  return Producto.find( {marca : marcaRegex })
      .then((result) => {
        return result;
      });
};


exports.findByCatNom = (categoriaIds) => {
  const categoriaId = categoriaIds[0];
  return Producto.find( {categoria : categoriaId })
      .then((result) => {
          return result;
      });
};


exports.listPrecio = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Producto.find({}, 'codigo descripcion marca precio')
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, users) {
              if (err) {
                  reject(err);
              } else {
                  resolve(users);
              }
          })
  });
};
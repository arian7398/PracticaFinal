const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

// Definir el esquema para los items del carrito
const ItemSchema = new Schema({
  id_itm: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },    
  cantidad: { type: Number, required: true, min: 1 },
  precio: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true }
});

// Definir el esquema para el carrito de compras
const carritoSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },    
  items: [ItemSchema],
},{
    timestamps: true
});

const Carrito = mongoose.model('Carrito', carritoSchema);


exports.createCarrito = (carritoData) => {
  const carrito = new Carrito(carritoData);
  return carrito.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Carrito.find()
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
  return Carrito.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, carritoData) => {
  return Carrito.findOneAndUpdate({
      _id: id
  }, carritoData);
};

exports.removeById = (carritoId) => {
  return new Promise((resolve, reject) => {
      Carrito.deleteMany({_id: carritoId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByUserId = (userId) => {
    return Carrito.find( {user_id : userId })
        .then((result) => {
            return result;
        });
};

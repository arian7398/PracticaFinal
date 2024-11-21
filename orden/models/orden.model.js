const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const Counter = require('../../counter/models/counter.model');

const OrdenDetailSchema = new Schema({
    id_itm: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: { type: Number, required: true },
    total: { type: Number, required: true }
});

// Estado: PENDIENTE / PAGADA / ENVIADA
const ordenSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nroord: { type: String, unique: true },
    fecha: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    totigv: { type: Number, required: true },
    totneto: { type: Number, required: true },
    estado: { type: String, default: "PENDIENTE" },
    detalle: [OrdenDetailSchema]
},{
  timestamps: true
});


ordenSchema.pre('save', async function(next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: 'orden' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.nroord = `ORD-${String(counter.seq).padStart(5, '0')}`;
    }
    next();
});


const Orden = mongoose.model('Orden', ordenSchema);


exports.createOrden = (ordenData) => {
  const orden = new Orden(ordenData);
  return orden.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Orden.find()
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
  return Orden.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, ordenData) => {
  return Orden.findOneAndUpdate({
      _id: id
  }, ordenData);
};

exports.removeById = (ordenId) => {
  return new Promise((resolve, reject) => {
      Orden.deleteMany({_id: ordenId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByUserId = (ordenuserId) => {
  return Orden.find( {user_id : ordenuserId } )
      .then((result) => {
          return result;
      });
};

exports.findByEstado = (ordenEstado) => {
  const estadoRegex = new RegExp(ordenEstado, 'i');
  return Orden.find( {estado : estadoRegex } )
      .then((result) => {
          return result;
      });
};

exports.findByNumOrd = (ordenNum) => {
  const ordenRegex = new RegExp(ordenNum, 'i');
  return Orden.find( {nroord : ordenRegex } )
      .then((result) => {
          return result;
      });
};


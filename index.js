const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;


// =====================================================================
// CONFIGURACION PARA MOSTRAR CARRITO Y STRIPE
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { stripe } = require('./config');

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// CONFIGURACION PARA MOSTRAR CARRITO Y STRIPE
// =====================================================================


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');


AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

const CategoriasRouter = require('./categoria/routes/categoria.routes');
CategoriasRouter.categoriaRoutes(app);

const ProductosRouter = require('./productos/routes/producto.routes');
ProductosRouter.productoRoutes(app);

const ClientesRouter = require('./clientes/routes/cliente.routes');
ClientesRouter.clienteRoutes(app);

const CarritoRouter = require('./carrito/routes/carrito.routes');
CarritoRouter.carritoRoutes(app);

const OrdenesRouter = require('./orden/routes/orden.routes');
OrdenesRouter.ordenRoutes(app);

const PagosRouter = require('./pagos/routes/pago.routes');
PagosRouter.pagoRoutes(app);


// =====================================================================
// RENDERIZAR PRODUCTOS EN LA PAGINA PRINCIPAL
// Modelo del producto
const Product = require('./productos/models/producto.model');

app.get('/', async (req, res) => {
    try {
        const products = await Product.list();
        res.render('index.ejs', { products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// RENDERIZAR PRODUCTOS EN LA PAGINA PRINCIPAL
// =====================================================================


// =====================================================================
// MANEJAR PROCESO DE CHECKOUT
app.post('/checkout', async (req, res) => {
    const { items } = req.body;
    let lineItems = [];

    // Crear un arreglo de items para Stripe
    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (product) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.descripcion
                    },
                    unit_amount: product.precio * 100 // Stripe usa centavos
                },
                quantity: item.quantity
            });
        }
    }

    try {
        // Crear una sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`
        });

        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Página de éxito
app.get('/success', (req, res) => {
    res.render('checkout', { message: '¡Pago realizado con éxito!' });
});

// Página de cancelación
app.get('/cancel', (req, res) => {
    res.render('checkout', { message: 'Pago cancelado.' });
});
// MANEJAR PROCESO DE CHECKOUT
// =====================================================================




const server = app.listen(PORT, function () {
    console.log('app listening at port %s', PORT);
});


// Para RENDER
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

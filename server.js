const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "auth-session",
        keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
        httpOnly: true,
    })
);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get("/", (req, res) => {
    res.send("Hola desde render");
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });



function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

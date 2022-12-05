// Database imports
const pgPool = require("./db/pgWrapper");
const tokenDB = require("./db/tokenDB")(pgPool);
const userDB = require("./db/userDB")(pgPool);
// OAuth imports
const oAuthService = require("./auth/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");
// Express
const express = require("express");
const app = express();
app.oauth = oAuth2Server({model: oAuthService,grants: ["password"],debug: true,});
// Auth and const cors = require("cors");
const authenticator = require("./auth/authenticator")(userDB);
const routes = require("./auth/routes")(express.Router(),app,authenticator);
// CORS
const cors = require("cors");
//Postgres
const {Client} = require('pg');
const client = new Client({
    user: "postgres",
    host: "postgresql://postgres:krecKjyO5KOacSSEjtnT@containers-us-west-138.railway.app:6808/railway",
    database: "railway",
    password: "krecKjyO5KOacSSEjtnT",
    port: 6808,
})

client.connect();

const corsOptions = [{
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false},{
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  }];

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());
app.use("/auth", routes);
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
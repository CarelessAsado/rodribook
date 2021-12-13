const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
/*-------------CONECTANDO A DB y SERVER-------------------*/
const connectDB = require("./db/connect.js").connectDB
const PORT = process.env.PORT||5000
connectDB(process.env.MONGODB_URI, startServer,PORT);
function startServer(PORT){
    app.listen(PORT, (req,res)=>{
        console.log('Conectado a http://localhost:' + PORT);
    })
}

const session = require("express-session") 
const MongoDBSession = require("connect-mongodb-session")(session);

app.use(session({
    secret: process.env.SESH_SECRET,
    resave:false,  
    saveUninitialized:false,
    store: new MongoDBSession({
        uri:process.env.MONGODB_URI 
    })

}))

app.use(express.urlencoded({extended:false}));
app.use(express.json()) ;
/*-------------------ROUTES-----------------------------*/
const userRoutes = require("./routes/users")
app.use("/user", userRoutes)
const indexRoute = require("./routes/index");
app.use("/", indexRoute);
const apiRoutes = require("./routes/api")
app.use("/api/v1/rodribook", apiRoutes)
/*---------------------------------------------------------*/


app.use( express.static(__dirname +"/public"));
// P/usar subcarpetas desde /public
 app.use("/public", express.static(path.resolve(__dirname, "public")));   






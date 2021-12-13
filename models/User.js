const mongoose = require("mongoose");
const User = new mongoose.Schema({
    nombre:{
        type:String, 
        required:[true, 'Proveer nombre por favor.'],
        maxLength: [40, 'El nombre no puede superar los 40 carácteres.']
    }, 
    fecha:{
        type:Date,
        default:Date.now

    }, 
    password:{
        type:String,
        required:[true, "Proveer contraseña."],
    },
    email:{
        type:String,
        required:[true, "Proveer email."],
        /*-------------OJO Q ESTO NO ES UN VALIDATOR-------------*/
        unique:[true,"Ya existe un usuario registrado con ese mail."]
    },
   
})
                                //VER SI ESTO VA EN PLURAL Y MINUSCULA
module.exports = mongoose.model("User", User)

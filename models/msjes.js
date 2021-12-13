const mongoose = require("mongoose");
const MsjeSchema = new mongoose.Schema({
    nombre:{
        type:String, 
        required:[true, 'Proveer nombre por favor']
    }, fecha:{
        type:Date,
        default:Date.now

    },msje:{
        type:String, 
        required:true,
        maxLength:[400, 'Proveer nombre por favor']
    }, likes: {
        type:Number,
        default:0
    }, sexo:{
        type:String,
        required:[true, "Indicar sexo"]
    }
})
module.exports = mongoose.model("MsjesFbookeros", MsjeSchema);
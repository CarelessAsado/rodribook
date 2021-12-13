const MsjesFbookeros = require("../models/msjes")
const User = require("../models/User")
/*-----------------------------------*/
const fs = require("fs");
let msjeHTML = fs.readFileSync(process.cwd() +"/public/html/partials/msjes.html","utf8");
let indexHTML = fs.readFileSync(process.cwd() +"/public/index.html","utf8");
/*------utils--------------*/
const parsearDate = require("../utils/parsearDate")
const actualizarTemplateMsjes = require("../utils/updateHTMLpartials");
/*------------------------------*/

async function getIndex(req,res){
    try {
            /*MODIFICAR DINAMICAMENTE EL NAV*/
       let user = await User.findById({_id:req.session.isAuth})
        let nombreUsuario = user.nombre.match(/\w+/);  
        let data = await  MsjesFbookeros.find({})
        let dataF =  parsearDate(data);
        const HTMLFinal =actualizarTemplateMsjes(msjeHTML, dataF);
        let finalIndex = indexHTML.replace("{{algo}}", HTMLFinal);
        finalIndex = finalIndex.replace("{{req.session.isAuth}}",req.session.isAuth)
         finalIndex = finalIndex.replace("{{User.nombre}}",nombreUsuario) 
        res.send(finalIndex);
    } catch (error) {
        res.status(404).json("Ha ocurrido un error, intenta de nuevo más tarde.");
    }
}

module.exports = {getIndex}

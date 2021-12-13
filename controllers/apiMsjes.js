const MsjesFbookeros = require("../models/msjes");
const parsearDate = require("../utils/parsearDate");


/*POST REQ DEL FORM*/
async function saveMessage (req,res){
    async function saveMsje(body){
        try {
            let {nombre,msje,sexo} = body; 
            sexo = setFasFaSexo(sexo);
            let msjeFb = new MsjesFbookeros ({
                nombre,
                msje,
                sexo
            });
            
            let data = await msjeFb.save();
            return data
           
        } catch(err){
            return err;
        }
    }
    
    function setFasFaSexo(sexo){
        if(sexo=="masculino"){
            return `<i class="fas fa-male"></i>`
        } else if (sexo=="femenino"){
            return `<i class="fas fa-female"></i>`
        } return `<i class="far fa-question-circle"></i>`
    }
    try {    
        let data = await saveMsje(req.body);
        res.json(data)
    }catch(err){
        res.status(404).json(err)
    }
}
/*Una vez guardado el msje llamo a través de axios
en el front al get all messages*/
async function getAllMessages (req,res){
    try {
        let data = await  MsjesFbookeros.find({})
        let dataFinal =  parsearDate(data);
        res.json(dataFinal);
    } catch (error) {
        console.log(error);
    }
}

/*Uso metodo GET con req.params p/identificar publicacion
y lo actualizo a la vieja usanza*/
async function updateLikes (req,res){
    try{
        let data= await MsjesFbookeros.findById({_id:req.params.id})
    data.likes++
    let finished= await data.save()
    res.cookie(req.params.id, true, { expires: new Date(1640230369707)});
    res.status(200).json({"likes":finished.likes})
    } catch(err){
        res.status(404).json(
            {"error":"no se pudo actualizar los likes"})
    }    
}
module.exports = {getAllMessages,saveMessage,updateLikes};
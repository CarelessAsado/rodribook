module.exports = function actualizarTemplateMsjes(msjeHTML,MongoArray){
    
    let HTMLFinal=  MongoArray.map(item=>{
        /*OJO ACA Q EL METODO REPLACE DEVUELVE EN UNA VARIABLE NUEVA, y ademas
        en la 1era vuelta mandas el HTML original pero ya en {{fecha}}
        cambias y pones el HTMLcompleto.replace() OJAAAZO*/
        let HTMLcompleto = msjeHTML.replace("{{nombre}}", item.nombre);
        HTMLcompleto =  HTMLcompleto.replace("{{fecha}}", item.fecha);
        HTMLcompleto =  HTMLcompleto.replace("{{msje}}", item.msje);
        HTMLcompleto =  HTMLcompleto.replace("{{sexo}}", item.sexo);
        HTMLcompleto =  HTMLcompleto.replace("{{likes}}", item.likes);
        HTMLcompleto =  HTMLcompleto.replace("{{_id}}", item._id);
        
        return HTMLcompleto
    }).join(" ")
    return HTMLFinal
}
module.exports = function parsearDate(data){
    const days = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
    return data.map(item=>{
       let día = days[item.fecha.getDay()]
       let nroDía = item.fecha.getDate();
       let mes = meses[item.fecha.getMonth()];
       let año = item.fecha.getFullYear();
       let horas = item.fecha.getHours();
       let mins = item.fecha.getMinutes();
       function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      horas = addZero(horas);
      mins = addZero(mins)
      
        
        return {nombre:item.nombre, sexo:item.sexo,likes:item.likes,_id:item._id,msje:item.msje,
            fecha: `${día} ${nroDía} de ${mes} de ${año} a las ${horas} horas y ${mins} minutos.`
        }
    })
    
} 
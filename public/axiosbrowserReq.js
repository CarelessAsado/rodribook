/*USAR APPEND DSP*/
/*VER Q ESTA PASANDO CON EL BOTON DEL EMOTICON
Q ME MANDA EL FORM*/
let foroDOM = document.querySelector(".containerMsjes");
const formulario = document.getElementById("formMsjeFbookero");
const inputNombre = document.getElementById("inputNombre");
const inputSaludo = document.getElementById("inputSaludo");
/*----------Alerts--------------------------*/
const ALLalertsDOM = document.querySelectorAll(".alert-container")
const alertDOMNombre = document.querySelector(".alert-container.nombre")
const alertDOMMsje = document.querySelector(".alert-container.msje")
const alertDOMSexo = document.querySelector(".alert-container.sexo")


const alertArr = []
let freeOfErrors = true;
let idCBox = 0;

/*POST SUBMIT EVENT FORM
 + CHEQUEAR FREE OF ERRORS
 + SHOWTASKS + ACTUALIZAR LIKES
 */
formulario.addEventListener("submit",async (e)=>{

    e.preventDefault();
    /*reseteamos valor*/
    freeOfErrors = true;
    idCBox = 0;
    ALLalertsDOM.forEach(item=>{
        item.innerHTML="";
    })

    /*Obtenemos el input.value*/
    let nombre = inputNombre.value;
    let msje = inputSaludo.value;
    let sexo = document.querySelectorAll('input[name="sexo"]');
    sexo.forEach(item=>{
        if(item.checked){
            return   sexo = item.value
        }
    })
   
        //HACER MSJES DE ERROR

    //depuramos el input

    if(sexo!="femenino"&&sexo!="binario"&&sexo!="masculino"){
        alertArr.push("Elegí sexo por favor.")
        renderintoHTMLtheAlerts(alertArr,alertDOMSexo)
    }
    chequearYRenderizar(nombre,alertDOMNombre);
    chequearYRenderizar(msje,alertDOMMsje);

    function chequearYRenderizar(itemForm,alertDOM){
        if(!chequearData(itemForm)){
            //resetea los errores a 0
            renderintoHTMLtheAlerts(alertArr,alertDOM);            
            return;
        }
    }


    if(!freeOfErrors) {
        return
    }
/*---------------------DE ACA EN ADELANTE YA ESTA TODO OK Y EMPEZAMOS------------------------------*
------------------------CON EL PROCESO DE POST + posterior GET ALL--------------------------------*/    
    //si esta todo ok borramos las erroresAlert
    ALLalertsDOM.forEach(item=>{
        item.innerHTML="";
    })

    /*MOSTRAR MSJE EXITO */
    try{  
        //ver xq me guardo tantos msjes si se supone 
        //q el schema tiene todo required, creo q x default me tomaba 
        //sexo femenino, eso esta mal

        await axios.post('/api/v1/rodribook',{nombre:nombre, 
                                              msje:msje,
                                              sexo:sexo});
        let successAlert = document.getElementById("alert-success")
        successAlert.innerHTML= `<div class="successMsjeEnviadoYGuardado">
        <input type="checkbox" id="alertSuccess" class="alertinputaborrar"/>

        <label class="closeSuccess" title="close" for="alertSuccess">
            <div class="center fas">
            <i class="fas fa-times"></i>
            </div>
        </label>

        <p class="text-alert">Mensaje enviado con éxito.</p>
        </div>`
        showTasks();    
    }catch(err){
        console.log(err);
    }   
})
/*--------------------------------SECCION ERRORES|DEPURACION-------------------------------------------------------------- */
/*-------------------------------------------------------------------------------------------------------------------- */
/*------------------CHEQUEO DE LOS INPUTS|ARMADO DEL ERRORALERT | RENDERIZACION ALERTS ---------------------------*/
function chequearData(item){
    if(!item) {
        alertArr.push(`Campo vacío`);
    }
    if(item.length>380){
        alertArr.push("Tienen que ser menos de 380 caracteres.")
    }
    if(item.match(/put[ao]|forro|gay|pelotud[oae]/i)){
        alertArr.push(`"${item}" no es una valor válido. Este foro se basa en el respeto.`);
    }

    return alertArr.length == 0? true: false
}

function renderintoHTMLtheAlerts(arrayConAlertsARenderizar,alertDOMaRenderizar){
    freeOfErrors =false
    let htmlAlerts= 
    arrayConAlertsARenderizar.map((item)=>{
    /*Los ids tienen q ser unicos, x eso le agrego el index al id, me pasó 
    q tenia dos items en el array y no me funcaba cuando queria cerrar las 
    alerts, como q hacia corto y solo podia cerrar una, justamente xq los dos html
    elements compartian ID*/
    idCBox ++
    return `<div class="alert-item">
                <input type="checkbox" id="alert${idCBox}" class="alertinputaborrar"/>
                <label class="close" title="close" for="alert${idCBox}">
                    <div class="center fas">
                    <i class="fas fa-times"></i>
                    </div>
                </label>
                <p class="text-alert">${item}</p>
            </div>`
    }).join(" ")
    arrayConAlertsARenderizar.length = 0;

    return alertDOMaRenderizar.innerHTML = htmlAlerts
}
/*----------------------------------------------------------------------------------------------------------------*/


/*esta la uso para cuando el post ya está procesado*/
async function showTasks(){
    let {data} = await axios.get("/api/v1/rodribook")
    let stringDeHTMLAPegar = data.map(data=>{        
        return `<article class="Fb-message sombra">
        <div class="header flex">
            <div id="sexoLogo">
                ${data.sexo}
            </div>
            <div class="nameYfecha flex column">
                <div class="name Fbgrey">
                    <strong class="Fbwhite">${data.nombre}</strong> te ha comentado
                </div>
                <div class="fechadelMsje Fbgrey">
                   <em>Publicado el ${data.fecha}.</em> 
                </div>
            </div> 
        </div>
        <div id="MsjeCentral">
                ${data.msje}
        </div>
     
        <div class="footermsjeIndividual">
            <div class="likesNrito">
                <i class="fas fa-thumbs-up" id="logolikes-estatico"></i><span class="nroslikes">${data.likes}</span>
            </div>
    
            <div class="likesPUTreq" data-_id="${data._id}">
                <i class="far fa-thumbs-up" id="likeBtnPUTreq"></i>
                <strong class="">Me gusta</strong>
            </div>
        </div>
        </article>` 
    }).join(" ");
    foroDOM.innerHTML=stringDeHTMLAPegar;
    configurarCookiesDeItemsLikeados();

}

/*Cookies likeados*/
document.addEventListener('DOMContentLoaded', () => {
    configurarCookiesDeItemsLikeados();
});

function configurarCookiesDeItemsLikeados(){
    let arrofIdDivs= Array.from(document.querySelectorAll(".likesPUTreq"))
    let cookieIdString = document.cookie;
    arrofIdDivs.forEach(item=>{
        let regexId = new RegExp(item.dataset._id)
        if(regexId.test(cookieIdString)){
          item.classList.add("Likeado")
        }
        return
    })
}

/*BOTON P METER LIKES, usé una get req con params de ID, habitualmente se usa
p buscar un item en particular pero como no lo tiene esta app lo usé para lo 
q sería PATCH/PUT*/
foroDOM.addEventListener("click", async(e)=>{
    if (e.target.classList[0] !="likesPUTreq"){
        return
    }
    const ID = e.target.dataset._id;
    try {
        let {data} = await axios.get(`/api/v1/rodribook/${ID}`)
        let spanTagNrosLikes = (e.target.parentElement).firstChild.nextSibling.firstChild.nextSibling.nextSibling
        spanTagNrosLikes.textContent =data.likes;
        e.target.classList.add("Likeado");
    } catch (error) {
        console.log(error);
    }
})
/*      3. enviar axios.patch(/api/v1/likes/${_id}), {}NO NECESITARIA PONER NADA EXTRA
        CREO necesito un patch realmente? Si no necesito info adicional?
        4. una vez q vuelve la data actualizada
        agarrar <span class="nroslikes" y ACTUALIZAR EL text.Content
})
*/


/*---------ver si este método es mejor---------------------*/
/*----const params = window.location.search
const id = new URLSearchParams(params).get('id')-------------*/
const url = new URL(document.location.href)
let params = url.pathname.replace("/user/profile/","")

/*-----------------------------------------------------------*/
let userNameDOM = document.getElementById("userNombre");
let nameTagAxios = document.getElementById("nameTagAxios")
let userEmailDOM = document.getElementById("userEmail")
let formAlertMessagesDOM =document.getElementById("formAlertMessages")

/*----------ver si esto lo uso al final**************/
let originalEmail
let originalName

 async function showUser (){
    try{
        let {data:user} = await axios.get("/api/v1/rodribook/user/"+params)
        userEmailDOM.value = user.email
        userNameDOM.value = user.nombre
        originalEmail = user.email
        originalName = user.nombre
        let nameAbreviado = user.nombre.match(/\w+/);
        nameTagAxios.textContent=nameAbreviado;
        document.title = nameAbreviado;
    }
    catch(error){
         formAlertMessagesDOM.textContent = error.response.data;
         formAlertMessagesDOM.style.display = 'block';
    }
}
showUser();
/*------------tengo q ver bien como va a ser la mecanica del submit---------*/
/*----------un elemeento a la vez? como manejo los boton editar y enviar?---*/
/*--------evitar enviar si no hubo modificaciones-------------------------*/
/*----------ver display de errores-------------------------------*/
let formNombre = document.querySelector(".userNombreContainer");
let formEmail = document.querySelector(".userEmailContainer");

formNombre.addEventListener("submit", (e)=>{
    editBtnsFunctionality(e,originalName,"nombre");
})    
formEmail.addEventListener("submit", (e)=>{
    editBtnsFunctionality(e, originalEmail,"email");
})    

async function editBtnsFunctionality(e, originalValueInput,key){
    e.preventDefault();
    let btnTarget = e.submitter
    let input =e.target.firstElementChild;
    if(btnTarget.textContent=="Editar"){
        /*si no lo saco ahora una vez q modifico el innerHTML se descuaja todo*/
        btnTarget.textContent = "Cancelar";

      btnTarget.parentElement.innerHTML += `<button class="saveBtn" type="submit">Guardar</button>`

        input.readOnly= false;
        input.focus();  
        input.style.color='#f85149';
        return
    }
    else if (btnTarget.textContent=="Cancelar"){
        btnTarget.parentElement.innerHTML = `<button class="editBtn" type="submit">Editar</button>`
        input.readOnly= true; 
        input.style.color='white';
    }
    else{
        let objectToUpdate = {}
        objectToUpdate[key] = input.value
        try {
            let {data:userUpdated} = await axios.patch("/api/v1/rodribook/user/"+params, objectToUpdate)
            showUser();
            btnTarget.parentElement.innerHTML = `<button class="editBtn" type="submit">Editar</button>`
            input.readOnly= true; 
            input.style.color='white';
            formAlertMessagesDOM.textContent = "Se actualizó con éxito."
            formAlertMessagesDOM.classList.add("success");
            formAlertMessagesDOM.style.display = 'block'
            /*---------borrar tras 4 segs---------------*/
            setTimeout(()=>{
                formAlertMessagesDOM.style.display = 'none'
                formAlertMessagesDOM.classList.remove("success");
            },4000)
        } catch (error) {
            formAlertMessagesDOM.textContent = error.response.data 
            formAlertMessagesDOM.style.display = 'block'
        }
  
        /*COTEJAR Q HAYA HABIDO CAMBIO originalValueInput*/
        /*-------AXIOS;PATCH*/
    }
}

async function axiosPasswordUpdateRequest(){
    let oldPasswordChange= document.getElementById("oldPasswordChange").value
    let newPasswordChange = document.getElementById("newPasswordChange").value
    let confirmNewPasswordChange = document.getElementById("confirmNewPasswordChange").value
    let errorContainerChangePass = document.getElementById("errorContainerChangePass");
    errorContainerChangePass.textContent="";
    /*---------------------PREVALIDATION--------------------------------*/
     if(!oldPasswordChange||!newPasswordChange||!confirmNewPasswordChange){
        return errorContainerChangePass.textContent="No puede haber campos vacíos."
    }
    if (newPasswordChange != confirmNewPasswordChange){
        return errorContainerChangePass.textContent="No son idénticas tus contraseñas."
    } 
    try {
        await axios.patch(`/api/v1/rodribook/user/passwordupdate/${params}`
                            ,{oldPasswordChange,
                            newPasswordChange, 
                            confirmNewPasswordChange
                            })    
            let successPassChangeContainer = document.getElementById("successContainerChangePass")    
            successPassChangeContainer.textContent="Se realizó la operación exitosamente"                                                    
            setTimeout(
                ()=>{successPassChangeContainer.textContent="";
            },5000)
    } catch (error) {
        errorContainerChangePass.textContent=error.response.data
    }
}

const overlayBorrarCuenta=document.getElementById("transparenciaOverlayBorrarCuenta");
const transparenciaOverlayModificarPass = document.getElementById("transparenciaOverlayModificarPass");

function showOverlay(id){
    let overlayAMostrar=document.getElementById(`${id}`)
 overlayAMostrar.style.display="flex"
}
function closeDeleteAccountOverlay(){
    overlayBorrarCuenta.style.display="none";
    transparenciaOverlayModificarPass.style.display="none"
}

async function axiosDeleteRequest() {
    let errorContainerDeleteReq = document.getElementById("errorContainerDeleteReq");
     errorContainerDeleteReq.textContent=""; 
    let passwordACotejar = document.getElementById("passwordDeleteReq").value
    try {
        await axios.delete("/api/v1/rodribook/user/"+params,{data:{ data: passwordACotejar }})
            window.location.replace("/user/login"); 
    } catch (error) {
        errorContainerDeleteReq.textContent=error.response.data
    }
    
}
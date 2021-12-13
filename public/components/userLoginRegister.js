const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password")
const errorContainerLogin = document.getElementById("errorContainerLogin");

loginForm.addEventListener("submit", async (e)=>{
    errorContainerLogin.textContent=""
    e.preventDefault();
    try {
        await axios.post("/user/login", {email:emailInput.value, password:passInput.value})
        window.location.replace("/");
    } catch (error) {
        errorContainerLogin.textContent=error.response.data
    }
})


const emailInputRegisterForm = document.getElementById("emailReg");
const passInputRegisterForm = document.getElementById("passwordReg");
const confirmPassInputRegisterForm = document.getElementById("confirmPasswordReg");
const nameinputRegisterForm = document.getElementById("nombreReg");
const errorContainerRegister = document.getElementById("errorContainerRegister")
const successContainerRegister = document.getElementById("successContainerRegister")

async function axiosRegisterPost(){
    errorContainerRegister.textContent ="";
    successContainerRegister.textContent=""
    const password = passInputRegisterForm.value;
    const confirmPassword = confirmPassInputRegisterForm.value;
    const email = emailInputRegisterForm.value;
    const name =nameinputRegisterForm.value;
    try {

        /*---------------FALTA DEPURAR DATOS FRONT END----------------------------------*/
        await axios.post("/user/register", {email:email, password:password, name: name, confirmPassword})
        successContainerRegister.textContent="Te registraste exitosamente. Podés inicar sesión."
      
    } catch (error) {
        if(error.response.status ==400){
            errorContainerRegister.textContent=error.response.data;
        } else if(error.response.status ==409){
            errorContainerRegister.textContent=error.response.data;
        }   
        else {
            errorContainerRegister.textContent= "Ocurrió un error. Intenta de nuevo más tarde." 
        }
    }

}



let overlayRegister=document.getElementById("transparenciaOverlay")
function showOverlay(){
 overlayRegister.style.display="flex"
}
function closeRegisterOverlay(){
    overlayRegister.style.display="none"
}
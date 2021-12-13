const emoticonsDOM = document.querySelector(".emoticons");
let textArea = document.getElementById("inputSaludo");

emoticonsDOM.addEventListener("click", (e)=>{
    if(e.target.tagName =="BUTTON") { 
        textArea.value += e.target.innerText
        textArea.focus();
    }
    return
})

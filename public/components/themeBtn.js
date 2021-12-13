const themeBtn = document.getElementById("Cboxtheme")
if(JSON.parse(localStorage.getItem("dark"))){
    themeBtn.checked = true;
    goDark();
} else {
    diosTeIluminara();
}

themeBtn.addEventListener("change", (e)=>{
    if(!e.target.checked){
        diosTeIluminara();
      
    }else { /*--------------DARK MODE-------------------------*/
        goDark();
        }
})

function diosTeIluminara(){
    localStorage.setItem("dark", false)
    /*----cambiar root colors-----------*/
    document.documentElement.style.setProperty("--white","#fff")
    document.documentElement.style.setProperty("--white2","rgb(248, 242, 242)");
    document.documentElement.style.setProperty("--fbBody","#18191a")
    document.documentElement.style.setProperty("--overlayReg","rgba(254,254,254,.8)")
    document.documentElement.style.setProperty("--whiteMainTag","white")
    document.documentElement.style.setProperty("--fbBlueOficial2","#4569b1")
    document.documentElement.style.setProperty("--fbFontGrey", "rgb(66, 66, 75)")  
    
}
function goDark(){
    localStorage.setItem("dark", true)
    document.documentElement.style.setProperty("--white","#18191a");
    document.documentElement.style.setProperty("--white2","#242526");
    document.documentElement.style.setProperty("--fbBody","#fff");
    document.documentElement.style.setProperty("--overlayReg","rgba(0,0,0,.9)")
    document.documentElement.style.setProperty("--whiteMainTag","#242526")
    document.documentElement.style.setProperty("--fbBlueOficial2","rgb(66, 66, 75)")  
    document.documentElement.style.setProperty("--fbFontGrey", "#9a9da1")  

    
}
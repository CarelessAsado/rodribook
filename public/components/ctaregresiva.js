const fechaDeadline = new Date("Mon Jan 1 2022 00:00:00 GMT-0300") 

/* const fechaDeadline = new Date(2022,1,1) */
const itemsDeadline = document.querySelectorAll("#cuentaRegresiva h4");
const newYearIMGContainer = document.querySelector(".container-timer");
const newYearHeader = document.querySelector(".texto-cuentaRegresiva")

let interv=setInterval(function(){
    let ahora = Date.now()
    if(ahora >= fechaDeadline.getTime()){
        clearInterval(interv)
        newYearHeader.textContent = "¡Rodribook te desea un feliz año nuevo! ¡Que se cumplan todos tus deseos!"
        return newYearIMGContainer.innerHTML=`<img src="/public/img/newYear.webp" id="newYear2022IMG" alt="Feliz año 2022."></img>`
    }
    let milliSecsToDeadline = fechaDeadline.getTime()- ahora;

    let weeks = Math.floor(milliSecsToDeadline/1000/60/60/24/7);
    let days = Math.floor(milliSecsToDeadline/1000/60/60/24%7);

    let horas = Math.floor(milliSecsToDeadline/1000/60/60%24);
    horas = equalize(horas)
    let mins = Math.floor(milliSecsToDeadline/1000/60%60);
    mins = equalize(mins)
    let secs = Math.floor(milliSecsToDeadline/1000%60)
    secs = equalize(secs)

    function equalize(item){
        if(item<10){
            return "0"+item 
        }
        return item
    }
    itemsDeadline[0].textContent = weeks;
    itemsDeadline[1].textContent = days;
    itemsDeadline[2].textContent = horas;
    itemsDeadline[3].textContent = mins;
    itemsDeadline[4].textContent = secs;
}, 1000) 

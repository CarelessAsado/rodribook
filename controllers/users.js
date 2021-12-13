const User = require("../models/User");
const bcrypt = require("bcrypt");

function getLogin(req,res){
    res.sendFile (process.cwd() +"/public/html/userLogin.html");
}
async function postLogin(req,res){
    const {email, password}=req.body;
    try {
   
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json("Usuario o contraseña no coinciden.")
        }
        
        if (await bcrypt.compare(password,user.password)){
            req.session.isAuth = user._id;
               return res.status(200).end();
           }
        else {
            return res.status(401).json("Usuario o contraseña no coinciden.")
        }

    } catch (error) {
        res.status(500).json(error);
    }

}

async function postRegister(req,res){
    const {email, password,confirmPassword,name:nombre}=req.body;
    /*---------------PRE VALIDATION------------------------*/
    let errorString =""
    if(!email||!confirmPassword||!password||!nombre){
       errorString +="No puede haber campos vacíos. "
    } 
    if (password && (password.length < 6||password.length >15 )){
        errorString += "La contraseña debe tener entre 6 y 15 carácteres. "
    } 
    if (password &&confirmPassword !=password){
        errorString +="Las contraseñas no condicen. "
    }  
    if (errorString){
        return res.status(400).json(errorString)
    }
    /*----------------------Se hashea la Pass y se guarda en Db-----------------*/
    try {
        let passHashed = await bcrypt.hash(password,10)
        let newUser = new User({email,password:passHashed,nombre})
        await newUser.save();
        res.status(201).end();
    } catch (error) {
        if(error.name=="ValidationError"){
            let errors = Object.values(error.errors).map(val => val.message)
            if(errors.length > 1){
               return res.status(400).json(errors.join(" "))
            }
            else {return res.status(400).json(errors)
            }
        //DUPLICATE KEY
        } else if(error.code && error.code == 11000){
            res.status(409).send("Ya existe un usuario registrado con ese mail.")
        }
        else {
            res.status(500).json(error);
        }
    }
}

function goToProfile(req,res){
    res.sendFile(process.cwd()+"/public/html/userProfile.html")
}

function logOut(req,res){

    req.session.destroy((error)=>{

    if(error){
        throw error
    }
    res.redirect("/user/login")
    })
} 

module.exports = {getLogin,postLogin,postRegister, goToProfile,logOut}
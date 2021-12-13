const User = require("../models/User");
const bcrypt = require("bcrypt");

async function findProfileUser(req,res){
    try {
        const user =await User.findOne({_id:req.params.id});
        console.log(user, "probar con 2 o + user y borrar dsp");
         if (!user){
            return res.status(404).json("No se ha encontrado ningún usuario.")
        } 
        res.json(user)
    } catch (error) {
        res.status(404).json("Ha ocurrido un error, intenta de nuevo más tarde.")
    }

}

async function updatePasswordUser(req,res){
    console.log(req.body , "+ estamos en password patch update");
    let {oldPasswordChange,newPasswordChange, confirmNewPasswordChange}=req.body
    /*------------------PRE MONGOOSE VALIDATION----------------------------------*/
    let errorString =""
    if(!oldPasswordChange ||!newPasswordChange ||!confirmNewPasswordChange){
        errorString += "No puede haber campos vacíos. "
    }
    if(newPasswordChange!=confirmNewPasswordChange){
        errorString+="Las contraseñas nuevas no son idénticas. ";
    }
    if(newPasswordChange.length>15 ||newPasswordChange.length<6){
        errorString+="La contraseña debe tener entre 6 y 15 carácteres. "
    } 
    if(newPasswordChange==oldPasswordChange){
        errorString+="La vieja y la nueva contraseñas son idénticas. "
    }
    if (errorString){
        return res.status(400).json(errorString)
    }
    /*-----------------------------BCRYPT +  MONGOOSE------------------------*/
    try{
        const user =await User.findOne({_id:req.params.id});
        if (!user){
            return res.status(404).json("No se ha encontrado ningún usuario.")
        }        
        if (await bcrypt.compare(oldPasswordChange,user.password)){
            const hashedPass = await bcrypt.hash(newPasswordChange,10)
            user.password = hashedPass;
            user.save()
            return res.status(200).end();
        }else {
            return res.status(401).json("La contraseña vieja no es correcta.");
        } 
    }
    catch(error){
        if(error.name=="ValidationError"){
            let errors = Object.values(error.errors).map(val => val.message)
            if(errors.length > 1){
               return res.status(400).json(errors.join(" "))
            }
            else {return res.status(400).json(errors)
            }
        }else {
            res.status(500).json(error);
        }
    }
}
async function updateProfileUser(req,res){
    let {email,nombre}=req.body
    if(!email && !nombre){
        return res.status(404).json("No puede haber campos vacíos.")
    }
    try{
        const user =await User.findOne({_id:req.params.id});
        if (!user){
            return res.status(404).json("No se ha encontrado ningún usuario.")
        }  
        if(email){
                if(email == user.email){
                    return res.status(404).json("No hay cambios a almacenar.");
                }
        user.email = email
        }
        if(nombre) {
            if(nombre == user.nombre){
                return res.status(404).json("No hay cambios a almacenar.");
            }
            user.nombre = nombre
        }   
    
        const userUpdated = await user.save()
        res.json(userUpdated)
    }  catch (error) {
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
async function deleteProfileUser(req,res){
    try {
        let passwordACotejar=req.body.data;
       if(!passwordACotejar){
            return res.status(404).json("Campo vacío.")
        } 
        let user = await User.findOne({_id:req.params.id})
        if(!user){
            return res.status(404).json("No se ha encontrado tu usuario.")
        }
        if (await bcrypt.compare(passwordACotejar,user.password)){
            console.log("estamos en bcrypt");
            await User.findByIdAndDelete({_id:req.params.id})
            req.session.destroy((error)=>{
                if(error){
                    throw error
                }  
            })  
            return res.status(200).end();
        }
        res.status(401).json("La contraseña no coincide.")
    } catch (error) {
        res.status(404).json("Ha ocurrido un error, intentá de nuevo más tarde.")
    }
}

module.exports = {findProfileUser, updateProfileUser,updatePasswordUser,deleteProfileUser}
const mongoose = require("mongoose");

module.exports = {
    connectDB:function (url,cbServer, PORT){
        mongoose.connect(url, (req,res)=>{
           console.log("Atlas"); 
           cbServer(PORT);
        })

    }
}

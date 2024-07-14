const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smart_fluid_tech_crm')
.then(()=> {
    console.log("mongodb connected")
})
.catch(()=> {
    console.log('connection failed')
})

const userSchema = new mongoose.Schema({
   
        username : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true
        }, 
        password : {
            type : String,
            require : true
        }, 
        position : {
            type : String,
            require : true
        }, 
        photo : {
            type : String
            
        }
    
})

const userCollection = mongoose.model('userCollection', userSchema);

const collection = {
    userCollection
}

module.exports = collection
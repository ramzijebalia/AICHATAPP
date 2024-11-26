import mongoose from 'mongoose';


const userChatsSchema = new mongoose.Schema({  // teh chta history as we created in the newprompt file 
    userId: {   // usinng teh userid we will get the chat history
        type: String,
        required: true
    },
    chats:[
        {
            _id :{
                type: String,
                required: true
            },
            title :{
                type: String,
                required: true
            },
            createdAt :{
                type: Date,
                default: Date.now(),
            }, 
            
        }
    ]
} , [{timestamps: true}]);


export default mongoose.models.chat || mongoose.model('userChats', userChatsSchema); // we are exporting the model here
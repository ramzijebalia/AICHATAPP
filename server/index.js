import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import userChats from './models/userChats.js';
import Chat from './models/chat.js';


const port = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL}));
app.use(express.json());


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}


const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey:  process.env.IMAGE_KIT_PRIVATE_KEY
  });


app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});


app.post("/api/chats", async (req, res) => {
    const {userId , text} = req.body ;
    console.log("reqbody" , req.body);
    try{
        // create a new chat
        const newChat = new Chat({
            userId: userId ,
            history : [{role:"user" ,parts:{text} }]
        })

        const saveChat = await newChat.save();

        // check if teh userchat exist
        const usrChats = await userChats.find({userId: userId})
        // if the userchat does not exist create a new one
        if(!usrChats.length){
            // create a new user chat
            const newUserChat = new userChats({
                userId: userId,
                chats: [{_id: saveChat._id , title: text.substring(0,20)}] // take only  the first 20 caracters
            })
            await newUserChat.save();
        }
        else{
            // if exist push the chat to teh existing
            await userChats.updateOne({userId: userId}, {$push: {chats: {_id: saveChat._id , title: text.substring(0,20)}}})
        }
        res.status(201).send(newChat._id) //when we snet something  in teh input of teh dasjborad we will be redirected to  the chat page using this id


    } catch(error){
        console.log(error);
        res.status(400).send("Error creating chat !!!")
    }
});

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});
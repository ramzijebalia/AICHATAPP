import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import userChats from './models/userChats.js';
import Chat from './models/chat.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'


const port = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL , credentials: true}));
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


app.get("/api/upload", ClerkExpressRequireAuth(),(req, res) => { //we fonna use ths middleware to verify the user authentication
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

/*app.get("/api/test", ClerkExpressRequireAuth() ,async (req, res) => {
    const userId = req.auth.userId
    console.log(userId);
    res.send("Authenticated");
    }) */


app.post("/api/chats",ClerkExpressRequireAuth() , async (req, res) => {
    const userId = req.auth.userId ;
    const {text} = req.body ;
    try{
        // create a new chat
        const newChat = new Chat({
            userId: userId ,
            history : [{role:"user" ,parts:[{text}] }]
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


app.get("/api/userChats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try{
        
        const userChatss = await userChats.find({userId})
        res.status(200).send(userChatss[0].chats);  // we will send the first element of the array

    } 
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching chats !!!")
    }
})

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try{
        
        const chat = await Chat.findOne({_id: req.params.id , userId}) // we will get the chat with the id and the user id (the user id is used to make sure that the user is the owner of the chat)
        res.status(200).send(chat);  

    } 
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching chat !!!")
    }
})

// we  gonna update  our existing chats ( adding the ai messages )
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { question, answer  , img} = req.body;

    const newItems = [
        ...(question //w eused the conditional operator because when we create  a new chat the first of the user is already saved inthe db
                    // if there si a question snet teh user message s, if not snet an empty array
            ? [{role: "user" , parts: [{text: question }], ...(img && {img})} ]
            : []),
            { role: "model", parts: [{ text: answer }] },
    ]

    try{
        const updatedChat = await Chat.updateOne(
            {_id: req.params.id , userId}, 
            {$push: 
                {history: {
                    $each : newItems // it will add the new items to the existing history
                }} 
            }
        )
        res.status(200).send(updatedChat);  

    } 
    catch(err){
        console.log(err);
        res.status(500).send("Error  adding converstaion !!!")
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
})

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});
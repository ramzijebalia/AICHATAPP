import express from 'express';
import ImageKit from 'imagekit';

const port = process.env.PORT || 3001;
const app = express();


const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY
  });


app.get("/api/upload", (req, res) => {
    res.send("Test");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

require("dotenv").config({ path: "./.env" });

console.log("API Key:", process.env.DEEPINFRA_API_KEY); 
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData =require('form-data')
const app = express();
const port = 3000;
const path = require('path');
// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: 5173 });




// server.on('connection', (socket) => {
//     console.log('New client connected');
    
// });

// const socket = new WebSocket('ws://localhost:5173/socket');
// socket.onopen = () => console.log('WebSocket connection established');
// socket.onerror = (error) => console.error('WebSocket error:', error);

// Set up storage for multer
// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder

// Define the upload route
app.post('/upload', upload.single('file'), (req, res) => {
    // Now req.file will contain the uploaded file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Process the file (e.g., save it, transcribe it, etc.)
    res.send({ message: 'File uploaded successfully', file: req.file });
});
// Set up multer for file uploads
app.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
     
        const audioFilePath = req.file.path;
        const formData= new FormData();
       
        formData.append("audio", fs.createReadStream(audioFilePath));
        formData.append("model", "openai/whisper-large-v3");
      

        const response = await axios.post(
          "https://api.deepinfra.com/v1/inference/openai/whisper-medium.en",
          formData,
          {
              headers: {
                  ...formData.getHeaders(),
                  Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
              },
          }
      );
      
        res.json(response.data);
      
        console.log(" API Key:", process.env.DEEPINFRA_API_KEY);

        // Delete the uploaded file after processing
        fs.unlink(audioFilePath, (err) => {
          if (err) console.error("Error deleting file:", err);
      });

     
    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
});

// Endpoint to save transcription
app.post('/api/transcriptions', async (req, res) => {
    const {file } = req.body;

    const { data, error } = await supabase
        .from('transcriptions')
        .insert([{ text }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
});

// Endpoint to fetch transcriptions
app.get('/api/transcriptions', async (req, res) => {
    const { data, error } = await supabase
        .from('transcriptions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});




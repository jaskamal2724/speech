import fs from 'fs'; // File system module to handle file operations
import FormData from "form-data"; // FormData to create multipart/form-data request
import axios from "axios"; // Axios to send HTTP requests
import { PrismaClient } from '@prisma/client'; 
import { createClient } from '@supabase/supabase-js'; // Supabase client for database operations

// Environment variables for Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle audio file upload and transcription
export async function AudiofielUpload(req, res) {

    try {
        // Check if a file was uploaded in the request
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Creating form data to send the file for transcription
        const formData = new FormData();
        formData.append("audio", fs.createReadStream(req.file.path)); // Attaching audio file

        // Sending the file to the DeepInfra API for transcription
        const response = await axios.post(
            "https://api.deepinfra.com/v1/inference/openai/whisper-large", // DeepInfra API endpoint
            formData,
            {
                headers: {
                    Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`, // API key for authentication
                    ...formData.getHeaders(), // Adding appropriate headers for multipart data
                },
            }
        );

        // If response is received successfully
        if (response) {
            // Function to store transcription in the Supabase database
            async function createUser() {
                const { data, error } = await supabase
                    .from("User") // Targeting the "User" table in Supabase
                    .insert({ transcription: response.data.text }) // Inserting transcription
                    .select("transcription"); // Selecting the transcription field

                // Logging the stored transcription to the console
                console.log(data?.[0].transcription);

                // Sending the transcription as a response to the client
                res.status(200).json(data?.[0].transcription);
            }

            // Calling the function to save transcription
            createUser();
        } else {
            // If API response is not received, send an error response
            return res.status(400).json({ msg: "API did not respond" });
        }

        // Deleting the uploaded file from the server after processing
        fs.unlinkSync(req.file.path);
        return;
    } catch (error) {
        // Handling errors and sending appropriate response
        return res.status(500).json({ error: error.message });
    }
}
import postgres from 'postgres'

// Function to establish a connection to the Supabase database
async function connectDB() {
    try {
        // Retrieve database connection string from environment variables
        const connectionString = process.env.DATABASE_URL;

        // Initialize the PostgreSQL client using the connection string
        const sql = postgres(connectionString);

        // Log a success message with the database host
        console.log("Supabase connected successfully to host:", sql.options.host[0]);
    } 
    catch (error) {
        // Log an error message if the connection fails
        console.log("Connection failed:", error);
    }
}

// Export the function to be used elsewhere in the application
export default connectDB;

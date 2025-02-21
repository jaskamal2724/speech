import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with URL and API key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle user signup
const signUp = async (req, res) => {
    try {
        // Extract name, email, and password from request body
        const { name, email, password } = req.body;

        // Use Supabase authentication to sign up the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name // Store user's display name in metadata
                },
            },
        });

        // If there's an error during signup, return error response
        if (!data) {
            return res.status(400).json(error);
        }

        // Send a success response with the user's display name and email
        return res.status(200).json({
            Username: data.user.user_metadata.display_name,
            Email: data.user.email, // Fixed incorrect reference to email
            msg: "Signed up successfully"
        });

    } catch (error) {
        console.log("Sign up error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

    // Function to handle user sign-in
    const signIn = async (req, res) => {
        try {
            // Extract email and password from request body
            const { email, password } = req.body;

            // Use Supabase authentication to sign in the user
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            // If there's an error during sign-in, return error response
            if (error) {
                return res.status(400).json(error);
            }

            // Send a success response with the user's display name
            return res.status(200).json({
                Username: data.user.user_metadata.display_name,
                msg: "Sign in successful"
            });

        } catch (error) {
            console.log("Sign in error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

// Function to handle user sign-out
const signOut = async (req, res) => {
    try {
        // Use Supabase authentication to sign out the user
        const { error } = await supabase.auth.signOut();

        // If there's an error during sign-out, return error response
        if (error) {
            return res.status(400).json({ error: "Could not sign out" });
        }

        // Send a success response
        return res.status(200).json({ msg: "Signed out successfully" });

    } catch (error) {
        console.log("Sign out error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export authentication functions for use in other parts of the application
export { signUp, signIn, signOut };

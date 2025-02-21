// MyComponent.js or MyComponent.tsx
import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Log all environment variables for debugging
console.log('Environment Variables:', process.env);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

// Log the values to the console for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

const MyComponent = () => {
  // You can now use the supabase client in your component
  return (
    <div>
      <h1>My Supabase Component</h1>
      {/* Your component logic here */}
    </div>
  );
};

export default MyComponent;
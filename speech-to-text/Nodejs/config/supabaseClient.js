
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.VITE_SUPABASE_URL
// const supabaseKey = process.env.REACT_APP_ANON_KEY
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

//  export const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;



import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);




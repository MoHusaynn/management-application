# Supabase Database Setup Instructions

## 1. Execute SQL Commands
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor section
3. Copy and paste the contents of `supabase_setup.sql` into the editor
4. Click "Run" to execute the commands

## 2. Configure Environment Variables
Create a `.env` file in your project root with the following content:

```env
VUE_APP_SUPABASE_URL=your-supabase-url
VUE_APP_SUPABASE_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase project URL and anon/public key.

## 3. Install Supabase Client
If not already installed, add the Supabase client to your project:

```bash
npm install @supabase/supabase-js
```

## 4. Configure Supabase Client
Ensure you have a `src/supabase.js` file with the following content:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## 5. Test the Integration
The JobEntry form should now be fully integrated with Supabase. When submitting a job, it will:
- Generate sequential job and invoice numbers
- Store all job data in the Supabase database
- Handle errors appropriately

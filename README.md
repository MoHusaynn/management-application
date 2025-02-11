# Data Management Application

A comprehensive management application built with Flask and Supabase, designed to handle various management tasks efficiently. (This is not the Final Application. This project is actively being worked on).

## Features

- Job Management: Create, update, and track jobs with sequential numbering
- Invoice Management: Generate and manage invoices with automatic numbering
- User Management: Handle user accounts and permissions
- Data Validation: Robust validation for all form submissions
- Error Handling: Comprehensive error handling and logging

## Dependencies

The application requires the following packages to run:

- Flask
- Flask-CORS
- Flask-SQLAlchemy
- requests
- python-dotenv
- @supabase/supabase-js

## Description

This application provides a practical solution for managing various aspects of business operations. It offers an intuitive interface for:

- Tracking jobs and related activities
- Generating professional invoices
- Managing user permissions
- Maintaining accurate records

The application is built using modern web technologies and follows best practices for security and scalability.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure your Supabase integration (see Supabase setup instructions below)
4. Run the application:
   ```bash
   flask run
   ```

## Supabase Database Setup Instructions

### 1. Execute SQL Commands
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor section
3. Copy and paste the contents of `supabase_setup.sql` into the editor
4. Click "Run" to execute the commands

### 2. Configure Environment Variables
Create a `.env` file in your project root with the following content:
```env
VUE_APP_SUPABASE_URL=your-supabase-url
VUE_APP_SUPABASE_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase project URL and anon/public key.

### 3. Install Supabase Client
If not already installed, add the Supabase client to your project:
```bash
npm install @supabase/supabase-js
```

### 4. Configure Supabase Client
Ensure you have a `src/supabase.js` file with the following content:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 5. Test the Integration
The JobEntry form should now be fully integrated with Supabase. When submitting a job, it will:
- Generate sequential job and invoice numbers
- Store all job data in the Supabase database
- Handle errors appropriately

## Why This Application?

This management application is particularly useful for:
- Small to medium-sized businesses
- Teams needing to track multiple projects simultaneously
- Organizations requiring robust reporting features
- Businesses looking to streamline their operations

The application provides:
- Real-time data handling
- Scalable architecture
- User-friendly interface
- Comprehensive error handling

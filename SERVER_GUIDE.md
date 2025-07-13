# Running the BVI Company Formation App with Fake Server

This guide explains how to run the application with the JSON Server fake backend.

## Prerequisites

Make sure you have Node.js and npm installed on your system.

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Run Frontend and Backend Together (Recommended)
```bash
npm run dev:full
```
This command will start both the Vite development server (frontend) and JSON Server (fake backend) concurrently.

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Option 2: Run Separately

**Terminal 1 - Start the fake server:**
```bash
npm run server
```

**Terminal 2 - Start the frontend:**
```bash
npm run dev
```

## API Endpoints

The fake server provides the following endpoints:

- `GET /companies` - Get all submitted companies
- `POST /companies` - Submit a new company formation
- `GET /drafts` - Get all draft forms
- `POST /drafts` - Save a new draft
- `PUT /drafts/:id` - Update an existing draft
- `DELETE /drafts/:id` - Delete a draft
- `GET /submissions` - Get all submissions (legacy endpoint)

## Features with Fake Server

1. **Auto-save**: Form data is automatically saved to the server every 30 seconds and when changes are made (with 2-second debounce)

2. **Draft Management**: 
   - Save and continue later functionality
   - Multiple drafts can be stored
   - Latest draft is automatically loaded on page refresh

3. **Server Status**: 
   - Real-time server connection status indicator
   - Automatic fallback to localStorage when server is unavailable

4. **Form Submission**: 
   - Submit completed forms to the fake server
   - Drafts are automatically deleted after successful submission

5. **Offline Support**: 
   - Continues to work when server is down
   - Falls back to localStorage for data persistence

## Sample Data

The `db.json` file contains sample data including:
- Example company formation
- Sample shareholders, beneficial owners, and directors
- Pre-configured data structure

You can modify `db.json` to change the sample data or reset the database by stopping the server and editing the file.

## Development Notes

- The server runs on port 3001 to avoid conflicts with the Vite dev server (port 5173)
- All API calls include proper error handling with localStorage fallback
- Form validation is performed client-side before sending data to the server
- The app automatically detects server availability and adjusts functionality accordingly

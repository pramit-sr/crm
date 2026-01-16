# CRM Dashboard - Full Stack Application

A modern, mobile-responsive CRM (Customer Relationship Management) dashboard built with React, Node.js, Express, and MongoDB.

## Features

### Backend
- ✅ MongoDB integration with environment variable configuration
- ✅ RESTful API endpoints for leads management
- ✅ Server-side search, filtering, sorting, and pagination
- ✅ Analytics API for dashboard metrics
- ✅ Seed script to generate 1000 dummy leads

### Frontend
- ✅ Modern CRM-style UI with Tailwind CSS
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Login screen with basic authentication
- ✅ Dashboard with analytics metrics cards
- ✅ Leads table with:
  - Real-time search (by name or email)
  - Status and source filters
  - Sortable columns
  - Pagination
- ✅ Lead details page with comprehensive information
- ✅ Protected routes with authentication

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- @faker-js/faker (for seeding)

**Frontend:**
- React 19
- React Router DOM
- Axios
- Tailwind CSS 4
- Vite

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier) or local MongoDB installation
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and replace `<password>` with your database password
6. Add it to your `.env` file as `MONGO_URI`

**Example connection string:**
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/crm?retryWrites=true&w=majority
```

### 2. Seed the Database

```bash
cd backend
npm run seed
```

This will generate 1000 dummy leads in your database.

### 3. Start the Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads with pagination, search, filters, and sorting
  - Query parameters:
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 10)
    - `search` - Search by name or email
    - `status` - Filter by status (New, Contacted, Converted)
    - `source` - Filter by source (Website, Referral, Ads)
    - `sort` - Sort field (default: createdAt)
    - `order` - Sort order (asc/desc, default: desc)

- `GET /api/leads/:id` - Get a specific lead by ID

- `GET /api/leads/analytics/stats` - Get analytics metrics
  - Returns:
    - `totalLeads` - Total number of leads
    - `convertedLeads` - Number of converted leads
    - `conversionRate` - Conversion rate percentage
    - `leadsByStage` - Count of leads by status
    - `leadsBySource` - Count of leads by source

## Usage

1. **Login**: Navigate to the login page and enter any email and password (basic auth for demo purposes)

2. **Dashboard**: View analytics metrics and browse leads
   - Use the search bar to find leads by name or email
   - Filter by status or source using the dropdowns
   - Sort by clicking column headers or using the sort dropdown
   - Navigate pages using pagination controls

3. **Lead Details**: Click "View Details" on any lead to see comprehensive information

## Project Structure

```
crm/
├── backend/
│   ├── models/
│   │   └── Lead.js          # Mongoose Lead model
│   ├── routes/
│   │   └── leadRoutes.js    # API routes
│   ├── seed.js              # Database seeding script
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   └── LeadDetails.jsx # Lead details page
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features Breakdown

### Analytics Metrics
- **Total Leads**: Shows the total number of leads in the system
- **Converted Leads**: Number of leads with "Converted" status
- **New Leads**: Number of leads with "New" status
- **Contacted**: Number of leads with "Contacted" status
- **Conversion Rate**: Percentage of converted leads

### Search & Filters
- Real-time search across lead names and emails
- Filter by lead status (New, Contacted, Converted)
- Filter by lead source (Website, Referral, Ads)
- Combined filters work together

### Sorting
- Sort by creation date (newest/oldest first)
- Sort by name (A-Z / Z-A)
- Visual indicators show current sort field and direction

### Pagination
- Configurable items per page (default: 10)
- Page navigation with numbered pages
- Shows current range and total count

## Environment Variables

**Backend (.env):**
- `MONGO_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)

## Development

### Backend Scripts
- `npm start` - Start the server
- `npm run seed` - Seed the database with dummy data

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- Authentication is basic (localStorage-based) for demo purposes. In production, implement proper JWT or session-based authentication.
- The seed script will delete all existing leads before seeding new ones.
- All dates are stored in UTC and displayed in the user's local timezone.

## License

ISC

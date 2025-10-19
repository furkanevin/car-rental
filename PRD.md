# Product Requirements Document (PRD)

## Authentication System for MORENT Car Rental

### 1. Overview

Implement a complete authentication workflow using NextAuth.js to allow users to register, login, and logout from the MORENT car rental application.

### 2. Objectives

- Enable user registration with email and password
- Enable user login with credentials
- Store user data securely in MongoDB
- Display appropriate UI based on authentication state
- Maintain consistent design language with existing application

### 3. Technical Stack

- **Authentication**: NextAuth.js v5 (next-auth)
- **Database**: MongoDB with Mongoose ODM
- **Password Hashing**: bcryptjs
- **Session Management**: JWT tokens via NextAuth

### 4. User Data Model

Users collection in MongoDB will store:

- `email` (string, required, unique)
- `password` (string, required, hashed)
- `firstName` (string, required)
- `lastName` (string, required)
- `phone` (string, optional)
- `image` (string, optional) - for profile picture URL
- `createdAt` (date, auto-generated)
- `updatedAt` (date, auto-generated)

### 5. Features & Requirements

#### Phase 1: Database & Models Setup

- [ ] Install required dependencies (next-auth, mongoose, bcryptjs, @types/bcryptjs)
- [ ] Create MongoDB connection utility
- [ ] Create User Mongoose model with schema validation
- [ ] Set up environment variables for MongoDB connection

#### Phase 2: NextAuth Configuration

- [ ] Configure NextAuth with CredentialsProvider
- [ ] Set up JWT session strategy
- [ ] Create authentication API routes
- [ ] Configure session callbacks for user data

#### Phase 3: Registration System

- [ ] Create `/api/auth/register` endpoint
- [ ] Hash passwords before storing in database
- [ ] Validate email uniqueness
- [ ] Create registration page at `/auth/register`
- [ ] Implement responsive registration form with fields:
  - Email (required)
  - Password (required)
  - First Name (required)
  - Last Name (required)
  - Phone (optional)
- [ ] Add form validation and error handling
- [ ] Show success message and redirect to login

#### Phase 4: Login System

- [ ] Create login page at `/auth/login`
- [ ] Implement responsive login form with fields:
  - Email
  - Password
- [ ] Handle authentication via NextAuth signIn
- [ ] Display error messages for invalid credentials
- [ ] Redirect to home page after successful login

#### Phase 5: Header Integration

- [ ] Wrap application with SessionProvider
- [ ] Update header.tsx to use useSession hook
- [ ] Show "Login" and "Sign Up" links when user is not authenticated
- [ ] Show user profile picture when authenticated
- [ ] Add dropdown menu on profile picture with user info and logout option

#### Phase 6: Logout Functionality

- [ ] Implement logout using NextAuth signOut
- [ ] Clear session data
- [ ] Redirect to home page after logout

### 6. UI/UX Requirements

- Design should match existing MORENT brand colors:
  - Primary blue: #3563E9
  - Background: white
  - Text: gray-900, gray-600
- Forms should be:
  - Responsive (mobile-first approach)
  - Clean and modern
  - Include proper validation feedback
  - Show loading states during submission
- Error messages should be user-friendly
- Success states should be clearly indicated

### 7. Security Requirements

- Passwords must be hashed using bcryptjs (salt rounds: 10)
- Implement CSRF protection via NextAuth
- Use secure session cookies
- Validate all inputs on both client and server side
- Implement rate limiting for authentication endpoints (future enhancement)

### 8. File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts
│   │       └── register/
│   │           └── route.ts
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
├── components/
│   └── auth/
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── user-dropdown.tsx
├── lib/
│   ├── mongodb.ts
│   └── auth.ts
└── models/
    └── user.ts
```

### 9. Environment Variables

Required environment variables:

```
MONGODB_URI=mongodb://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
```

### 10. Success Criteria

- Users can successfully register with all required fields
- Users can login with email and password
- Users can logout
- Header displays correct UI based on auth state
- All pages are responsive and match design
- Passwords are securely hashed in database
- Sessions persist across page refreshes
- Form validation works correctly

### 11. Future Enhancements (Out of Scope)

- OAuth providers (Google, GitHub)
- Email verification
- Password reset functionality
- Two-factor authentication
- Profile editing
- Role-based access control

---

## Car Listing & Search System

### 1. Overview

Implement a comprehensive car listing system with search and filter capabilities to allow users to browse available rental cars.

### 2. Objectives

- Store car inventory in MongoDB
- Provide API endpoints for car listing and details
- Enable advanced filtering by multiple criteria
- Seed database with sample car data

### 3. Car Data Model

Cars collection in MongoDB will store:

- `make` (string, required) - Car manufacturer (e.g., "Toyota", "BMW")
- `modelName` (string, required) - Car model (e.g., "Camry", "3 Series")
- `year` (number, required) - Manufacturing year
- `transmission` (string, required) - "Automatic" or "Manual"
- `fuelType` (string, required) - "Petrol", "Diesel", "Electric", "Hybrid"
- `seats` (number, required) - Number of seats (2-8)
- `doors` (number, required) - Number of doors (2-5)
- `pricePerDay` (number, required) - Daily rental price in USD
- `images` (array of strings, required) - Array of image URLs
- `description` (string, required) - Detailed car description
- `features` (array of strings) - Available features (e.g., "Cruise Control", "Car Play")
- `location` (string, required) - Current location/city
- `isAvailable` (boolean, default: true) - Availability status
- `averageRating` (number, default: 0) - Average rating (0-5)
- `totalReviews` (number, default: 0) - Total number of reviews
- `mileage` (number, required) - Current mileage
- `color` (string, required) - Car color
- `licensePlate` (string, required, unique) - License plate number
- `carType` (string, required) - "Sedan", "SUV", "Sports", "Hatchback", "Coupe", etc.
- `createdAt` (date, auto-generated)
- `updatedAt` (date, auto-generated)

### 4. Features & Requirements

#### Phase 7: Car Model & Database Seeding

- [ ] Create Car Mongoose model with schema validation
- [ ] Create database seed script with diverse car inventory (10+ cars)
- [ ] Add npm script to run seed script
- [ ] Populate cars with realistic data and images

#### Phase 8: Car Listing API

- [ ] Create `/api/cars` GET endpoint
- [ ] Implement filtering by:
  - Car make/model (text search)
  - Car type (exact match)
  - Location (exact match)
  - Price range (min/max)
  - Transmission type (exact match)
  - Fuel type (exact match)
  - Number of seats (exact match or minimum)
- [ ] Add pagination support (limit, skip)
- [ ] Return total count of matching cars
- [ ] Sort by: price, rating, year (optional)

#### Phase 9: Car Details API

- [ ] Create `/api/cars/[id]` GET endpoint
- [ ] Return full car details by ID
- [ ] Handle invalid ID errors
- [ ] Return 404 for non-existent cars

### 5. API Specifications

#### GET /api/cars

Query Parameters:

- `make` - Filter by car make (partial match, case-insensitive)
- `model` - Filter by model name (partial match, case-insensitive)
- `carType` - Filter by car type (exact match)
- `location` - Filter by location (exact match)
- `minPrice` - Minimum price per day
- `maxPrice` - Maximum price per day
- `transmission` - Filter by transmission type
- `fuelType` - Filter by fuel type
- `seats` - Minimum number of seats
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `sortBy` - Sort field (price, rating, year)
- `sortOrder` - Sort order (asc, desc)

Response:

```json
{
  "cars": [...],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

#### GET /api/cars/[id]

Response:

```json
{
  "car": {...}
}
```

### 6. Sample Seed Data

Include diverse inventory:

- Economy cars (Toyota, Honda)
- Luxury cars (BMW, Mercedes)
- SUVs (Jeep, Land Rover)
- Sports cars (Porsche, Ferrari)
- Electric vehicles (Tesla)
- Various locations, prices, and features

---

## Home Page & Car Catalog UI

### 1. Overview

Implement a comprehensive home page with hero section, pick-up/drop-off interface (UI only), and car catalog sections displaying available rental cars.

### 2. Objectives

- Create an attractive hero section with promotional cards
- Display pick-up and drop-off UI elements (disabled state)
- Show popular cars section with sports cars
- Display recommended cars section with all car types
- Implement responsive design for mobile and desktop
- Fetch and display cars from the API

### 4. Car Listing Page (Catalog)

#### Objectives

- Provide a dedicated catalog at `/cars` with responsive grid layout
- Support filtering, sorting, and pagination via API query parameters
- Maintain URL state using query params so listings are shareable and back/forward friendly

#### Features & Requirements

- Filters (left sidebar on desktop, collapsible on mobile):
  - Car Type (All, Sedan, SUV, Sports, Hatchback, Coupe, Convertible, Van, Truck) → `carType`
  - Location (free text or preset options) → `location`
  - Price Range (min/max numeric) → `minPrice`, `maxPrice`
  - Transmission (All, Automatic, Manual) → `transmission`
  - Fuel Type (All, Petrol, Diesel, Electric, Hybrid) → `fuelType`
  - Number of Seats (minimum) → `seats`
- Top toolbar:
  - Search input (by make) → `make`
  - Sort select: Newest, Price Low→High, Price High→Low, Rating → `sortBy`, `sortOrder`
  - Results counter
- Pagination:
  - Query params: `page` (default 1), `limit` (default 12)
  - Show total pages, next/prev, numbered pages
- API usage: All interactions fetch from `GET /api/cars` using the parameters above; no client-side filtering
- Loading, empty, and error states are displayed

#### Acceptance Criteria

- Changing any filter/sort/search updates the URL and resets `page=1`
- The grid is responsive: 1 col (mobile), 2 cols (sm), 3 cols (lg), 4 cols (xl)
- Matches the style of provided design reference (spacing, colors, buttons)

### 3. Features & Requirements

#### Phase 10: Home Page UI Implementation

- [x] Create hero section with two promotional cards
  - Blue gradient backgrounds
  - Promotional text and call-to-action buttons
  - Car images positioned in cards
- [x] Implement Pick-Up and Drop-Off sections in unified card
  - Single white card containing both sections
  - Location, Date, and Time dropdowns (disabled)
  - Radio button indicators (blue for pick-up, light blue for drop-off)
  - Swap button centered between sections
  - Horizontal layout on desktop, vertical on mobile
  - Responsive layout with flex-grow sections
- [x] Create Popular Car section
  - Fetch sports cars from API (limit: 4)
  - Display section header with "View All" link to /cars
  - Grid layout: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
- [x] Create Recommendation Car section
  - Fetch top-rated cars from API (limit: 8)
  - Display section header
  - Grid layout: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
  - "Show more car" button navigates to /cars page
  - Display total car count (static: 120 Car)
- [x] Implement car card component
  - Car name (make + model) and type
  - Car image from Imagin.studio CDN
  - Specifications: fuel capacity, transmission, seats
  - Price per day
  - "Rent Now" button links to /cars/{id}
  - No like/favorite button
  - Hover effect with shadow
- [x] Implement responsive design
  - Mobile-first approach
  - Breakpoints: sm (640px), lg (1024px)
  - Proper spacing and layout adjustments
- [x] Convert to Server Component
  - Remove client-side state management
  - Server-side data fetching with async/await
  - No loading states needed (SSR)
- [x] Integrate Imagin.studio API for car images
  - Customer key: hrjavascript-master
  - Dynamic URL generation based on make and model
  - Lazy loading for images
- [x] Use proper color scheme
  - Background: #F6F7F9
  - Primary blue: #3563E9
  - Secondary blue: #54A6FF
  - Text colors: gray-900, gray-500

### 4. UI Components

#### Hero Cards

- Gradient backgrounds with promotional text
- Call-to-action buttons
- Car images positioned at bottom-right
- Responsive text sizing

#### Pick-Up/Drop-Off Section

- Single white background card containing both sections
- Disabled select dropdowns
- Section indicators (colored dots with outer ring)
- Vertical dividers between fields (desktop only)
- Swap button centered between sections
- Flexbox layout for equal-width sections
- Responsive: vertical on mobile, horizontal on desktop

#### Car Cards

- White background with rounded corners
- Car name and type at top
- Large centered car image
- Three specification icons with text
- Price and "Rent Now" button at bottom
- Hover shadow effect

### 5. API Integration

#### Internal API Endpoints

- GET `/api/cars?carType=Sports&limit=4` - Popular cars
- GET `/api/cars?limit=8&sortBy=averageRating&sortOrder=desc` - Recommended cars

#### External API Integration

- **Imagin.studio CDN** - Car images
  - Base URL: `https://cdn.imagin.studio/getImage`
  - Customer Key: `hrjavascript-master`
  - Parameters: `customer`, `make`, `modelFamily`, `angle`, `width`, `zoomType`
  - Example: `https://cdn.imagin.studio/getImage?customer=hrjavascript-master&make=bmw&modelFamily=x6&angle=01&width=800&zoomType=fullscreen`

### 6. Responsive Behavior

**Mobile (< 640px)**

- Single column layout for all sections
- Hero cards stacked vertically
- Pick-Up and Drop-Off stacked with swap button between
- Car cards in single column
- Full-width buttons and inputs

**Tablet (640px - 1023px)**

- Two columns for car cards
- Hero cards stacked or side-by-side
- Pick-Up and Drop-Off sections may stack

**Desktop (≥ 1024px)**

- Four columns for car cards
- Two hero cards side-by-side
- Pick-Up and Drop-Off side-by-side with centered swap button
- Maximum container width: 1440px

### 7. Success Criteria

- [x] Hero section displays correctly with promotional content
- [x] Pick-Up/Drop-Off sections in unified card with disabled UI elements
- [x] Popular cars section displays 4 sports cars
- [x] Recommended cars section displays 8 cars
- [x] Car cards show all required information without like button
- [x] Car images load from Imagin.studio CDN
- [x] "Show more car" button navigates to /cars page
- [x] "View All" link navigates to /cars page
- [x] "Rent Now" button navigates to /cars/{id} page
- [x] Responsive design works on mobile, tablet, and desktop
- [x] Server-side rendering (no client-side state)
- [x] All colors match the design specification
- [x] UI matches the provided mockup images

### 8. Future Enhancements (Out of Scope)

- Functional pick-up/drop-off date/time/location selection
- Search and filter functionality
- Booking functionality
- Favorite/like functionality
- User reviews and ratings display
- Map integration for locations

---

## Car Details Page

### 1. Overview

Create a server-rendered car details page at `/cars/[id]` that matches the visual style of the reference design. The page fetches full car data from the internal API and presents an image preview, key specs, description, rating, and pricing with a prominent “Rent Now” CTA.

### 2. Objectives

- Fetch a single car by ID from `GET /api/cars/[id]`
- Render a server component page (no client state required)
- Reuse existing helpers for image and fuel capacity
- Provide a simple loading state while server fetch runs

### 3. Features & Requirements

- Route: `/cars/[id]`
- Server component only for the page; no client hooks
- Data: `make`, `modelName`, `images`, `carType`, `transmission`, `fuelType`, `seats`, `pricePerDay`, `description`, `averageRating`, `totalReviews`, `location`
- Layout:
  - Left: hero image card with blue gradient and main car image; below it, a row of thumbnail previews
  - Right: details card with title, rating, short description, spec grid, price/day, and “Rent Now” button
- Images:
  - Use Imagin.studio CDN via `getCarImageUrl(make, model, angle)` for the hero and thumbnails (different angles)
- Loading state: lightweight skeleton in `src/app/cars/[id]/loading.tsx`
- Error cases:
  - Invalid or missing ID → 404 page
  - Not found from API → 404 page

### 4. Acceptance Criteria

- Navigating from a car card to `/cars/[id]` renders the details page SSR with live data
- Page displays: name, type, transmission, fuel capacity, seats, price/day, rating count, description, and images
- Visual style aligns with current design system (colors, spacings, rounded cards)
- No client-side state or effects in the page component

### 5. Implementation Notes

- Add `fetchCarById(id)` in `src/lib/cars.ts`
- Extend `Car` type with optional fields used by the detail page
- Create `src/app/cars/[id]/page.tsx` as a server component
- Create `src/app/cars/[id]/loading.tsx` for skeleton

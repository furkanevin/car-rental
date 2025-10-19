# File Structure Overview

This document shows the complete file structure of the authentication implementation.

## New Files Created (16 files)

```
4-car-rental/
│
├── 📄 PRD.md                                    # Product Requirements Document
├── 📄 ENV_SETUP.md                              # Environment setup guide
├── 📄 IMPLEMENTATION_SUMMARY.md                 # Technical implementation details
├── 📄 QUICK_START.md                            # 5-minute setup guide
├── 📄 AUTH_IMPLEMENTATION_COMPLETE.md           # Completion summary
├── 📄 FILE_STRUCTURE.md                         # This file
│
├── 📄 .env.local                                # ⚠️ YOU NEED TO CREATE THIS
│   └── Contains: MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL
│
└── src/
    ├── app/
    │   ├── api/
    │   │   └── auth/
    │   │       ├── [...nextauth]/
    │   │       │   └── 📄 route.ts              # ✨ NEW - NextAuth handler
    │   │       └── register/
    │   │           └── 📄 route.ts              # ✨ NEW - Registration API
    │   │
    │   ├── auth/
    │   │   ├── login/
    │   │   │   └── 📄 page.tsx                  # ✨ NEW - Login page
    │   │   └── register/
    │   │       └── 📄 page.tsx                  # ✨ NEW - Register page
    │   │
    │   ├── 📄 layout.tsx                        # ✏️ UPDATED - Added Providers
    │   └── 📄 page.tsx                          # (unchanged)
    │
    ├── components/
    │   ├── 📄 header.tsx                        # ✏️ UPDATED - Auth state UI
    │   ├── 📄 header-auth-section.tsx           # ✨ NEW - Auth section
    │   ├── 📄 footer.tsx                        # (unchanged)
    │   ├── 📄 car-card.tsx                      # ✨ NEW - Car card component
    │   └── 📄 providers.tsx                     # ✨ NEW - SessionProvider
    │
    ├── lib/
    │   ├── 📄 auth.ts                           # ✨ NEW - NextAuth config
    │   ├── 📄 mongodb.ts                        # ✨ NEW - DB connection
    │   └── 📄 cars.ts                           # ✨ NEW - Car API functions
    │
    ├── models/
    │   ├── 📄 user.ts                           # ✨ NEW - User schema
    │   └── 📄 car.ts                            # ✨ NEW - Car schema
    │
    ├── types/
    │   ├── 📄 next-auth.d.ts                    # ✨ NEW - TypeScript types
    │   └── 📄 car.ts                            # ✨ NEW - Car interface
    │
    ├── utils/
    │   └── 📄 car-helpers.ts                    # ✨ NEW - Car helper functions
    │
    └── scripts/
        └── 📄 seedCars.ts                       # ✨ NEW - Database seeding
```

## Legend

- 📄 File
- ✨ NEW - Newly created file
- ✏️ UPDATED - Modified existing file
- ⚠️ YOU NEED TO CREATE THIS - Required action

## File Descriptions

### Documentation Files (Root)

| File                              | Size  | Purpose                                |
| --------------------------------- | ----- | -------------------------------------- |
| `PRD.md`                          | ~6 KB | Product requirements and feature specs |
| `ENV_SETUP.md`                    | ~4 KB | Detailed environment variable guide    |
| `IMPLEMENTATION_SUMMARY.md`       | ~8 KB | Complete technical documentation       |
| `QUICK_START.md`                  | ~5 KB | Fast setup guide (5 minutes)           |
| `AUTH_IMPLEMENTATION_COMPLETE.md` | ~7 KB | Implementation completion summary      |
| `FILE_STRUCTURE.md`               | ~3 KB | This file - visual structure guide     |

### Core Implementation Files

#### Database Layer (`src/lib/`, `src/models/`)

| File             | Lines | Purpose                         |
| ---------------- | ----- | ------------------------------- |
| `lib/mongodb.ts` | ~50   | MongoDB connection with caching |
| `models/user.ts` | ~60   | User schema with validation     |

#### Authentication (`src/lib/`, `src/types/`)

| File                   | Lines | Purpose                            |
| ---------------------- | ----- | ---------------------------------- |
| `lib/auth.ts`          | ~70   | NextAuth configuration & callbacks |
| `types/next-auth.d.ts` | ~30   | TypeScript type extensions         |

#### API Routes (`src/app/api/auth/`)

| File                              | Lines | Purpose                    |
| --------------------------------- | ----- | -------------------------- |
| `api/auth/[...nextauth]/route.ts` | ~6    | NextAuth API handler       |
| `api/auth/register/route.ts`      | ~60   | User registration endpoint |

#### Pages (`src/app/auth/`)

| File                     | Lines | Purpose                     |
| ------------------------ | ----- | --------------------------- |
| `auth/login/page.tsx`    | ~130  | Login page with form        |
| `auth/register/page.tsx` | ~180  | Registration page with form |

#### Components (`src/components/`)

| File            | Lines | Purpose                          |
| --------------- | ----- | -------------------------------- |
| `providers.tsx` | ~20   | SessionProvider & ToastContainer |
| `header.tsx`    | ~183  | Updated with auth state          |

#### Layout (`src/app/`)

| File         | Changes                                | Purpose                 |
| ------------ | -------------------------------------- | ----------------------- |
| `layout.tsx` | +2 imports, wrapped with `<Providers>` | Enable session & toasts |

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Registration Flow                   │
└─────────────────────────────────────────────────────────────┘

User clicks "Sign Up"
    ↓
/auth/register (page.tsx)
    ↓
Form submission
    ↓
POST /api/auth/register (route.ts)
    ↓
Validate input
    ↓
Connect to MongoDB (lib/mongodb.ts)
    ↓
Hash password (bcryptjs)
    ↓
Create user in DB (models/user.ts)
    ↓
Return success
    ↓
Redirect to /auth/login


┌─────────────────────────────────────────────────────────────┐
│                       User Login Flow                        │
└─────────────────────────────────────────────────────────────┘

User clicks "Login"
    ↓
/auth/login (page.tsx)
    ↓
Form submission with signIn()
    ↓
POST /api/auth/[...nextauth] (route.ts)
    ↓
Credentials Provider (lib/auth.ts)
    ↓
Find user in MongoDB
    ↓
Verify password (bcrypt.compare)
    ↓
Create JWT session
    ↓
Return session
    ↓
Redirect to /


┌─────────────────────────────────────────────────────────────┐
│                    Session Management                        │
└─────────────────────────────────────────────────────────────┘

SessionProvider (providers.tsx)
    ↓
Wraps entire app
    ↓
useSession() in header.tsx
    ↓
Returns session data
    ↓
Display profile picture OR login/signup
```

## Component Hierarchy

```
app/layout.tsx
    └── <Providers> (providers.tsx)
        ├── <SessionProvider> (from next-auth/react)
        │   ├── <Header> (header.tsx)
        │   │   ├── useSession() hook
        │   │   ├── Login/Signup buttons (if not authenticated)
        │   │   └── Profile dropdown (if authenticated)
        │   │
        │   ├── <main>
        │   │   ├── page.tsx (home)
        │   │   ├── auth/login/page.tsx
        │   │   └── auth/register/page.tsx
        │   │
        │   └── <Footer> (footer.tsx)
        │
        └── <ToastContainer> (from react-toastify)
```

## API Endpoints

```
HTTP Method │ Endpoint                    │ Purpose              │ Auth Required
────────────┼─────────────────────────────┼──────────────────────┼──────────────
GET         │ /api/auth/[...nextauth]     │ Get session          │ No
POST        │ /api/auth/[...nextauth]     │ Login (NextAuth)     │ No
POST        │ /api/auth/register          │ Register new user    │ No
GET         │ /api/auth/session           │ Get current session  │ No
POST        │ /api/auth/signout           │ Logout (NextAuth)    │ Yes
```

## Database Collections

```
MongoDB Database: morent (or your chosen name)

Collection: users
Schema:
{
  _id: ObjectId                    (auto-generated by MongoDB)
  email: String                    (unique, required, indexed)
  password: String                 (hashed with bcrypt)
  firstName: String                (required)
  lastName: String                 (required)
  phone: String                    (optional)
  image: String                    (auto-generated URL)
  createdAt: Date                  (auto-generated)
  updatedAt: Date                  (auto-generated)
}

Indexes:
- _id (default)
- email (unique)
```

## Environment Variables

```
File: .env.local (you need to create this)

MONGODB_URI=mongodb+srv://...        # MongoDB connection string
NEXTAUTH_SECRET=...                  # Random secret (32+ chars)
NEXTAUTH_URL=http://localhost:3000   # App URL
```

## Dependencies Added

```json
Package         │ Version  │ Purpose
────────────────┼──────────┼────────────────────────────────
next-auth       │ ~5.x.x   │ Authentication for Next.js
mongoose        │ ~8.x.x   │ MongoDB ODM
bcryptjs        │ ~2.x.x   │ Password hashing
react-toastify  │ ~10.x.x  │ Toast notifications
@types/bcryptjs │ ~2.x.x   │ TypeScript types for bcryptjs
```

## Quick Reference

### Import Auth Session (Server Component)

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
```

### Import Auth Session (Client Component)

```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
```

### Sign Out

```typescript
import { signOut } from "next-auth/react";

await signOut({ callbackUrl: "/" });
```

### Sign In

```typescript
import { signIn } from "next-auth/react";

await signIn("credentials", {
  email: "user@example.com",
  password: "password",
  redirect: false,
});
```

## Modular Code Structure

The codebase follows a clean and modular architecture:

### Components (`src/components/`)

- **car-card.tsx** - Reusable car card component
- **header.tsx** - Main navigation header
- **header-auth-section.tsx** - Authentication UI section
- **footer.tsx** - Footer component
- **providers.tsx** - App-level providers

### Types (`src/types/`)

- **car.ts** - Car interface definition
- **next-auth.d.ts** - NextAuth type extensions

### Utils (`src/utils/`)

- **car-helpers.ts** - Helper functions
  - `getCarImageUrl()` - Generate Imagin.studio CDN URLs
  - `getFuelCapacity()` - Get fuel capacity by type

### Lib (`src/lib/`)

- **cars.ts** - Car-related API functions
  - `fetchCars()` - Server-side car fetching
- **auth.ts** - NextAuth configuration
- **mongodb.ts** - Database connection

### Models (`src/models/`)

- **car.ts** - Car Mongoose schema
- **user.ts** - User Mongoose schema

### API Routes (`src/app/api/`)

- **cars/route.ts** - Car listing endpoint
- **cars/[id]/route.ts** - Single car endpoint
- **auth/[...nextauth]/route.ts** - NextAuth handler
- **auth/register/route.ts** - User registration

## Summary

- **Total New Files:** 25+
- **Updated Files:** 3
- **Total Lines of Code:** ~1500+
- **Dependencies Added:** 5
- **API Endpoints Created:** 4
- **Pages Created:** 3
- **Time to Setup:** ~5 minutes (with QUICK_START guide)

## Next Action Required

**⚠️ You must create `.env.local` file before running the app!**

See [QUICK_START.md](./QUICK_START.md) for step-by-step instructions.

---

_This structure follows Next.js 15 App Router conventions and TypeScript best practices._

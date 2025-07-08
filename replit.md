# Tidal Serverside - Roblox Server-Side Executor

## Overview

This is a full-stack web application for "Tidal Serverside," a Roblox server-side executor platform. The application features a modern, dark-themed frontend with neon accents and particle effects, built with React and TypeScript. The backend is implemented using Express.js with a PostgreSQL database managed through Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom dark theme and neon color scheme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with `/api` prefix routing

### Database Schema
- **Users Table**: Basic user management with id, username, and password fields
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Frontend Components
1. **Home Page** (`client/src/pages/home.tsx`): Landing page with animated particle background and loading screen
2. **UI Components**: Comprehensive shadcn/ui component library in `client/src/components/ui/`
3. **Styling**: Custom dark theme with authentic teal/cyan color scheme matching Tidal branding
4. **Mobile Responsive**: Responsive design with mobile-first approach

### Backend Components
1. **Server Setup** (`server/index.ts`): Express server with middleware configuration
2. **Routes** (`server/routes.ts`): API route definitions (currently minimal)
3. **Storage Layer** (`server/storage.ts`): Data access layer with in-memory implementation
4. **Vite Integration** (`server/vite.ts`): Development server setup with HMR

### Shared Components
1. **Schema Definitions** (`shared/schema.ts`): Database schema and TypeScript types
2. **Type Safety**: Shared types between frontend and backend

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Currently uses in-memory storage with interface for database integration
4. **Response Handling**: Standardized JSON responses with error handling
5. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Data Fetching**: TanStack Query
- **Utilities**: date-fns, cmdk, embla-carousel

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL), Drizzle ORM
- **Server**: Express.js, connect-pg-simple for sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build**: Vite, TypeScript compiler
- **Database**: Drizzle Kit for migrations
- **Linting/Formatting**: Not explicitly configured
- **Replit Integration**: Vite plugins for Replit environment

## Deployment Strategy

### Development Environment
- **Dev Server**: `npm run dev` runs TypeScript server directly with tsx
- **Hot Reload**: Vite provides HMR for frontend changes
- **Database**: Development database connection via DATABASE_URL

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Node.js server to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`
- **Startup**: `npm start` runs production server

### Platform Considerations
- **Replit Optimized**: Includes Replit-specific Vite plugins and banner
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection
- **Asset Handling**: Static assets served from build directory

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Updated color scheme to authentic Tidal brand colors (teal/cyan theme)
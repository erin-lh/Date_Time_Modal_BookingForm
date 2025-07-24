# Setup Guide

This guide will help you set up the Calendar Booking Form project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Step-by-Step Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd calendar-booking-form
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required dependencies including:
- Next.js 15.2.4
- React 19
- Tailwind CSS
- shadcn/ui components
- TypeScript
- Lucide React icons

### 3. Environment Setup

The project doesn't require environment variables for basic functionality, but if you plan to add API integrations, create a `.env.local` file:

\`\`\`bash
# .env.local (optional)
NEXT_PUBLIC_API_URL=your-api-url
\`\`\`

### 4. Development Server

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

### 5. Verify Installation

Check that everything is working:

1. Open `http://localhost:3000` in your browser
2. You should see the booking form
3. Test the calendar functionality:
   - Select different booking types
   - Enter property details
   - Choose property access method
   - Select dates and times in the calendar
   - Verify the collapse/expand functionality

## Project Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration (`tailwind.config.ts`) with:
- Custom color scheme
- shadcn/ui integration
- Responsive breakpoints
- Animation utilities

### TypeScript

TypeScript is configured with strict mode enabled. Key configuration files:
- `tsconfig.json` - TypeScript compiler options
- Path aliases configured for clean imports (`@/` points to root)

### Next.js

Next.js configuration (`next.config.mjs`) includes:
- ESLint and TypeScript error handling for builds
- Image optimization disabled for static exports
- Development optimizations

## File Structure Overview

\`\`\`
calendar-booking-form/
├── app/                     # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── components/             
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
├── booking-form.tsx       # Main booking form component
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.mjs        # Next.js configuration
\`\`\`

## Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
\`\`\`

## Troubleshooting

### Common Issues

1. **Port already in use**
   \`\`\`bash
   # Use a different port
   npm run dev -- -p 3001
   \`\`\`

2. **Module not found errors**
   \`\`\`bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **TypeScript errors**
   \`\`\`bash
   # Check TypeScript configuration
   npx tsc --noEmit
   \`\`\`

4. **Styling issues**
   \`\`\`bash
   # Rebuild Tailwind CSS
   npm run build
   \`\`\`

### Development Tips

1. **Hot Reload**: The development server supports hot reload for instant updates
2. **TypeScript**: Use VS Code with TypeScript extension for best experience
3. **Tailwind**: Install Tailwind CSS IntelliSense extension for class autocomplete
4. **Debugging**: Use React Developer Tools browser extension

## Next Steps

After setup, you might want to:

1. **Customize the design** - Modify colors, spacing, and layout
2. **Add API integration** - Connect to your backend services
3. **Implement validation** - Add form validation and error handling
4. **Add testing** - Set up Jest and React Testing Library
5. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform

## Getting Help

If you encounter issues:

1. Check the console for error messages
2. Verify all dependencies are installed correctly
3. Ensure Node.js version compatibility
4. Review the GitHub issues for similar problems
5. Create a new issue with detailed error information

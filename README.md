# Calendar Booking Form

A modern, responsive booking form with an intuitive calendar interface built with Next.js, React, and Tailwind CSS.

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/littlehingesvtt-8060s-projects/v0-calendar-redesign-needed)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/OeUsoie7Y0d)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Calendar**: Clean, compact calendar interface with date and time selection
- **Flexible Booking Options**: Support for both specific time slots and flexible booking
- **Collapsible Interface**: Calendar collapses to show booking summary after selection
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Accessibility**: Full keyboard navigation and screen reader support

## Demo

The booking form includes:
- Booking type selection (Sales, Property Management, Commercial, Other)
- Property address search with manual entry option
- Property details input (bedrooms, bathrooms, car spaces, size)
- Property access options (Meet Onsite, Lockbox, Key Collection)
- Calendar with date and time selection
- Flexible booking option as alternative to specific times

## Tech Stack

- **Framework**: Next.js 15.2.4
- **React**: 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd calendar-booking-form
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/
│   └── utils.ts             # Utility functions
├── booking-form.tsx         # Main booking form component
└── public/                  # Static assets
\`\`\`

## Key Components

### BookingForm Component

The main component (`booking-form.tsx`) handles:
- Form state management
- Calendar expand/collapse functionality
- Date and time selection logic
- Flexi booking options

### Calendar Features

- **Compact Layout**: 5-column grid showing available dates
- **Time Slots**: Standard time options (08:30, 11:00, 13:30, 15:30)
- **Flexi Booking**: Alternative flexible booking option
- **Collapse/Expand**: Shows summary after selection with edit capability

## Customization

### Adding New Time Slots

Edit the `timeSlots` array in `booking-form.tsx`:

\`\`\`typescript
const timeSlots = ["08:30", "11:00", "13:30", "15:30", "16:00"] // Add new times
\`\`\`

### Modifying Booking Types

Update the `bookingTypes` array:

\`\`\`typescript
const bookingTypes = ["Sales", "Property Management", "Commercial", "Other", "Inspection"]
\`\`\`

### Styling Changes

The project uses Tailwind CSS. Key styling files:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- Individual components use Tailwind classes

### Calendar Availability

To add dynamic availability, modify the `calendarDays` array structure:

\`\`\`typescript
const calendarDays = [
  { day: "Fri", date: "25", available: true, flexiAvailable: true },
  { day: "Mon", date: "28", available: true, flexiAvailable: false },
  // ...
]
\`\`\`

## API Integration

To connect to a backend:

1. Replace static data with API calls
2. Add loading states
3. Implement error handling
4. Add form validation

Example API integration points:
- Property address search
- Available time slots
- Booking submission
- Calendar availability

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
\`\`\`bash
npm run build
\`\`\`

The built files will be in the `.next` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include browser and version information

Your project is live at:

**[https://vercel.com/littlehingesvtt-8060s-projects/v0-calendar-redesign-needed](https://vercel.com/littlehingesvtt-8060s-projects/v0-calendar-redesign-needed)**

Continue building your app on:

**[https://v0.dev/chat/projects/OeUsoie7Y0d](https://v0.dev/chat/projects/OeUsoie7Y0d)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

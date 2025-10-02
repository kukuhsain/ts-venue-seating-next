# Venue Seating Map

An interactive, accessible venue seating selection application built with Next.js, TypeScript, and Tailwind CSS. This application provides an intuitive interface for users to browse, select, and manage seats for events.

## 🎯 What is This Project?

This is a modern web application that allows users to:
- View an interactive SVG-based seating map of a venue
- Select seats for an event (up to 8 seats)
- Visualize seat availability, pricing, and status in real-time
- Find adjacent seats automatically for groups
- Manage their selections with persistent local storage

## ✨ Features

### Core Functionality
- **Interactive Seating Map**: SVG-based visualization with clickable seats
- **Seat Selection**: Select up to 8 seats with real-time visual feedback
- **Seat Status Indicators**: Different colors for available, selected, reserved, sold, and held seats
- **Selection Summary**: View all selected seats with pricing breakdown and total
- **Seat Details Panel**: Real-time information display for focused/hovered seats

### Advanced Features
- **Find Adjacent Seats**: Automatically locate and select N consecutive seats (2-8) in the same row
- **Heat-map View**: Toggle visualization to show seats colored by price tier instead of status
- **Dark Mode**: Full dark mode support with manual toggle (independent of system settings)
- **Local Storage Persistence**: Selected seats are saved and restored after page reload

### Accessibility & UX
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space, Shift+Tab)
- **ARIA Labels**: Comprehensive screen reader support with descriptive labels
- **Focus Indicators**: Clear visual feedback for keyboard navigation
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Transitions**: Polished animations and color transitions

### Technical Features
- **TypeScript**: Fully typed codebase for better development experience
- **Custom Hooks**: Reusable hooks for venue data fetching, local storage, and dark mode
- **Component Architecture**: Clean, modular component structure
- **Lucide Icons**: Modern, consistent iconography
- **Tailwind CSS**: Utility-first styling with dark mode support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ts-venue-seating-next
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
pnpm build
```

Then start the production server:
```bash
npm start
# or
pnpm start
```

## 🎨 Price Tiers

- **Tier 1**: $150 (Premium seats)
- **Tier 2**: $100 (Standard seats)
- **Tier 3**: $75 (Economy seats)
- **Tier 4**: $50 (Budget seats)

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📁 Project Structure

```
ts-venue-seating-next/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── SeatingMap.tsx   # Main seating map component
│   ├── SeatDetails.tsx  # Seat details panel
│   └── SelectionSummary.tsx # Selected seats summary
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts  # Dark mode management
│   ├── useLocalStorage.ts # Local storage persistence
│   └── useVenue.ts     # Venue data fetching
├── types/              # TypeScript type definitions
│   └── venue.ts        # Venue and seat types
└── public/             # Static assets
    └── venue.json     # Venue data
```

## 🔮 Future Enhancements

- Multiple venue support
- Seat reservation with time limits
- Zoom and pan controls for large venues
- Filter seats by price range
- Export selection as PDF/email
- Multi-language support

## 📄 License

This project is open source and available under the MIT License.

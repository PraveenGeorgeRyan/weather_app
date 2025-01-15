# Weather Forecast Application

A modern, responsive weather forecast application built with Next.js and TypeScript. The application provides real-time weather information and 3-day forecasts using the Open-Meteo API, featuring a clean and intuitive user interface.

## Key Features

- **Smart Location Search**:
  - Intelligent city suggestions with state/country context
  - Population-based ranking for major cities
  - Special handling for cities with multiple locations
  - Real-time search suggestions

- **Weather Information**:
  - Current temperature and conditions
  - High/low temperature forecasts
  - Sunrise and sunset times
  - 3-day weather forecast
  - Weather condition icons

- **User Experience**:
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intelligent error handling
  - Loading state indicators

## Technology Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **UI Components**: 
  - Framer Motion (animations)
  - Hero Icons
- **API**: Open-Meteo (free, no API key required)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ShoshinTech22/Recruitment-2661-Praveen-George-Ryan.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js app router components
├── components/       # Reusable UI components
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   └── ForecastSection.tsx
├── hooks/           # Custom React hooks
│   ├── useWeather.ts
│   └── useCitySuggestions.ts
├── services/        # API integration
│   └── weatherApi.ts
└── types/           # TypeScript type definitions
    └── weather.ts
```

## Features in Detail

### Intelligent Search
- Smart city suggestions with context
- Population-based city ranking
- Duplicate city handling
- Real-time search updates

### Weather Display
- Current conditions
- Temperature ranges
- Sunrise/sunset times
- 3-day forecast
- Weather icons

### User Interface
- Clean, modern design
- Responsive layouts
- Loading indicators
- Error messages
- Smooth transitions

## Browser Support

Supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Efficient data fetching with React Query
- Debounced search inputs
- Optimized re-renders
- Lazy loading components
- Proper error boundaries

## Build and Deployment

Build the application:
```bash
npm run build
```

The application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or traditional hosting services.

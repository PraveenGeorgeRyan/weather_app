# Weather Forecast Application

A modern, responsive weather forecast application built with Next.js and TypeScript. The application provides real-time weather information and 3-day forecasts using the Open-Meteo API, featuring a clean and intuitive user interface.

## Key Features

- **Current Weather Display**: Temperature, weather conditions, and day/night cycles
- **3-Day Forecast**: Detailed weather predictions including high/low temperatures
- **Location Search**: Easy city-based weather lookup
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Updates**: Automatic data refresh using React Query
- **Smooth Animations**: Fade-in and slide effects when weather data loads

## Technology Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **UI Components**: 
  - Framer Motion (fade and slide animations)
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
│   └── useWeather.ts
├── services/        # API integration
│   └── weatherApi.ts
└── types/           # TypeScript type definitions
    └── weather.ts
```

## Component Architecture

- **SearchBar**: Handles user input for location search
- **WeatherCard**: Displays current weather information including:
  - Current temperature
  - Weather condition with icon
  - High/low temperatures
  - Sunrise/sunset times
- **ForecastSection**: Shows 3-day weather forecast with:
  - Daily weather conditions
  - Temperature ranges
  - Date information

## API Integration

The application uses the Open-Meteo API for weather data:
- Geocoding API for converting city names to coordinates
- Weather Forecast API for retrieving weather data
- No API key required, making it simple to set up and deploy

## Build and Deployment

Build the application:
```bash
npm run build
```

The application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or traditional hosting services.

## Performance Considerations

- Efficient data fetching with React Query
- Optimized images and icons
- Responsive design principles
- Smooth animations for enhanced UX

## Browser Support

Supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

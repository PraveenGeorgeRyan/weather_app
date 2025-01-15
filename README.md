# Weather App

A modern, responsive weather application built with Next.js, TypeScript, and Tailwind CSS. This application provides real-time weather information and forecasts with an intuitive user interface.

## Features

- Real-time weather data display
- 3-day weather forecast
- Responsive design for all devices
- Dynamic weather icons
- Smooth animations and transitions
- Error handling with user-friendly messages
- Multiple location support

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Axios (API requests)
- React Icons
- Hero Icons
- React Query (data fetching)
- Date-fns (date formatting)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your API key:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable React components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── services/         # API service functions
└── styles/           # Global styles and Tailwind config
```

## Components

- `WeatherCard`: Main weather display component
- `ForecastSection`: 3-day forecast display
- `WeatherIcon`: Dynamic weather condition icons
- `ErrorBoundary`: Graceful error handling
- `LoadingSpinner`: Loading state component

## API Integration

The app uses a weather API to fetch current weather and forecast data. All API calls are handled through custom hooks using React Query for efficient caching and state management.

## Responsive Design

The application is fully responsive and works seamlessly across:
- Mobile devices
- Tablets
- Desktop computers

## Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Loading states for better UX
- Network error handling

## Performance Optimization

- Image optimization
- Code splitting
- Efficient data caching
- Minimized bundle size

## Testing

Run tests using:
```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

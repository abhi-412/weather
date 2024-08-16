// src/types/weather.d.ts

export interface Weather {
    name: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      gust: number;
      deg: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    }
    // Add other fields as needed
  }
  
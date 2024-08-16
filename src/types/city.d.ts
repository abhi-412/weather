// src/types/city.d.ts

export interface City {
    name: string;
    geoname_id: string;
    cou_name_en: string;
    timezone: string;
    population: number;
    coordinates: {
        lat: number;
        lon: number;
    };
}
  
  export interface CityResponse {
    results: City[];
  }
  
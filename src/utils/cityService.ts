// src/utils/cityService.ts

const BASE_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';

export async function fetchCities(offset: number,limit: number = 51) {
  console.log(offset,limit);
  
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  const data = await response.json();
  return data;
}

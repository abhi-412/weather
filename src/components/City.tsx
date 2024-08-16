// src/components/CityTest.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { fetchCities } from '../utils/cityService';
import { CityResponse } from '../types/city';
import { useRouter } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const CityTest: React.FC = () => {
  const [cities, setCities] = useState<CityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<CityResponse | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<string>('name');
  const router = useRouter();

  const loadCities = useCallback(async () => {
    
    if (!hasMore) return;
    setLoading(true);
    try {
      const data = await fetchCities(offset);
      setCities(prev => ({
        ...data,
        results: [...(prev?.results || []), ...data.results]
      }));
      setOffset(prev => prev + 50);
      if (data.results.length < 50) {
        setHasMore(false);
      }else{
        setHasMore(true);
      }
    } catch (err) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  }, [offset, hasMore]);

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight);
      
      if (window.innerHeight + document.documentElement.scrollTop +10 <= document.documentElement.offsetHeight || loading){
        return;
      }else{
        loadCities();
      }
      
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadCities, loading]);

  useEffect(() => {
    if (!cities) return;
    const filterCities = () => {
      const filtered = cities.results.filter(result =>
        result.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCities({ ...cities, results: filtered });
    };
    filterCities();
  }, [search, cities]);

  useEffect(() => {
    if (!filteredCities) return;

    const sortCities = () => {
      const sorted = [...filteredCities.results].sort((a: any, b: any) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setFilteredCities({ ...filteredCities, results: sorted });
    };
    sortCities();
  }, [sortKey, sortOrder]);

  

  const handleViewDetails = (city: { name: string; lat: number; lon: number }) => {
    router.push(`/city/${city.name}?lat=${city.lat}&lon=${city.lon}`);
  };

  const handleSort = (key: string) => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  if (loading && !cities) return <p className="text-center text-gray-500">Loading cities...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-4xl text-center font-bold mb-4">City List</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search cities"
        className="p-3 border border-gray-300 rounded mb-4 md:w-1/3 w-full"
      />
      <div className="relative py-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                  Name
                  {sortKey === 'name' ? (
                    sortOrder === 'asc' ? (
                      <FaSortUp className="w-4 h-4 ml-2" />
                    ) : (
                      <FaSortDown className="w-4 h-4 ml-2" />
                    )
                  ) : (
                    <FaSort className="w-4 h-4 ml-2" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort('cou_name_en')}>
                  Country
                  {sortKey === 'cou_name_en' ? (
                    sortOrder === 'asc' ? (
                      <FaSortUp className="w-4 h-4 ml-2" />
                    ) : (
                      <FaSortDown className="w-4 h-4 ml-2" />
                    )
                  ) : (
                    <FaSort className="w-4 h-4 ml-2" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort('timezone')}>
                  Timezone
                  {sortKey === 'timezone' ? (
                    sortOrder === 'asc' ? (
                      <FaSortUp className="w-4 h-4 ml-2" />
                    ) : (
                      <FaSortDown className="w-4 h-4 ml-2" />
                    )
                  ) : (
                    <FaSort className="w-4 h-4 ml-2" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3">
                <span > Population</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCities?.results.map((result, i) => (
              <tr key={i + 1} className="bg-white border-b  hover:bg-gray-50 text-start">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <button onClick={() => handleViewDetails({
                    name: result.name,
                    lat: result.coordinates.lat,
                    lon: result.coordinates.lon
                  })} className="text-blue-500 hover:underline">
                    {result.name}
                  </button>
                </td>
                <td className=" text-black border-b">{result.cou_name_en}</td>
                <td className=" text-black border-b">{result.timezone}</td>
                <td className="text-start border-b">
                  {result.population && new Intl.NumberFormat('en-US').format(result.population)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && <p className="text-center text-gray-500 pt-4">Loading more cities...</p>}
      {!hasMore && !loading && <p className="text-center text-gray-500 mt-4">No more cities to load</p>}
      
    </div>
  );
};

export default CityTest;

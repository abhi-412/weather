// src/app/page.tsx

import React from 'react';
import '../styles/globals.css';
import Link from 'next/link';
import CityTest from '@/components/City';
import Loader from '@/components/Loader';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <header className='flex justify-between items-center text-xl font-semibold mb-6'>
        <Link href="/" className='flex items-center gap-2'>
          <span className='text-3xl text-bold text-orange-800 italic'>Weatheria</span>
        </Link>
        <nav className='flex text-lg gap-7 font-medium'>
          <Link href='/weather/MyLocation' className="text-black">
            Weather
          </Link>
          <Link href='/contact' className="text-black">
            Contact Us
          </Link>
        </nav>
      </header>
      <main className="space-y-12">
        <section>

        <Loader />
          {/* <CityTest /> */}
        </section>
      </main>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 Weather App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

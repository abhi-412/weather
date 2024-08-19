'use client';

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react'


const ButterFly = dynamic(()=>import('../Models/ButterFly'),{ssr:false})

const Loader = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
 
  const setSpotLight = ()=>{
    let intensity = 0;
    if(isDarkMode){
      intensity = 4;
    }else{
       intensity = 0.5;
    }
    return intensity;
  }

  const spotIntensity = setSpotLight();

  console.log(spotIntensity);
  

  return (
    <div className={`h-screen w-full ${isDarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>

      <button onClick={() => setIsDarkMode(!isDarkMode)} className='bg-blue-500 absolute top-0 right-0 left-0 w-fit p-2'>Dark Mode</button>
      <Canvas>
        <directionalLight intensity={0} />
        <ambientLight intensity={0} />
        <pointLight intensity={spotIntensity} scale={[8,8,8]} position={[0,-0.2,0]} castShadow />
        <Suspense fallback={null}>
            <ButterFly scale={[1,1,1]} rotation={[1,2,0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Loader

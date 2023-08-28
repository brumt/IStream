import { useState, useEffect } from 'react';
import { IdolBanner } from './components/IdolBanner';
import './styles/main.css';
import logoImg from './assets/logo.svg'
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Idol{
   id: string;
   title: string;
   bannerUrl: string;
   _count: {
      ads: number
   }
}

function App() {
   const [idols, setIdols] = useState<Idol[]>([])

   useEffect(() => {
      axios('http://localhost:3333/idols')
      .then(response => {
         setIdols(response.data)
      })
   }, [])
  
 return(
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img src={logoImg} alt="" className='w-full md:w-auto' />
    <h1 className='text-4xl md:text-6xl text-white font-black mt-20 '>
    iStream <span className=" text-transparent bg-with-gradient bg-clip-text">with</span> friends.</h1>
   
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-16">

      {idols.map(idol => {
         return(
         <IdolBanner 
         key={idol.id}
         bannerUrl={idol.bannerUrl} 
         title={idol.title} 
         adsCount={idol._count.ads} 
         />
         )
      })}
     

   
    </div>
    
    <Dialog.Root>
    <CreateAdBanner />
    <CreateAdModal/>
    </Dialog.Root>
    </div>

   
 )
}

export default App

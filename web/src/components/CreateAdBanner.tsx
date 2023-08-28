import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'


export function CreateAdBanner(){
    return(
        <div className='pt-1 bg-with-gradient self-stretch rounded-lg mt-8 overflow-hidden'>
    
        <div className='bg-[#2A2634] px-8 py-6 md:flex md:justify-between md:items-center'>
         <div className="mb-4 md:mb-0">
         <strong className='text-4xl md:text-2xl text-white font-black block'>Haven’t found your fandom yet?</strong>
         <span className='text-zinc-400 md:block md:mb-4'>Post a message to find stans of your favorite idol!</span>
         </div>
   
         <Dialog.Trigger className='py-6 px-6 md:py-3 md:px-4 bg-emerald-400 hover:bg-emerald-800 text-white rounded flex items-center gap-3 md:text-sm text-xl'> 
         <MagnifyingGlassPlus size={24}/>
         Public a notice
         </Dialog.Trigger>
        </div>
   
      </div>
    )
}
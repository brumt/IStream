import { Check, MusicNote } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import * as Yup from 'yup'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './Form/input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Idol{
    id: string;
    title: string;

 }
 
export function CreateAdModal(){
    const [idols, setIdols] = useState<Idol[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const[useVoiceChannel, setUseVoiceChannel] = useState(false)

    const adSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      stanTime: Yup.number().required('Stan time is required').positive('Stan Time must be a positive number'),
      discord: Yup.string().required('Discord user is required'),
      hourStart: Yup.string().required('Start time is required'),
      hourEnd: Yup.string().required('End time is required'),
      useVoiceChannel: Yup.boolean(),
    })

    console.log(weekDays)

    useEffect(() => {
       axios('http://localhost:3333/idols')
       .then(response => {
          setIdols(response.data);
       })
    }, [])

    async function handleCreateAd(event: FormEvent){
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      try{
      await adSchema.validate(data,{abortEarly: false});

      await axios.post(`http://localhost:3333/idols/${data.idol}/ads`, {
        name : data.name,
        stanTime: Number(data.stanTime),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel

         });
         alert('Ad sucessfull created');
      }catch(error){
         if(error instanceof Yup.ValidationError){
            
            error.inner.forEach((err) => {
               if (err.path){
                  alert(err.message)
               }
            });
           
      }else{
         console.log('Request error', error)
         alert('Error, please try again later')
      }

    }
   }
   
    return(
<Dialog.Portal>
    
    <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
   <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[488px] shadow-black/25'>
      <Dialog.Title className=' text-3xl font-black'>Public a notice</Dialog.Title>

        <form onSubmit={handleCreateAd} className=' mt-8 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
         <label htmlFor="idol" className='font-semibold'>What's your fandom?</label>
         <select
         name='idol'
         id="idol" 
         className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
         defaultValue=''
         >
         
         <option disabled value=""> Select a idol</option>
         
         {idols.map(idol =>{
            return(
                <option key={idol.id} value={idol.id}>{idol.title}</option>
            )
         })}

         </select>
        
      </div>
      
      <div className='flex flex-col gap-2'>
         <label htmlFor="name"> Name(or username)</label>
         <Input name="name" id="name" placeholder='Your name' />
      </div>

      <div className='grid grid-cols-2 gap-6'>
         <div className='flex flex-col gap-2'>
         <label htmlFor="stanTime">Stan time(in years)</label>
         <Input name="stanTime" id='stanTime' type= "number" placeholder="It's okay if you're new" />
         </div>

         <div className='flex flex-col gap-2'>
            <label htmlFor="discord">Discord user</label>
            <Input name="discord" id='discord' placeholder='@user_00'/>
         </div>
         </div>

      <div className='flex gap-6'>
         <div className='flex flex-col gap-2'>
            <label htmlFor="weekDays">Days you'd like to stream</label>

                <ToggleGroup.Root 
                type='multiple' 
                className='grid grid-cols-4 gap-2'
                value={weekDays}
                onValueChange={setWeekDays}>

               <ToggleGroup.Item
                value='0'
                title='Sunday'
                className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-emerald-300' : ''}`}
                >S
               </ToggleGroup.Item>

               <ToggleGroup.Item
                value='1'
                title='Monday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-emerald-300' : ''}`}
                >M
               </ToggleGroup.Item>

               <ToggleGroup.Item
                value='2'
                title='Tuesday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-emerald-300' : ''}`}
                > 
               T</ToggleGroup.Item>

               <ToggleGroup.Item
                value='3'
                title='Wednesday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-emerald-300' : ''}`}      
               >W</ToggleGroup.Item>

               <ToggleGroup.Item
                value='4'
                title='Thursday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-emerald-300' : ''}`}
               >T</ToggleGroup.Item>

               <ToggleGroup.Item
                value='5'
                title='Friday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-emerald-300' : ''}`}
                >F      
               </ToggleGroup.Item>

               <ToggleGroup.Item
                value='6'
                title='Saturday'
                className= {`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-emerald-300' : ''}`}
               >S</ToggleGroup.Item>
            </ToggleGroup.Root>

            </div>
         
         <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor="hourStart">Available Time</label>
            <div className='grid grid-cols-2 gap-1'>
               <Input name="hourStart" id='hourStart' type="time" placeholder='From' />
               <Input name="hourEnd" id='hourEnd' type="time" placeholder='At' />
            </div>
         </div>
       </div>
    

      <div className='mt-2 flex items-center gap-2 text-sm '>
      <Checkbox.Root 
       checked={useVoiceChannel}
       onCheckedChange={(checked) =>{
         if(checked == true){
            setUseVoiceChannel(true)
         }else{
            setUseVoiceChannel(false)
         }
       }}
       className='w-6 h-6 rounded p-1 bg-zinc-900'>

        <Checkbox.Indicator> 
        <Check className='w-4 h-4 text-emerald-400'/>
        </Checkbox.Indicator>
       
       </Checkbox.Root>
        I'm used to be in voice mails
      </div>
      

      <footer className='mt-4 flex justify-end gap-4'>
         <Dialog.Close
         type='button'
         className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
            Cancel
         </Dialog.Close>
         <button 
         type='submit'
         className= 'bg-emerald-400 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-emerald-800'> 
         <MusicNote className='w-6 h-6'/>
         Find fandom</button>
      </footer>
        </form>
      </Dialog.Content>

    </Dialog.Overlay>

    </Dialog.Portal>
    );
    
}


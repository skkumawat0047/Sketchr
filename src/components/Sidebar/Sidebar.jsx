import React, { useState } from 'react'

const Sidebar = () => {
  const [Time,setTime] = useState(0);
  const [TimerActive,setTimerActive]=useState(true);
  const [Upload,setUpload] = useState(false);
  return (
    <div>
      <aside className='flex fixed left-1 top-20 w-fit h-[89%] gap-1'>
        <ul className='flex flex-col justify-center text-3xl opacity-80 gap-3 [&>li]:cursor-pointer [&>li]:active:bg-sky-500 [&>li]:rounded-md [&>li]:p-2'>
            {/* <li className='flex flex-col'><i class="fa-regular fa-alarm-clock"></i><span className='text-[13px]'>timer</span></li> */}
            <li className='flex flex-col' style={{background:Upload===true?"#3a98f7":""}} onClick={()=>setUpload(!Upload)}><i class="fa-solid fa-cloud-arrow-up"></i><span className='text-[10px]'>uploads</span></li>
        </ul>
        {/* <ul className='flex flex-col w-24 h-full justify-center items-center text-3xl opacity-80 gap-3 border-2'>
            <li className='flex flex-col border-2 border-black p-5'><i class="fa-regular fa-alarm-clock"></i><span className='text-[13px]'></span></li>
            <input className='text-xl' type="time" defaultValue="03:11"/>
            <button className='text-xl bg-sky-500 rounded-lg px-5 pb-1'>Start</button>
        </ul> */}
        {Upload?(<div className="box border-2 rounded-md border-black flex flex-col">
          <input className='cursor-pointer p-3' type="file" accept='.png,.jpg,.jpeg,.gif,.webp'/>
          <hr className='my-3 mx-2 border-black' />
        </div>):""
        }
      </aside>
    </div>
  )
}

export default Sidebar

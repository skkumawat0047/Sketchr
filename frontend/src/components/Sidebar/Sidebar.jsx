import React, { useState } from 'react'

const Sidebar = () => {
  const [images,setimages] = useState([]);
  const [Upload,setUpload] = useState(false);

  const addimage = (event)=>{
    const image = event.target.files[0];
    if(image){
      setimages([...images,URL.createObjectURL(image)]);
    }
  }

  return (
    <div>
      <aside className='flex fixed left-1 top-20 w-fit h-[89%] gap-1 z-10'>
        <ul className='flex flex-col justify-center text-3xl opacity-80 gap-3 [&>li]:cursor-pointer [&>li]:active:bg-sky-500 [&>li]:rounded-md [&>li]:p-2'>
            {/* <li className='flex flex-col'><i className="fa-regular fa-alarm-clock"></i><span className='text-[13px]'>timer</span></li> */}
            <li className='flex flex-col' style={{background:Upload===true?"#3a98f7":""}} onClick={()=>setUpload(!Upload)}><i className="fa-solid fa-cloud-arrow-up"></i><span className='text-[10px]'>uploads</span></li>
        </ul>
        {Upload?(<div className="box border-2 rounded-md border-black flex flex-col bg-sky-200 items-center">
          <input className='img cursor-pointer p-3' type="file" accept='.png,.jpg,.jpeg,.gif,.webp' onChange={addimage}/>
          {/* <button className='bg-blue-500 w-fit px-7 py-1 rounded-lg active:bg-blue-700' onClick={()=>addimage}>Upload</button> */}
          <hr className='my-3 border-black w-full' />
          <div className="flex flex-wrap justify-center gap-1 w-80 overflow-y-auto">
            {images.map((img)=>(
              <img src={img} className='cursor-pointer border-[3px] hover:border-black rounded-md' style={{"width":"95px"}} alt={Math.random(3,6)} />
            ))}
          </div>
        </div>):""
        }
      </aside>
    </div>
  )
}

export default Sidebar

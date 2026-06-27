import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <aside className='fixed left-3 top-0 h-screen'>
        <ul className='flex flex-col h-full justify-center text-3xl opacity-80 gap-3'>
            <li className='flex flex-col'><i class="fa-regular fa-alarm-clock"></i><span className='text-[13px]'>timer</span></li>
            <li className='flex flex-col'><i class="fa-solid fa-cloud-arrow-up"></i><span className='text-[13px]'>uploads</span></li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar

import React from 'react'

const Table = () => {
  return (
    <div>
      <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
        <li><i class="fa-solid fa-table"></i></li>
        <li><i class="fa-solid fa-table-list"></i></li>
        <span className='bg-yellow-50 rounded-md [&>*]:rounded-md flex justify-center'>
          <input className='w-9 text-[15px] pl-1' type="number" min={0} max={20} placeholder='2' /><span>*</span>
          <input className='w-9 text-[15px] pl-1' type="number" min={0} max={20} placeholder='3' /></span>
      </ul>
    </div>
  )
}

export default Table

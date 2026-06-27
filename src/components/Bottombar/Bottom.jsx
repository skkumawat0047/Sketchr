import React from 'react'

const Bottom = () => {
    return (
        <div>
            <footer className='fixed w-full bottom-2 flex justify-center'>
                <ul className='w-auto px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl'>
                    <li><i className="fa-solid fa-rotate-left"></i></li>
                    <li><i className="fa-solid fa-rotate-right"></i></li>
                    <li><i className="fa-solid fa-pencil"></i></li>
                    <li><i className="fa-solid fa-eraser"></i></li>
                    <li><i className="fa-regular fa-keyboard"></i></li>
                    <li><i className="fa-solid fa-shapes"></i></li>
                    <li><i class="fa-solid fa-palette"></i></li>
                    <li><i className="fa-solid fa-table-cells"></i></li>
                </ul>
                <ul className='absolute right-5 bottom-2 w-auto px-5 rounded-full bg-gray-200 py-1 flex gap-3'>
                    <li><i className="fa-solid fa-minus"></i></li>
                    <span>45%</span>
                    <li><i className="fa-solid fa-plus"></i></li>
                </ul>
            </footer>
        </div>
    )
}

export default Bottom

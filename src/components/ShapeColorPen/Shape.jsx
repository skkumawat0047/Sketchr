import React from 'react'

const Shape = () => {
    const idtype=(e)=>{
        console.log(e.currentTarget.id);
    }
    return (
        <div className='border-2 border-black max-w-96  bg-sky-200 rounded-lg p-1 '>
            <input className='border-[1px] border-gray-800 rounded-md px-1 w-full mb-1' type="text" placeholder='Search' />
            <hr className='border-1 border-black my-1'/>
            <ul className="flex flex-wrap gap-1 h-20 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-violet-950 p-1 rounded-md [&>li]:w-10 [&>li]:h-10 [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded-md [&>li]:cursor-pointer [&>li]:transition active:[&>li]:bg-blue-400 text-2xl">
                <li id='Arrow' onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li id='Circle' onClick={idtype}><i className="fa-regular fa-circle"></i></li>
                <li id='Ellipse' onClick={idtype}><i className="fa-regular fa-circle"></i></li>
                <li id="Rect" onClick={idtype}><i className="fa-regular fa-square"></i></li>
                <li id='RegularPolygon' onClick={idtype}><i className="fa-solid fa-caret-up"></i></li>
                <li id='RegularPolygon' onClick={idtype}><i className="fa-solid fa-pentagon"></i></li>
                <li id='RegularPolygon' onClick={idtype}><i className="fa-solid fa-hexagon"></i></li>
                <li id='RegularPolygon' onClick={idtype}><i className="fa-solid fa-septagon"></i></li>
                <li id='RegularPolygon' onClick={idtype}><i className="fa-solid fa-octagon"></i></li>
                <li onClick={idtype}><i className="fa-regular fa-comment"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
                <li onClick={idtype}><i className="fa-solid fa-arrow-left"></i></li>
            </ul>
        </div>
    )
}

export default Shape

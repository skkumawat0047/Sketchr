import React, { useState } from 'react';

// Props me hum setShapeType receive kar sakte hain, taaki Home/Bottom me pata chale kaunsi shape selected hai
const Shape = ({ shapeType, setShapeType }) => {
    // Search input ko control karne ke liye state
    const [search, setSearch] = useState('');

    // Shapes ka data ek array me rakh liya taaki map karna aasan ho aur search filter lag sake
    const allShapes = [
        { id: 'Arrow', icon: 'fa-solid fa-arrow-right' },
        { id: 'Circle', icon: 'fa-regular fa-circle' },
        { id: 'Ellipse', icon: 'fa-solid fa-cloud' }, // Example icon
        { id: 'Rect', icon: 'fa-regular fa-square' },
        { id: 'Triangle', icon: 'fa-solid fa-caret-up' },
        { id: 'Pentagon', icon: 'fa-solid fa-pentagon' },
        { id: 'Hexagon', icon: 'fa-solid fa-hexagon' },
        { id: 'Octagon', icon: 'fa-solid fa-octagon' },
        { id: 'Comment', icon: 'fa-regular fa-comment' },
    ];

    // Search filter logic
    const filteredShapes = allShapes.filter(shape => 
        shape.id.toLowerCase().includes(search.toLowerCase())
    );

    const handleShapeSelect = (id) => {
        console.log("Selected Shape:", id);
        // Agar parent component (Bottom) se setShapeType mila hai, to usme set karein
        if(setShapeType) setShapeType(id);
    };

    return (
        <div className='border-2 border-black max-w-96 bg-sky-200 rounded-lg p-2'>
            {/* Search Input */}
            <input 
                className='border-[1px] border-gray-800 rounded-md px-2 py-1 w-full mb-2 outline-none' 
                type="text" 
                placeholder='Search shapes...' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <hr className='border-[1px] border-black mb-2'/>
            
            {/* Shapes List */}
            <ul className="flex flex-wrap gap-2 h-24 overflow-y-auto scroll-smooth p-1 rounded-md text-2xl">
                {filteredShapes.length > 0 ? (
                    filteredShapes.map((shape) => (
                        <li 
                            key={shape.id} 
                            id={shape.id} 
                            onClick={() => handleShapeSelect(shape.id)}
                            // Jo shape selected hai uspe alag background (blue) aayega
                            className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                                shapeType === shape.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
                            }`}
                            title={shape.id} // Hover karne par shape ka naam dikhega
                        >
                            <i className={shape.icon}></i>
                        </li>
                    ))
                ) : (
                    <span className="text-sm text-gray-700 w-full text-center mt-2">No shapes found</span>
                )}
            </ul>
        </div>
    );
}

export default Shape;
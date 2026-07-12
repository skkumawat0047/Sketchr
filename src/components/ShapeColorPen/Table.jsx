import React, { useState } from 'react';

// Table banane ke liye rows aur columns chahiye hoti hain
const Table = ({ setTableConfig }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableType, setTableType] = useState('grid'); // 'grid' ya 'list'

  // Input change handle karna
  const handleRowChange = (e) => setRows(Number(e.target.value));
  const handleColChange = (e) => setCols(Number(e.target.value));

  // Jab aap settings change karein to main parent ko bhej dein
  const applyTableConfig = () => {
    if(setTableConfig) {
      setTableConfig({ type: tableType, rows: rows, cols: cols });
    }
  };

  return (
      <ul className='px-5 rounded-full bg-gray-300 py-1 flex items-center justify-center gap-1 text-xl'>
        
        {/* Table type selectors */}
        <li 
          className={`p-1 rounded-md cursor-pointer transition-colors ${tableType === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-400'}`}
          onClick={() => { setTableType('grid'); applyTableConfig(); }}
          title="Grid Table"
        >
          <i className="fa-solid fa-table"></i>
        </li>
        
        <li 
          className={`p-1 rounded-md cursor-pointer transition-colors ${tableType === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-400'}`}
          onClick={() => { setTableType('list'); applyTableConfig(); }}
          title="List Table"
        >
          <i className="fa-solid fa-table-list"></i>
        </li>

        {/* Row * Col inputs */}
        <div className='bg-yellow-50 rounded-md flex items-center px-2 py-1 gap-1 border border-gray-400'>
          <input 
            className='w-8 text-center text-sm outline-none bg-transparent' 
            type="number" 
            min={1} 
            max={20} 
            value={rows}
            onChange={handleRowChange}
            onBlur={applyTableConfig} // Jab click bahar jaye to update ho
            title="Rows"
          />
          <span className="text-sm font-bold text-gray-500">x</span>
          <input 
            className='w-8 text-center text-sm outline-none bg-transparent' 
            type="number" 
            min={1} 
            max={20} 
            value={cols}
            onChange={handleColChange}
            onBlur={applyTableConfig}
            title="Columns"
          />
        </div>
          <button className='bg-blue-300 px-2 rounded-md active:bg-blue-700'>Pick</button>
      </ul>
  );
}

export default Table;
import React, { useState } from 'react'

const Login = () => {
    const [login,setLogin]=useState(true);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="container flex w-fit h-fit justify-center border-2 border-black rounded-md">
        <div className="box1 bg-red-300 min-w-96 py-5 rounded-l-sm"></div>
        <div className="box2 bg-blue-300 min-w-96 rounded-r-md flex flex-col items-center py-5 gap-4 text-xl">
            {login?(<><h2 className='text-2xl font-bold'>Login</h2>
            <div className="user flex flex-col gap-1">
                <label htmlFor="user">Enter Username:</label>
                <input className='w-72 rounded-md px-1' type="text" htmlFor="text" id='user'/>
                <label htmlFor="password">Enter Password:</label>
                <input className='w-72 rounded-md px-1' type="password" htmlFor="password" id='user'/>
                <button className='submit my-5 bg-green-400 border-2 border-black rounded-lg font-bold py-1'>Submit</button>
            </div>
            <span className='text-sm text-sky-900 cursor-pointer hover:underline' onClick={()=>setLogin(false)}>Create an account</span></>):(<>
            <h2 className='text-2xl font-bold'>Register</h2>
            <div className="user flex flex-col gap-1">
                <label htmlFor="user">Enter Email:</label>
                <input className='w-72 rounded-md px-1' type="text" htmlFor="text" id='user'/>
                <label htmlFor="password">Enter password:</label>
                <input className='w-72 rounded-md px-1' type="password" htmlFor="password" id='user'/>
                <label htmlFor="c_password">confirm password:</label>
                <input className='w-72 rounded-md px-1' type="password" htmlFor="password" id='user'/>
                <button className='submit my-5 bg-green-400 border-2 border-black rounded-lg font-bold py-1'>Submit</button>
            </div>
            <span className='text-sm text-sky-900 cursor-pointer hover:underline' onClick={()=>setLogin(true)}>Login account</span></>)}
        </div>
      </div>
    </div>
  )
}

export default Login

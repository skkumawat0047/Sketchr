import React from 'react'
import Navbar from '../Navbar/Navbar';
import Bottom from '../Bottombar/Bottom';
import Sidebar from '../Sidebar/Sidebar';
import Konva from '../Konva/Konva';

const Home = () => {
  return (
    <>
          <Navbar />
          <Sidebar />
          <Bottom />
          <Konva />
    </>
  )
}

export default Home

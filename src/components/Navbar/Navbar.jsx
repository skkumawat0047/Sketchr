import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-cyan-300 fixed top-0">
      <ul className="flex justify-between items-center w-full list-none font-bold">
        <li><i className="fa-solid fa-house text-2xl"></i>Whiteboard</li>

        <li className="flex gap-3 [&>*]:px-4 [&>*]:py-2 [&>*]:rounded-md [&>span]:bg-gray-200 [&>*]:cursor-pointer">
          <span className="hover:bg-gray-300">Clear</span>
          <span className="hover:bg-gray-300">New Board</span>
          <div className="hover:bg-sky-300" title="Save"><i className="fa-solid fa-cloud-arrow-up"></i></div>
        </li>

        <li className="flex gap-3 [&>span]:px-4 [&>span]:py-2 [&>span]:rounded-md [&>span]:bg-gray-200 [&>span]:cursor-pointer">
          <span className="hover:bg-gray-300">Download</span>
          <span className="hover:bg-gray-300">Share</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
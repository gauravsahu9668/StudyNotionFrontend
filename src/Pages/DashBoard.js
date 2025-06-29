
import { Outlet } from 'react-router-dom'
import SideBar from '../componets/core/dashboard/SideBar'
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
const DashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
     <div className="flex flex-col min-h-screen mt-14">
      <header className="flex md:hidden items-center justify-end bg-richblack-800 px-4 py-3 border-b border-richblack-700 sticky top-0 z-20">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <IoMdMenu className="text-white" size={24} />
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block md:w-[250px] max-w-[250px] bg-richblack-800 border-r border-richblack-700 sticky top-0 h-screen">
          <SideBar />
        </aside>
        <main className="flex-1">
          {sidebarOpen && (
            <div className="md:hidden bg-richblack-800 border-b border-richblack-700">
              <SideBar />
            </div>
          )}
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>

  )
}

export default DashBoard

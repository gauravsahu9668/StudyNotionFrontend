import  { useState } from 'react'
import {sidebarLinks} from '../../../Data/dashboard-links'
import { logout } from '../../../services/operation/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {

  const {user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const okHandler=()=>{
    dispatch(logout(navigate))
  }
  return (
<div className="flex flex-col w-full max-h-screen overflow-y-auto">
  <div className="flex flex-col border-r border-richblack-700 pt-4 bg-richblack-800">
    {sidebarLinks.map((link) =>
      (!link.type || user?.accountType === link.type) && (
        <SideBarLink key={link.id} link={link} iconName={link.icon} />
      )
    )}
    <div className="mx-auto mt-4 mb-4 h-[1px] w-9/12 bg-richblack-500"></div>
    <SideBarLink link={{ name: "Settings", path: "dashboard/settings" }} iconName="VscSettingsGear" />
  </div>
</div>


  )
}

export default SideBar

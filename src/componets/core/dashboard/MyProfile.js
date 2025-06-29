import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TbEdit } from "react-icons/tb";
import CTAButton from '../homepage/Button';
const MyProfile = () => {
    const user=useSelector((state)=>state.profile.user)
    useEffect(()=>{
      
    },[user])
  return (
    <div className="w-full flex flex-col gap-6 mt-6 px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl font-extrabold text-richblack-5">My Profile</h1>

  {/* Profile header */}
  <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
    <div className="flex items-center gap-4">
      <img
        alt="user"
        src={user?.image}
        className="w-16 h-16 md:w-[65px] md:h-[65px] rounded-full object-cover border border-richblack-700"
      />
      <div className="flex flex-col">
        <p className="text-lg md:text-xl font-semibold text-richblack-5 truncate">
          {user?.firstName + " " + user?.lastName}
        </p>
        <p className="text-sm md:text-base text-richblack-400 truncate">
          {user?.email}
        </p>
      </div>
    </div>
    <CTAButton active={true} linkto={"/dashboard/settings"}>
      <div className="flex items-center gap-2 text-sm md:text-base">
        <span>Edit</span>
        <TbEdit size="1.2rem" />
      </div>
    </CTAButton>
  </div>

  {/* About section */}
  <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-2 shadow-sm">
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold text-richblack-5">About</p>
      <CTAButton active={true} linkto={"/dashboard/settings"}>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span>Edit</span>
          <TbEdit size="1.2rem" />
        </div>
      </CTAButton>
    </div>
    <p className="text-sm md:text-base text-richblack-400 mt-1">
      {user?.additionaldetails?.about ?? "Write something about yourself"}
    </p>
  </div>

  {/* Personal Details */}
  <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-4 shadow-sm">
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
      <CTAButton active={true} linkto={"/dashboard/settings"}>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span>Edit</span>
          <TbEdit size="1.2rem" />
        </div>
      </CTAButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-2">
      {/* Left column */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">First Name</h2>
          <p className="text-richblack-5">{user?.firstName}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">Email</h2>
          <p className="text-richblack-5">{user?.email}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">Gender</h2>
          <p className="text-richblack-5">{user?.additionaldetails?.gender ?? "Update Profile"}</p>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">Last Name</h2>
          <p className="text-richblack-5">{user?.lastName}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">Phone Number</h2>
          <p className="text-richblack-5">{user?.additionaldetails?.contactNumber ?? "Update Profile"}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-richblack-400">Date of Birth</h2>
          <p className="text-richblack-5">{user?.additionaldetails?.dateofbirth ?? "Update Profile"}</p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default MyProfile

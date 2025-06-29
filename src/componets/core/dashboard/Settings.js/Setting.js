import React, { useState } from 'react'
import { GoUpload } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { updateprofile } from '../../../../services/operation/ProfileAPI';
import PasswordUpdate from './passwordchange';
import { updateprofilepicture } from '../../../../services/operation/ProfileAPI';
const Setting = () => {
  const user=useSelector((state)=>state.profile.user)
  const [updatedata,setupdatedata]=useState({firstName:"",lastName:"",gender:"",about:"",dateofbirth:"",contactNumber:""})

  const changeHandler=(e)=>{
    const {name,value}=e.target
    setupdatedata(prevupdatedata=>{
      return{
        ...prevupdatedata,
        [name]:value,
      }
    })
  }
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const submitHandler=(e)=>{
    const{firstName,lastName,dateofbirth,contactNumber,gender,about}=updatedata
    e.preventDefault()
    dispatch(updateprofile(firstName,lastName,dateofbirth,contactNumber,gender,about,token))
    console.log("printing new data")
    console.log(user)
  }
  const[profileimage,setprofileimage]=useState(null)
  const imagehandler=(event)=>{
        setprofileimage(event.target.files[0])
  }
  const imagesubmithandler=(e)=>{
       e.preventDefault()
       dispatch(updateprofilepicture(token,profileimage))
  }
  return (
    <div className="flex flex-col gap-8 mt-6 px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl font-extrabold text-richblack-5">Edit Profile</h1>

  {/* Change Profile Picture */}
  <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
    <img src={user.image} alt="Profile" className="w-20 h-20 md:w-[90px] md:h-[90px] rounded-full object-cover border border-richblack-700" />
    <div className="flex flex-col gap-2 w-full">
      <p className="text-base md:text-lg text-richblack-5">Change Profile Picture</p>
      <form onSubmit={imagesubmithandler} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <input
            type="file"
            id="file"
            name="profileimage"
            onChange={imagehandler}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="px-3 py-1 bg-richblack-900 text-richblack-5 rounded cursor-pointer hover:bg-richblack-700 transition"
          >
            Select
          </label>
        </div>
        <button type="submit" className="flex items-center gap-2 px-4 py-1 text-sm md:text-base font-semibold rounded bg-yellow-50 text-black hover:bg-yellow-100 transition">
          Upload <GoUpload />
        </button>
      </form>
    </div>
  </div>

  {/* Profile Information */}
  <div className="bg-richblack-800 rounded-lg p-4 md:p-6 shadow-sm">
    <h2 className="text-lg md:text-xl font-semibold text-richblack-5 mb-4">Profile Information</h2>
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="firstName" className="text-sm font-semibold text-richblack-400">First Name</label>
          <input type="text" required onChange={changeHandler} name="firstName" id="firstName" placeholder="Enter first name"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="lastName" className="text-sm font-semibold text-richblack-400">Last Name</label>
          <input type="text" required onChange={changeHandler} name="lastName" id="lastName" placeholder="Enter last name"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="dateofbirth" className="text-sm font-semibold text-richblack-400">Date of Birth</label>
          <input type="date" required onChange={changeHandler} name="dateofbirth" id="dateofbirth"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="gender" className="text-sm font-semibold text-richblack-400">Gender</label>
          <input type="text" required onChange={changeHandler} name="gender" id="gender" placeholder="Enter gender"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="contactNumber" className="text-sm font-semibold text-richblack-400">Contact Number</label>
          <input type="text" required onChange={changeHandler} name="contactNumber" id="contactNumber" placeholder="Enter phone number"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="about" className="text-sm font-semibold text-richblack-400">About</label>
          <input type="text" required onChange={changeHandler} name="about" id="about" placeholder="Tell us about yourself"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-sm md:text-base font-semibold rounded bg-yellow-50 text-black hover:bg-yellow-100 transition">
          Save
        </button>
      </div>
    </form>
  </div>

    <PasswordUpdate></PasswordUpdate>
</div>

  )
}

export default Setting

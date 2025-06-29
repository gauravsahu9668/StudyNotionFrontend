import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updatepassword} from '../../../../services/operation/ProfileAPI'
const PasswordUpdate = () => {
    const {token}=useSelector((state)=>state.auth)
    const [passdata,setpassdata]=useState({password:"",newpassword:""})
    const changeHandler=(e)=>{
        const {name,value}=e.target
        setpassdata(prevpassdata=>{
            return {
                ...prevpassdata,
                [name]:value
            }
        })
    }
    const dispatch=useDispatch()
    const submithandler=(e)=>{
        e.preventDefault()
        const {password,newpassword}=passdata
        dispatch(updatepassword(password,newpassword,token))
    }
  return (
    <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-4 shadow-sm">
    <h2 className="text-lg md:text-xl font-semibold text-richblack-5">Password</h2>
    <form onSubmit={submithandler} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="text-sm font-semibold text-richblack-400">Current Password</label>
          <input type="password" required onChange={changeHandler} name="password" id="password" placeholder="Enter current password"
            className="p-3 bg-richblack-700 text-richblack-5 rounded border border-richblack-600 focus:border-yellow-50 outline-none transition" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="newpassword" className="text-sm font-semibold text-richblack-400">New Password</label>
          <input type="password" required onChange={changeHandler} name="newpassword" id="newpassword" placeholder="Enter new password"
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
  )
}

export default PasswordUpdate


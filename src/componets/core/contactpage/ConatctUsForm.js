import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
const ConatctUsForm = () => {

  const [loading,setloading]=useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessfull}
  }=useForm()


const submitContactForm=async(data)=>{
  console.log("logging data-> ",data)
  toast.success("message sent successfully")
  reset()
}

  useEffect(()=>{
    if(isSubmitSuccessfull){
      reset(
        {
          email:"",
          firstname:"",
          lastname:"",
          message:"",
          phoneno:"",
        }
      )
    }
  },[reset,isSubmitSuccessfull])


  return (
    <div className="w-full gap-5 pb-10">
  <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-4">
    <div className="flex flex-col md:flex-row gap-4">
      {/* First name */}
      <div className="flex flex-col flex-1">
        <label htmlFor="firstname" className="text-sm font-semibold text-richblack-300">First Name</label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter first name"
          {...register("firstname", { required: true })}
          className="bg-richblack-800 p-3 rounded-md text-richblack-100 border border-richblack-700 focus:border-yellow-400 outline-none"
        />
        {errors.firstname && <span className="text-red-500 text-xs">Please enter your first name</span>}
      </div>
      {/* Last name */}
      <div className="flex flex-col flex-1">
        <label htmlFor="lastname" className="text-sm font-semibold text-richblack-300">Last Name</label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter last name"
          {...register("lastname")}
          className="bg-richblack-800 p-3 rounded-md text-richblack-100 border border-richblack-700 focus:border-yellow-400 outline-none"
        />
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="text-sm font-semibold text-richblack-300">Email Address</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        {...register("email", { required: true })}
        className="bg-richblack-800 p-3 rounded-md text-richblack-100 border border-richblack-700 focus:border-yellow-400 outline-none"
      />
      {errors.email && <span className="text-red-500 text-xs">Please enter your email address</span>}
    </div>

    {/* Message */}
    <div className="flex flex-col">
      <label htmlFor="message" className="text-sm font-semibold text-richblack-300">Message</label>
      <textarea
        id="message"
        rows="5"
        placeholder="Enter your message here"
        {...register("message", { required: true })}
        className="bg-richblack-800 p-3 rounded-md text-richblack-100 border border-richblack-700 focus:border-yellow-400 outline-none"
      />
      {errors.message && <span className="text-red-500 text-xs">Please enter your message</span>}
    </div>

    {/* Phone number */}
    <div className="flex flex-col">
      <label htmlFor="phoneno" className="text-sm font-semibold text-richblack-300">Contact Number</label>
      <input
        type="text"
        id="phoneno"
        placeholder="12345xxxx"
        {...register("phoneno", { required: true })}
        className="bg-richblack-800 p-3 rounded-md text-richblack-100 border border-richblack-700 focus:border-yellow-400 outline-none"
      />
    </div>

    {/* Submit button */}
    <button
      type="submit"
      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md py-3 mt-2 transition-colors"
    >
      Send Message
    </button>
  </form>
</div>

  )
}

export default ConatctUsForm

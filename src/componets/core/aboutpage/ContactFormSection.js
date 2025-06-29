import React from 'react'
import ConatctUsForm from '../contactpage/ConatctUsForm'
const ContactFormSection = () => {
  return (
    <div className="flex flex-col gap-5 w-[90%]  mx-auto mt-12">
  <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold text-center">
    Get in Touch
  </h1>
  <p className="text-richblack-300 text-base md:text-lg text-center font-medium">
    We'd love to hear from you. Please fill out this form.
  </p>
  <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
    <ConatctUsForm />
  </div>
</div>

  )
}

export default ContactFormSection

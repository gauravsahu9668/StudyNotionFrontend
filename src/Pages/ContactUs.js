
import { MdOutlineMessage } from "react-icons/md";
import ConatctUsForm from '../componets/core/contactpage/ConatctUsForm';
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
const ContactUs = () => {
  return (
    <div className="w-[90%] max-w-screen-xl mx-auto mt-16 flex flex-col lg:flex-row gap-10">
  <div className="flex-1 bg-richblack-800 rounded-xl shadow-lg p-6 flex flex-col justify-between gap-6">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <MdOutlineMessage className="text-yellow-400 text-xl" />
        <h1 className="text-lg md:text-xl font-bold text-white">Chat on Us</h1>
      </div>
      <p className="text-richblack-300">Our friendly team is here to help.</p>
      <span className="text-richblack-100">info@studynotion.com</span>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FaGlobeAmericas className="text-yellow-400 text-xl" />
        <h1 className="text-lg md:text-xl font-bold text-white">Visit Us</h1>
      </div>
      <p className="text-richblack-300">Come and say hello at our office HQ.</p>
      <span className="text-richblack-100">Bangalore-500016</span>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <IoCall className="text-yellow-400 text-xl" />
        <h1 className="text-lg md:text-xl font-bold text-white">Call Us</h1>
      </div>
      <p className="text-richblack-300">Mon-Fri from 8am to 5pm</p>
      <span className="text-richblack-100">+123 456 7890</span>
    </div>
  </div>

  {/* Right: form + heading */}
  <div className="flex-1 flex flex-col gap-4">
    <h1 className="text-2xl md:text-3xl font-bold text-white">
      Got an Idea? We've got the skills.
      <br /> Let's team up
    </h1>
    <p className="text-richblack-300 text-base font-medium mb-2">
      Tell us more about yourself and what you have in mind
    </p>
    <ConatctUsForm/>
  </div>
</div>

  )
}

export default ContactUs

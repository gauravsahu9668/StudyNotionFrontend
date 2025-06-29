
import logo from "../../../Assets/Logo/Logo-Full-Light.png"
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import FooterLink from './FooterLink';
import {FooterLink2} from "../../../Data/footer-links"
const Footer = () => {
  console.log(FooterLink2)
  return (
    <div className="w-full bg-richblack-900 pt-10 pb-8">
  <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-8 gap-x-6">
    
    {/* Brand & social */}
    <div className="flex flex-col gap-3">
      <img alt="Logo" src={logo} className="w-[120px] object-contain" />
      <h1 className="text-[16px] font-semibold text-richblack-400 mt-2">Company</h1>
      <p className="text-[15px] text-richblack-400 hover:text-yellow-400 cursor-pointer transition">About</p>
      <p className="text-[15px] text-richblack-400 hover:text-yellow-400 cursor-pointer transition">Careers</p>
      <p className="text-[15px] text-richblack-400 hover:text-yellow-400 cursor-pointer transition">Affiliates</p>
      
      <div className="flex gap-3 mt-2">
        <FaYoutube className="text-richblack-400 hover:text-red-500 transition" size="1.3rem" />
        <FaGoogle className="text-richblack-400 hover:text-blue-500 transition" size="1.3rem" />
        <FaTwitter className="text-richblack-400 hover:text-sky-400 transition" size="1.3rem" />
        <IoLogoInstagram className="text-richblack-400 hover:text-pink-500 transition" size="1.3rem" />
      </div>
    </div>

    {/* Dynamic footer links */}
    {FooterLink2.map((item, index) => (
      <div key={index} className="flex flex-col gap-2">
        <FooterLink data={item} />
      </div>
    ))}
  </div>

  {/* Optional bottom small text */}
  <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto mt-6 border-t border-richblack-700 pt-4 text-[13px] text-richblack-500 text-center">
    © {new Date().getFullYear()} YourCompanyName. All rights reserved.
  </div>
</div>


  )
}

export default Footer

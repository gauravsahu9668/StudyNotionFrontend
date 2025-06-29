import React from 'react'
import image1 from '../Assets/Images/aboutus1.webp'
import image2 from '../Assets/Images/aboutus2.webp'
import image3 from '../Assets/Images/aboutus3.webp'
import Quote from '../componets/core/aboutpage/Quote'
import foundingstroy from '../Assets/Images/FoundingStory.png'
import StatsComponent from '../componets/core/aboutpage/StatsComponent'
import LearningGrid from '../componets/core/aboutpage/LearningGrid'
import ContactFormSection from '../componets/core/aboutpage/ContactFormSection'
import Footer from '../componets/common/Footer/Footer'
const About = () => {
  return (
  <div className="w-full bg-richblack-900 text-richblack-25">
  {/* Section 1 */}
  <section className="bg-richblack-800 py-16">
    <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-4 px-4">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-richblack-5 mt-8">
        Driving Innovation in Online Education for a
      </h1>
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-yellow-400">
        Bright Future
      </h2>
      <p className="max-w-2xl text-center text-richblack-200 font-medium">
        StudyNotion is at the forefront of driving innovation in online education. We’re passionate
        about creating a brighter future by offering cutting-edge courses, leveraging emerging
        technologies, and nurturing a vibrant learning community.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <img alt="imag hai" src={image1} className="rounded-lg w-32 sm:w-40 md:w-44 object-cover shadow-md" />
        <img alt="user" src={image2} className="rounded-lg w-32 sm:w-40 md:w-44 object-cover shadow-md" />
        <img alt="load" src={image3} className="rounded-lg w-32 sm:w-40 md:w-44 object-cover shadow-md" />
      </div>
    </div>
  </section>

  {/* Section 2 */}
  <section className="mt-20">
    <div className="text-center max-w-screen-md mx-auto px-4">
      <Quote />
    </div>
  </section>

  {/* Section 3 */}
  <section className="mt-16">
    <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-12">
      {/* Founding Story */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 text-richblack-200 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-pink-400">Our Founding Story</h3>
          <p>
            In the bustling heart of Silicon Valley, three college friends, each with a unique
            background in education, technology, and business, found themselves united by a shared
            frustration: the traditional education system...
          </p>
          <p>
            Today, StudyNotion serves millions of students across the globe, empowering them to
            learn at their own pace, in their own way...
          </p>
        </div>
        <div className="flex-1">
          <img alt="foundingstory" src={foundingstroy} className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-richblack-800 rounded-lg shadow p-6 space-y-3">
          <h3 className="text-2xl font-bold text-yellow-400">Our Vision</h3>
          <p className="text-richblack-200">
            Our vision at StudyNotion is to create a world where education is universally accessible,
            personalized, and empowering...
          </p>
        </div>
        <div className="bg-richblack-800 rounded-lg shadow p-6 space-y-3">
          <h3 className="text-2xl font-bold text-blue-400">Our Mission</h3>
          <p className="text-richblack-200">
            Our mission at StudyNotion is to revolutionize education by harnessing the power of
            technology to deliver personalized, accessible, and high-quality learning experiences...
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Section 4 */}
  <section className="bg-richblack-800 mt-16 py-12">
    <div className="max-w-screen-xl mx-auto px-4">
      <StatsComponent />
    </div>
  </section>

  {/* Section 5 */}
  <section className="flex flex-col gap-12 mt-16 max-w-screen-xl mx-auto px-4">
    <LearningGrid />
  </section>

  <Footer />
</div>


  )
}

export default About

import React, { useEffect, useState } from 'react'
import { getallreviews } from '../../services/operation/courses'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRatings from 'react-star-ratings';
const ReviewSlider = () => {
    const [allreviews,setallreviews]=useState([])
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
    };
    useEffect(()=>{
        getallreviews().then((response)=>{
            setallreviews(response.data.data)
        })
    },[])
  return (
   
   <Slider {...settings} className="mt-4 mb-10 px-2">
      {allreviews.map((review, index) => (
        <div
  key={index}
  className="bg-richblack-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 
             flex flex-col items-center text-center border-b-4 border-yellow-400 
             p-4 sm:p-5 md:p-6 
             w-[220px] sm:w-[250px] md:w-[270px] lg:w-[280px] 
             min-h-[320px] sm:min-h-[340px] md:min-h-[360px]"
>
  <img
    src={review?.user?.image}
    alt="Reviewer"
    className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
  />

  <div className="mt-2 text-richblack-100 text-sm sm:text-base font-semibold truncate">
    {review?.user?.firstName} {review?.user?.lastName}
  </div>
  <div className="text-richblack-400 text-xs sm:text-sm truncate">
    {review?.user?.email}
  </div>

  <div className="flex justify-center mt-1">
    <StarRatings
      rating={review?.rating}
      starRatedColor="gold"
      numberOfStars={5}
      starDimension="18px"
      starSpacing="3px"
      name={`rating-${index}`}
    />
  </div>

  <p className="text-richblack-200 text-xs sm:text-sm mt-2 overflow-hidden text-ellipsis line-clamp-4">
    {review?.reviews}
  </p>
</div>

      ))}
    </Slider>

  )
}

export default ReviewSlider

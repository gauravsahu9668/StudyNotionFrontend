import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTotalItems } from "../../../../slices/cartSlice";
import { allcartDetails, removeFromCart } from "../../../../services/operation/courses";
import toast from "react-hot-toast";

const RenderCartCourses = () => {
  const [cart, setCart] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Fetch cart items from the backend
  const getCartItems = async () => {
    try {
      const response = await allcartDetails(token);
      if (response.data.success) {
        const cartData = response.data.data || [];
        setCart(cartData);
        dispatch(setTotalItems(cartData.length));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCart([]);
    }
  };

  // Remove a course from the cart
  const removeHandler = async (courseId) => {
    try {
      const response = await removeFromCart(token, courseId);
      if (response.data.success) {
        const updatedCart = response.data.data || [];
        setCart(updatedCart);
        toast.success("Course removed successfully");
        dispatch(setTotalItems(updatedCart.length));
      }
    } catch (error) {
      console.error("Error removing course:", error);
      toast.error("Failed to remove the course. Try again.");
    }
  };

  useEffect(() => {
    getCartItems();
  });

  return (
    <div className="w-full pb-5">
      {totalItems > 0 ? (
        <div className="w-full grid grid-cols-3 pb-3 gap-3">
          {cart.map((course, index) => (
            <div
              key={course?._id || index}
              className="p-3 border-[0.2px] border-richblack-500 rounded-lg hover:bg-richblack-800 hover:scale-90 transition-all duration-200 group"
            >
              {/* Course Thumbnail */}
              <img
                src={course?.thumbnail || "placeholder-image-url"}
                className="w-fit h-[250px] rounded-lg"
                alt={course?.courseName || "Course Thumbnail"}
              />
              {/* Course Name */}
              <div className="text-[20px] text-richblack-25 font-semibold mt-3">
                {course?.courseName || "Unnamed Course"}
              </div>
              {/* Instructor Name */}
              <div className="text-richblack-500 italic mt-3">
                By -{" "}
                <span className="underline">
                  {course?.instructor?.firstName || "N/A"}{" "}
                  {course?.instructor?.lastName || ""}
                </span>
              </div>
              {/* Course Price */}
              <div className="text-[23px] text-richblack-50 font-bold mt-3">
                Rs {course?.price || "0"}
              </div>
              {/* Action Buttons */}
              <div className="flex flex-row justify-between mt-2">
                <Link to={`/course-buy/${course?._id}`}>
                  <button className="px-3 py-2 border-[1px] border-yellow-50 text-yellow-50 rounded-full">
                    Buy Now
                  </button>
                </Link>
                <button
                  onClick={() => removeHandler(course?._id)}
                  className="px-3 py-2 text-richblack-25 rounded-full bg-richblack-800 transition-all duration-200 group-hover:bg-richblack-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-center text-[25px] text-richblack-100 w-fit mx-auto">
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default RenderCartCourses;

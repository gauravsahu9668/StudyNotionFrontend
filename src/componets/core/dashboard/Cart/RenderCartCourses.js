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
    <div className="w-full pb-6">
  {totalItems > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cart.map((course, index) => (
        <div
          key={course?._id || index}
          className="flex flex-col bg-richblack-800 border border-richblack-700 rounded-xl shadow-sm hover:shadow-lg hover:scale-[0.98] transition-all duration-300"
        >
          {/* Thumbnail */}
          <img
            src={course?.thumbnail || "placeholder-image-url"}
            alt={course?.courseName || "Course Thumbnail"}
            className="w-full h-[180px] md:h-[220px] object-cover rounded-t-xl"
          />

          {/* Details */}
          <div className="flex flex-col p-4 flex-1 justify-between">
            <div>
              <h2 className="text-richblack-5 text-lg md:text-xl font-semibold mb-1 truncate">
                {course?.courseName || "Unnamed Course"}
              </h2>
              <p className="text-richblack-400 text-sm italic mb-2">
                By{" "}
                <span className="underline">
                  {course?.instructor?.firstName || "N/A"}{" "}
                  {course?.instructor?.lastName || ""}
                </span>
              </p>
              <p className="text-yellow-50 text-lg font-bold">
                Rs {course?.price || "0"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              <Link to={`/course-buy/${course?._id}`} className="flex-1">
                <button className="w-full py-2 text-center text-sm font-semibold rounded-lg border border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition">
                  Buy Now
                </button>
              </Link>
              <button
                onClick={() => removeHandler(course?._id)}
                className="flex-1 py-2 text-center text-sm font-semibold rounded-lg bg-richblack-700 text-richblack-100 hover:bg-richblack-900 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex justify-center text-center text-lg md:text-xl text-richblack-300 py-10">
      Your cart is empty
    </div>
  )}
</div>

  );
};

export default RenderCartCourses;

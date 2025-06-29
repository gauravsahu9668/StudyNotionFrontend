
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'

const Cart = () => {

    const {totalItems}=useSelector((state)=>state.cart)

  return (
    <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-10 py-4">
  <h1 className="text-richblack-5 text-2xl md:text-3xl font-extrabold">
    My Wishlist
  </h1>
  <p className="text-yellow-100 text-base md:text-lg font-semibold">
    {totalItems} Courses in Cart
  </p>
  <div>
    <RenderCartCourses />
  </div>
</div>

  )
}

export default Cart

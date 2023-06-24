import React from "react";
import CartProduct from "./CartProduct";
import { CartType, checkoutCart, selectCarts, stopShowing } from "./CartsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Swal from "sweetalert2";

export default function CartDisplay() {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectCarts);

  const cart = carts.carts.find(
    (cart) => cart.id == carts.showingCart.id
  ) as CartType;
  let subtotal = 0;
  const cartProducts = cart.cartProducts.map((cart) => {
    subtotal += cart.price * cart.qty;
    return <CartProduct {...cart} />;
  });
  const discount =
    (subtotal + (cart.tax * subtotal) / 100) * (cart.discount / 100);

  function handleCheckout() {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(stopShowing())
        dispatch(checkoutCart(cart.id));
      }
    });
  }
  return (
    <div className="text-gray-100 overflow-x-auto">
      <div className="flex flex-col">
        <div className="form-title">
          <div className="py-10 ">
            <h1 className="">{cart.title}</h1>
            <p className="text-sm mt-3">{cart.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(stopShowing());
            }}
          >
            X
          </button>
        </div>
        <div className="flex flex-col mx-2">
          {cart.cartProducts.length > 0 ? cartProducts : "no products"}
        </div>
        {cart.cartProducts.length > 0 && (
          <div className="bg-lightGray p-2 mx-2 rounded-lg flex flex-col gap-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>tax {cart.tax}%</p>
              <p>$10</p>
            </div>
            <div className="flex justify-between">
              <p>discount {cart.discount}%</p>
              <p>$10</p>
            </div>
            <div className=" mt-4 pt-6 text-2xl flex justify-between border-t border-t-gray-600 border-dashed">
              <p>Total</p>
              <p>${subtotal + (cart.tax * subtotal) / 100 - discount}</p>
            </div>
          </div>
        )}
        {cart.cartProducts.length > 0 && (
          <button
            onClick={handleCheckout}
            className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {`Checkout`}
          </button>
        )}
      </div>
    </div>
  );
}

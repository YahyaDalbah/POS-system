import { useState } from "react";
import {
  ProductType,
  deleteProduct,
  selectProducts,
  startUpdating,
} from "./productsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCategories } from "../Categories/categoriesSlice";
import { PropsPOSType } from "./Products";
import { addProductToCart, reduceProductFromCart, selectCarts } from "../carts/CartsSlice";

type Producttype = PropsPOSType & ProductType;

export default function Product({
  id,
  name,
  category,
  price,
  uom,
  image,
  pos,
}: Producttype) {
  const [badAdding, setBadAdding] = useState(false)
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const carts = useAppSelector(selectCarts)
  const [base, setBase] = useState(false)

  const cartToAdd = carts.carts.find(cart => cart.id == carts.showingCart.id)


  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteProduct(id));
    if(products.updating.updating)dispatch(startUpdating(id))
  }
  function handleUpdate() {
    if (!products.adding && !categories.adding && !categories.updating.updating)
      dispatch(startUpdating(id));
  }

  function handleAddProductToCart(){
    if(carts.showingCart.showing && id && cartToAdd?.id)dispatch(addProductToCart({
      cartId: cartToAdd?.id,
      ProductId: id,
      name,
      uom: base ? uom.base : uom.name,
      price: base ? price * uom.convFactor : price
    }))
    else{
      setTimeout(() => {
        setBadAdding(false);
      }, 5000);
      setBadAdding(true);
    }
  }
  function handleReduceProductFromCart() {
    let foundProduct = false
    cartToAdd?.cartProducts.forEach(product => {
      if(product.id == id){
        foundProduct = true
      }
    })
    if(foundProduct){
      if (carts.showingCart.showing && id && cartToAdd?.id)
        dispatch(
          reduceProductFromCart({
            cartId: cartToAdd?.id,
            ProductId: id,
            name,
            uom: uom.name,
            price,
          })
        );
      else {
        setTimeout(() => {
          setBadAdding(false);
        }, 5000);
        setBadAdding(true);
      }
    }
  }
  return (
    <div className="flex flex-col text-black" data-testid="product">
      <div className="flex justify-center">
        <img src={image} alt="image" className=" w-36 h-36" />
      </div>
      <div className="flex flex-col justify-evenly text-gray-600 pt-5 gap-y-2 items-center text-left">
        <h1
          data-testid="productName"
          className="text-2xl font-semibold text-lightBlack"
        >
          {name}
        </h1>
        <p className="flex items-center gap-x-2 mt-2">
          {!base
            ? `${price}$ per ${uom.name}`
            : `${Number((price * uom.convFactor).toFixed(2))}$ per ${uom.base}`}
          {uom.convFactor != 1 && (
            <button
              className="text-sm rounded-md border-2 border-gray-700 px-1 w-20"
              onClick={() => setBase((prev) => !prev)}
            >{`change to ${!base ? "base" : "secondry"} unit`}</button>
          )}
        </p>
        <p>{category}</p>
      </div>
      {!pos && (
        <div className="flex justify-evenly mt-3">
          <button onClick={handleDelete} className="delete-button text-sm">
            Delete
          </button>
          <button onClick={handleUpdate} className="update-button text-sm">
            Update
          </button>
        </div>
      )}
      {pos && (
        <div className="flex flex-col mt-3">
          <div className="flex justify-evenly">
            <button
              data-testid="reduceProductFromCartBtn"
              onClick={handleReduceProductFromCart}
              className="add-to-cart-button text-xl"
            >
              -
            </button>
            <button
              data-testid="addProductToCartBtn"
              onClick={handleAddProductToCart}
              className="add-to-cart-button text-xl"
            >
              +
            </button>
          </div>
          {badAdding && (
            <p className="text-center text-red-600 font-bold">
              Must select cart
            </p>
          )}
        </div>
      )}
    </div>
  );
}

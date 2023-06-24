import Nav from "./components/Nav";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  fetchProducts,
  selectProducts,
} from "./components/Products/productsSlice";
import {
  fetchCategories,
  selectCategories,
} from "./components/Categories/categoriesSlice";
import ProductsPage from "./components/Products/ProductsPage";
import UOMs from "./components/UOMs/UOMsPage";
import { fetchUOMs, selectUOMs } from "./components/UOMs/UOMsSlice";
import { fetchTypes, selectTypes } from "./components/UOMs/UOMtypesSlice";
import Loading from "./components/Products/Loading";
import POSPage from "./components/carts/POSPage";
import { fetchCarts, selectCarts } from "./components/carts/CartsSlice";

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const uoms = useAppSelector(selectUOMs)
  const types = useAppSelector(selectTypes)
  const carts = useAppSelector(selectCarts)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchUOMs());
    dispatch(fetchTypes());
    dispatch(fetchCarts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(products.error || categories.error || uoms.error || types.error || carts.error){
    return (
      <div className="overflow-x-hidden text-lightBlack col-span-4 flex flex-col w-screen h-screen justify-center items-center">
        <p className="border text-gray-500 border-red-500 bg-red-500 p-10 rounded-full text-5xl">
          X
        </p>
        <p className="text-3xl ">
          {products.error ||
            categories.error ||
            uoms.error ||
            types.error ||
            carts.error}
        </p>
      </div>
    );
  }
  
  return (
    <main className=" grid grid-cols-5 bg-medBlack text-gray-300 min-w-full min-h-screen">
      <Nav />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/uoms" element={<UOMs />} />
        <Route path="/" element={<POSPage />} />
      </Routes>
      {(products.loading || uoms.loading || categories.loading || types.loading || carts.loading) && <Loading />}
    </main>
  );
}

export default App;

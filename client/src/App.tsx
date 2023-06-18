import Nav from "./components/Nav";
import {useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProducts, selectProducts } from "./components/Products/productsSlice";
import { fetchCategories, selectCategories } from "./components/Categories/categoriesSlice";
import ProductsPage from "./components/Products/ProductsPage";
import AddForm from "./components/Products/AddForm";

function App() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className=" grid grid-cols-5 bg-medBlack text-gray-300 w-screen h-screen">
      <Nav />
      <Routes>
        <Route path="/products" element={<ProductsPage />}/>
      </Routes>
      {(products.adding || categories.adding) && <AddForm />}
    </main>
  );
}

export default App;

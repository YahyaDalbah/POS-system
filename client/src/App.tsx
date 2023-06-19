import Nav from "./components/Nav";
import {useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProducts, selectProducts } from "./components/Products/productsSlice";
import { fetchCategories, selectCategories } from "./components/Categories/categoriesSlice";
import ProductsPage from "./components/Products/ProductsPage";
import AddCategoryForm from "./components/Categories/AddCategoryForm";
import AddProductForm from "./components/Products/AddProductForm";
import UOMs from "./components/UOMs/UOMsPage";
import { fetchUOMs } from "./components/UOMs/UOMsSlice";


function App() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories())
    dispatch(fetchUOMs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className=" grid grid-cols-5 bg-medBlack text-gray-300 w-screen h-screen">
      <Nav />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/uoms" element={<UOMs />} />
      </Routes>
      
    </main>
  );
}

export default App;

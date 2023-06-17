import Nav from "./components/Nav";
import {useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import { useAppDispatch } from "./store/hooks";
import { fetchProducts } from "./components/Products/productsSlice";

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className=" grid grid-cols-3 bg-medBlack text-gray-300 w-screen h-screen">
      <Nav />
      <Routes>
        <Route path="/products" element={<Products />}/>
      </Routes>
    </main>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import DataContext from "./context/DataContext";
import Home from "./pages/Home";
import AllProducts from "./components/AllProducts";
import LoadMore from "./components/LoadMore";
import Categories from "./components/Categories";
import ByCategory from "./components/ByCategory";
import Brands from "./components/Brands";
import ByBrand from "./components/ByBrand";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <DataContext>
        <Routes>
          <Route path="/*" element={<Home/>}>
            <Route index element={<AllProducts/>}/>
            <Route path="more" element={<LoadMore/>}/>    
            <Route path="categories" element={<Categories/>}/>  
            <Route path="category">
              <Route path=":param" element={<ByCategory/>}/>
            </Route>    
            <Route path="brands" element={<Brands/>}/>
            <Route path="brand">
              <Route path=":param" element={<ByBrand/>}/>
            </Route>    
            <Route path="addProduct" element={<AddProduct/>}/>   
          </Route>
        </Routes>
      </DataContext>
    </div>
  );
}

export default App;

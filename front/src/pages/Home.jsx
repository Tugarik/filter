import AddProduct from "../components/AddProduct";
import AllProducts from "../components/AllProducts";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import LoadMore from "../components/LoadMore";
import Pagination from "../components/Pagination";
import { useDataContext } from "../context/DataContext";

const menus = [
  { name: "All products", component: <AllProducts /> },
  { name: "Pagination", component: <Pagination /> },
  { name: "Load More", component: <LoadMore /> },
  {
    name: "Categories",
    component: <Categories />,
  },
  { name: "Brands", component: <Brands /> },
  {
    name: "Add Product",
    component: <AddProduct />,
  },
];

export default function Home() {
  function menuClickHandler(inp) {
    setCurrent(inp);
    localStorage.setItem("menu", JSON.stringify(inp));
  }
  const { current, setCurrent } = useDataContext();

  return (
    <div className="Home container">
      <h1 className="my-5">Products List</h1>
      {
        <>
          <div className="buttonBox">
            {menus &&
              menus.map((menu, index) => (
                <div key={index}>
                  <button
                    className={`menuBtn menuBtn-${
                      current === index ? "active" : "inactive"
                    }`}
                    onClick={() => menuClickHandler(index)}
                  >
                    {menu.name}
                  </button>
                </div>
              ))}
          </div>

          <div>{menus[current].component}</div>
        </>
      }
    </div>
  );
}

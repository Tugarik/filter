import AddProduct from "../components/AddProduct";
import AllProducts from "../components/AllProducts";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import LoadMore from "../components/LoadMore";
import { useDataContext } from "../context/DataContext";

const menus = [
  { name: "All products", filter: "", nav: "/", component: <AllProducts /> },
  { name: "Load More", filter: "5", nav: "/more", component: <LoadMore /> },
  {
    name: "Categories",
    filter: "",
    nav: "/categories",
    component: <Categories />,
  },
  { name: "Brands", filter: "", nav: "/brands", component: <Brands /> },
  {
    name: "Add Product",
    filter: "",
    nav: "/addProduct",
    component: <AddProduct />,
  },
];

export default function Home() {
  function menuClickHandler(inp) {
    console.log(inp);
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
    // <Navigation/>
    // <Outlet/>
  );
}

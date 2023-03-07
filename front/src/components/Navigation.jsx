import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext.js";
const menus = [
  { name: "All products", filter: "", nav: "/" },
  { name: "Load More", filter: "5", nav: "/more" },
  { name: "Categories", filter: "", nav: "/categories" },
  { name: "Brands", filter: "", nav: "/brands" },
  { name: "+ Add Product", filter: "", nav: "/addProduct" },
];
export default function Navigation() {
  const navigate = useNavigate();
  const { current, setCurrent } = useDataContext();
  const { setFilter } = useDataContext();

  return (
    <div>
      <div className="buttonBox">
        {menus &&
          menus.map((menu, index) =>
            current === index ? (
              <button key={index} className="menuBtn menuBtn-active">
                <span>{menu.name}</span>
              </button>
            ) : (
              <button
                key={index}
                className="menuBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(index);
                  setFilter(menu.filter);
                  navigate(menu.nav);
                  
                }}
              >
                <span>{menu.name}</span>
              </button>
            )
          )}
      </div>
    </div>
  );
}

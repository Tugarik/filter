import { useDataContext } from "../context/DataContext.js";
const menus = [
  { name: "All products", handler: "100", show: "table" },
  { name: "Load More", handler: "5,5", show: "table" },
  { name: "Categories", handler: "", show: "grid" },
  { name: "Brands", handler: "", show: "grid" },
  { name: "+ Add Product", handler: "", show: "addTable" },
];

export default function Navigation() {
  const { current, setCurrent } = useDataContext();
  const { setFilter } = useDataContext();
  const { setShowTable } = useDataContext();

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
                  setFilter(menu.handler);
                  setShowTable(menu.show);
                  console.log("Filter: ", menu.handler);
                }}
              >
                <span> {menu.name}</span>
              </button>
            )
          )}
      </div>
    </div>
  );
}

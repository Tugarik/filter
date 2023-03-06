
import { useDataContext } from "../context/DataContext.js";
const menus = [
    {name:'All products', handler:"100"}, 
    {name:'Load More', handler:"5"}, 
    {name:'Categories', handler:""}, 
    {name:'Brands', handler:""}, 
    {name:'+ Add Product', handler:""}];

export default function Navigation () {
    
    const {current, setCurrent} = useDataContext();
    const { setFilter} = useDataContext();

    return (
        <div>   
            <div className="buttonBox">
                {menus && menus.map((menu, index) =>
                current === index ? (
                <button key={index} className="menuBtn menuBtn-active">
                    <span> {menu.name}</span>
                </button>
                ) : (
                <button  key={index} className="menuBtn" onClick={(e) => { 
                    e.preventDefault(); 
                    setCurrent(index);
                    setFilter(menu.handler);
                   
                    console.log('Filter: ', menu.handler); 
                    }}>
                    <span> {menu.name}</span>
                </button>
                )
            )}
            </div>
        </div>

    )

};
import { useDataContext } from "../context/DataContext";
import FilteredTable from "./FilteredTable";

function TableArea() {
  const { showTable } = useDataContext();

  if (showTable === "table") return <FilteredTable />;
  if (showTable === "grid") return <div>GRID</div>;
  if (showTable === "addTable") return <div>ADD PRODUCT</div>;
}

export default TableArea;

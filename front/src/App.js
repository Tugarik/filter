import "./App.css";

import DataContext from "./context/DataContext";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <DataContext>
        <Home />
      </DataContext>
    </div>
  );
}

export default App;

import './App.css';
import Navigation from './components/Navigation';
import TableArea from './components/Table';
import DataContext from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataContext>
        <div className='container'>
          <h1 className='my-5'>
            Products List
          </h1>
          <Navigation/>
          <TableArea/>
        </div>
      </DataContext>
    </div>
  );
}

export default App;

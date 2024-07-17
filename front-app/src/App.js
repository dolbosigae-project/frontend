import logo from './logo.svg';
import './App.css';
import { Route, Routes,BrowserRouter as Router  } from 'react-router-dom';
import PL from './components/plci_components/PL';
function App() {
  return (
  <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<PL />}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;

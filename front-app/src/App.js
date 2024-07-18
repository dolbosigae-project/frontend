import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PL from './components/pl_main_components/PL';
import PlInfoView from './components/pl_info_component/PlInfoView';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<PL />} />
          <Route path='/plinfo/:plId' element={<PlInfoView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

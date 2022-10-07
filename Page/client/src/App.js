import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import AddEdit from './components/AddEdit';
import Main from './components/Main';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path = "/" element={<Main />} /> 
           <Route path = "/addCourse" element={<AddEdit/>} />
           <Route path = "/update/:id" element={<AddEdit/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


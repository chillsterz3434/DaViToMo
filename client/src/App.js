import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage';
import SearchPage from './ArticleSearch/ArticleSearch';
import "./App.css";
import Navbar from './UI/Navbar/Navbar';



function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </div>
  );

}

  

export default App;

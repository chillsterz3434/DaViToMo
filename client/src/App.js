import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage';
import SearchPage from './ArticleSearch/ArticleSearch';
import "./App.css";
import Navbar from './UI/Navbar/Navbar';
import TopicPage from './TopicPage/TopicPage';



function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/topics' element={<TopicPage />} />
      </Routes>
    </div>
  );

}

  

export default App;

import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage';
import ArticleSearch from './ArticleSearch/ArticleSearch';
import "./App.css";
import Navbar from './UI/Navbar/Navbar';
import TopicPage from './TopicPage/TopicPage';
import DocumentPage from './DocumetPage/DocumentPage';



function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<ArticleSearch />} />
        <Route path='/topics' element={<TopicPage />} />
        <Route path='/document' element={<DocumentPage />} />
      </Routes>
    </div>
  );

}

  

export default App;

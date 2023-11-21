import './App.css';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Blog from './blog/blog';
import Home from './home/home';
import Nav from './nav/nav';

function App() {
  return (
    <div className='App'>
      <Nav />

      <Router>
        <Routes>
          <Route exact path='/blog' element={<Home />} />
          <Route exact path='/blog/:id' element={<Blog />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;

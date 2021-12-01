import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from './components/Users';
import Posts from './components/Posts';
import Home from './components/Home';

function App(e) {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/users"  element={<Users />} />
          <Route path="/posts"  element={<Posts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

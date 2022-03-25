import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


// components
import MenuBar from './components/MenuBar'
import InputBook from './components/InputBook'
import ListBooks from './components/ListBooks'
import Footer from './components/Footer'
import ViewBook from './components/ViewBook'

function App() {
  return (<>
      <MenuBar/>
      <div>
          <Routes>
            <Route path="/input" element={<div class="container"><InputBook/></div>} />
            <Route path="/" element={<div class="container"><ListBooks/></div>} />
          </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;

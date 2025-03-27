import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";


const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/"><button>authors</button></Link>
          <Link style={padding} to="/books"><button>books</button></Link>
          <Link style={padding} to="/books/add"><button>add book</button></Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/add" element={<NewBook />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

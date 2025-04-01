import { useState, useEffect } from "react"
import { useApolloClient } from "@apollo/client"

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";


const App = () => {

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const padding = {
    padding: 5
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log('token', token)

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    )
  }


  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/"><button>authors</button></Link>
          <Link style={padding} to="/books"><button>books</button></Link>
          <Link style={padding} to="/books/add"><button>add book</button></Link>
          <button onClick={logout}>logout</button>
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

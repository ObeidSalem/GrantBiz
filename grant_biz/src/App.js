import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import "./styles.css";
import HomePage from "./Components/HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import MyShop from "./Components/MyShop";
import Product from "./Components/Product";

function App() {
  return (
    <>
      <Router>
        <div className="content-center	">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignIn" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/MyShop" element={<MyShop />} />
            <Route path="/Product/:id" element={<Product />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

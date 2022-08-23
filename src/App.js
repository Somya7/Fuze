import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import MyProfile from "./Pages/MyProfile";

function App() {
  return (
    <Router>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<Register />} />
        <Route path="/my_profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Mypage from "./pages/Mypage";
import Notice from "./pages/Notice";
import Navbar from "./components/navbar/Navbar";
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="main-display">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

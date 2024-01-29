import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Mypage from "./pages/Mypage";
import Notice from "./pages/Notice";

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Mypage />} />
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

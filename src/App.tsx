import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Notice from "./pages/Notice";
import Mypage from "./pages/Mypage";

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

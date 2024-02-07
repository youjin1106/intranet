import './App.css';

import {
  atom,
  useAtom,
} from 'jotai';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import { NoticeDetail } from './pages/Detail';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Notice from './pages/Notice';

export const isLoggedInAtom = atom<boolean>(
  sessionStorage.getItem("isLoggedIn") === "true"
);
function App() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  return (
    <BrowserRouter>
      <div className="flex">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Mypage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/notice"
            element={isLoggedIn ? <Notice /> : <Navigate to="/login" />}
          />
          <Route path="/notice/:noticeId" element={<NoticeDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

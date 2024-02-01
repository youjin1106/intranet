import './App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import { NoticeDetail } from './pages/Detail';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Notice from './pages/Notice';

function App() {
  return (
    <BrowserRouter>
      <div className="main-display">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/detail" element={<NoticeDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

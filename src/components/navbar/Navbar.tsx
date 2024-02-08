import { useAtom } from 'jotai';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import NotificationsActiveOutlinedIcon
  from '@mui/icons-material/NotificationsActiveOutlined';
import PersonOutlineOutlinedIcon
  from '@mui/icons-material/PersonOutlineOutlined';

import { isLoggedInAtom } from '../../App';
import logo from '../../assets/logo.png';
import GrayButton from '../buttons/GrayButton';

const Navbar = () => {
  3;
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const isMain = location.pathname === "/" ? "text-primary" : "text-gray01";
  const isNotice =
    location.pathname === "/notice" || location.pathname.startsWith("/notice/")
      ? "text-primary"
      : "text-gray01";

  const handelLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col justify-between min-w-[180px] w-[200px] p-[20px] bg-bg01">
      <div>
        <p
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer rounded flex items-center justify-center mb-2"
        >
          <img className="w-[80px] h-[80px]" src={logo} alt="logo" />
        </p>
        <ul>
          <li>
            <Link className={`${isMain} text-lg flex gap-2 py-2`} to="/">
              <PersonOutlineOutlinedIcon className={`${isMain} text-gray01`} />
              마이페이지
            </Link>
          </li>
          <li>
            <Link
              className={`${isNotice} text-lg flex gap-2 py-2`}
              to="/notice"
            >
              <NotificationsActiveOutlinedIcon
                className={`${isNotice} text-gray01`}
              />
              공지사항
            </Link>
          </li>
        </ul>
      </div>
      <GrayButton label="Logout" onClick={handelLogout} />
    </div>
  );
};

export default Navbar;

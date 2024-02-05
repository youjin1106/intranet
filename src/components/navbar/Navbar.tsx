import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

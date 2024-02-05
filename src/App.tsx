import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Mypage from "./pages/Mypage";
import Notice from "./pages/Notice";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import { atom, useAtom } from "jotai";

export const isLoggedInAtom = atom<boolean>(sessionStorage.getItem("isLoggedIn") === "true");

function App() {
	const [isLoggedIn] = useAtom(isLoggedInAtom);

	return (
		<BrowserRouter>
			<div className="main-display">
				{isLoggedIn && <Navbar />}
				<Routes>
					<Route path="/" element={isLoggedIn ? <Mypage /> : <Navigate to={"/login"} />} />
					<Route path="/notice" element={isLoggedIn ? <Notice /> : <Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
